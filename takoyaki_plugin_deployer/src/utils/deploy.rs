use std::{path::PathBuf, process::{Command, Stdio, ExitStatus}, fs::{create_dir_all, OpenOptions}};

use serde::{Deserialize, Serialize};
use crate::utils::Dirs;

use super::hint_binary_name;

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct DeploymentInfo {
    pub name: String,
    pub github_url: String,
    pub branch: String,
    pub path: String,
}

pub fn create_pipe(file: &PathBuf) -> Stdio {
    Stdio::from(
        OpenOptions::new()
            .create(true)
            .write(true)
            .append(true)
            .open(file)
            .unwrap()
    )
}

pub fn execute(command: Vec<&str>, at: &PathBuf, out: &PathBuf) -> Result<ExitStatus, std::io::Error> {
    // Ensure that the file is available
    create_dir_all(out.parent().unwrap())?;

    // Get the pipes
    let stdout = create_pipe(&out);
    let stderr = create_pipe(&out);

    Command::new("faketty")
        .args(command)
        .current_dir(at)
        .stdout(stdout)
        .stderr(stderr)
        .spawn()?
        .wait()
}

pub async fn create_deployment(info: DeploymentInfo, uuid: &str) -> Result<(), std::io::Error> {
    // Get all the directories required
    let dirs = Dirs::get_all_dirs_for_app("kyeboard", &info.name, &uuid, &info.path);

    // Create directories to prevent getting error
    create_dir_all(&dirs.root)?;
    create_dir_all(&dirs.build_path)?;
    create_dir_all(&dirs.plugin_path)?;

    // Execute commands
    // 1. Clone the github repo
    execute(
        vec!["git", "clone", &info.github_url, "-b", &info.branch, &info.name],
        &dirs.build_path,
        &dirs.log_path
    )?;

    // 2. Compile the plugin
    execute(
        vec!["cargo", "build", "--release"],
        &dirs.project_path,
        &dirs.log_path
    )?;

    // 3. Move the built plugin over to the plugins directory
    execute(
        vec!["mv" , &hint_binary_name(&dirs.cargo_path).unwrap(), &dirs.plugin_path.display().to_string()],
        &dirs.binary_path,
        &dirs.log_path
    )?;

    Ok(())
}
