use super::{Executor, Setup, upload_file, hint_binary_name};
use std::path::PathBuf;
use serde::Deserialize;
use std::io::Result;

#[derive(Deserialize)]
pub struct DeploymentInfo {
    pub name: String,
    pub github_url: String,
    pub branch: String,
    pub path: String,
}

pub async fn create_deployment(
    details: DeploymentInfo,
    whoami: String,
    uuid: String,
) -> Result<()> {
    // Get an instance of the setup
    let setup = Setup::instance();

    // Setup for the current user
    setup.setup_for_me(&details.name, &whoami)?;

    // Get the out file path
    let mut out_file_path = setup.deployment_dir.clone();

    // Extend it to the path
    out_file_path.extend([&whoami, &details.name, &format!("{}.txt", uuid)]);

    // Get the binary path
    let path = setup
        .builds_dir
        .join(&whoami)
        .join(hint_binary_name())
        .join(&details.path)
        .display()
        .to_string();

    // Get the plugins dir
    let outbin = setup
        .plugins_dir
        .display()
        .to_string();

    // Create a new executor
    let executor = Executor::new(
        vec![
            vec![
                "git",
                "clone",
                "-b",
                &details.branch,
                &details.github_url,
                &details.name,
            ],
            vec!["echo" , "Building project for production (cargo build --release)"],
            vec!["cargo", "build", "--release"],
            vec![
                "mv",
                &path,
                &outbin
            ],
        ],
        vec![
            setup.builds_dir.join(&whoami),
            setup.builds_dir.join(&whoami),
            setup
                .builds_dir
                .join(&whoami)
                .join(&details.name)
                .join(&details.path),
            PathBuf::from(&outbin)
        ],
        out_file_path,
    );

    // Run the commands
    executor.pipe_commands()?;
    let cargo_path = setup
        .builds_dir
        .join(&whoami)
        .join(&details.name)
        .join(&details.path)
        .join("Cargo.toml");

    // Upload the binary
    upload_file(
        setup
            .builds_dir
            .join(&whoami)
            .join(&details.name)
            .join(&details.path)
            .join("target")
            .join("release")
            .join(hint_binary_name(cargo_path).unwrap())
    ).await.ok();

    // Ok!
    Ok(())
}
