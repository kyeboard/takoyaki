use std::{io::Result, path::PathBuf};
use serde::Deserialize;
use super::{Executor, Setup};

#[derive(Deserialize)]
pub struct DeploymentInfo {
    pub name: String,
    pub github_url: String,
    pub branch: String,
    pub path: String,
}

pub async fn create_deployment(details: DeploymentInfo, whoami: String) -> Result<()> {
    // Get an instance of the setup
    let setup = Setup::instance();

    // Setup for the current user
    setup.setup_for_me(&details.name, &whoami)?;

    // Create a new executor
    let executor = Executor::new(
        vec![
            vec!["git", "clone", "-b", &details.branch, &details.github_url, &details.name]
        ], 
        vec![
            setup.builds_dir.join(&whoami)
        ], 
        PathBuf::from("out.txt")
    );

    executor.pipe_commands();

    Ok(())
}
