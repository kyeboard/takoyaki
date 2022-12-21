use std::path::PathBuf;
use std::process::{Command, Stdio};
use std::fs::{File, create_dir_all};
use serde::{Serialize, Deserialize};
use execute::Execute;

use crate::utils::Executor;

use super::Directories;

#[derive(Serialize, Deserialize)]
pub struct DeploymentInfo {
    pub github_url: String,
    pub branch: String,
    pub path: String,
    pub name: String
}

pub fn create_new_deployment(whoami: &str, info: DeploymentInfo) -> Result<(), Box<dyn std::error::Error>> {
    // Get all the directories
    let dirs = Directories::get_for_me(whoami, &info.name);

    // Prevent edge cases
    create_dir_all(&dirs.build_dir)?;

    // Create a new executor
    let executor = Executor::new(PathBuf::from("output.txt"));

    // Clone the repository
    executor.execute(vec!["git", "clone", &info.github_url, "-b", &info.branch, &info.name], &dirs.build_dir);

    // Build the project for production
    executor.execute(vec!["cargo", "build", "--release"], &dirs.app_dir.join(&info.path));

    Ok(())
}
