use std::io::Result;
use serde::Deserialize;
use super::{Executor, Setup};

#[derive(Deserialize)]
pub struct DeploymentInfo {
    pub name: String,
    pub github_url: String,
    pub branch: String,
    pub path: String,
}

pub async fn create_deployment(details: DeploymentInfo, whoami: String, uuid: String) -> Result<()> {
    // Get an instance of the setup
    let setup = Setup::instance();

    // Setup for the current user
    setup.setup_for_me(&details.name, &whoami)?;

    // Get the out file path
    let mut out_file_path = setup.deployment_dir.clone();

    // Extend it to the path
    out_file_path.extend([&whoami, &details.name, &format!("{}.txt" , uuid)]);

    // Create a new executor
    let executor = Executor::new(
        vec![
            vec!["git", "clone", "-b", &details.branch, &details.github_url, &details.name],
            vec!["cargo", "build", "--release"]
        ], 
        vec![
            setup.builds_dir.join(&whoami),
            setup.builds_dir.join(&whoami).join(&details.name).join(&details.path)
        ], 
        out_file_path
    );

    // Run the commands
    executor.pipe_commands()?;

    // Ok!
    Ok(())
}
