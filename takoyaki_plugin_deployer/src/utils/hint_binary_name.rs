use std::path::PathBuf;
use cargo_toml::{Manifest, Error};

pub fn hint_binary_name(cargo_path: PathBuf) -> Result<String, Error> {
    // It is obvious of the fact that if the cargo build ran successfully, the Cargo.toml config file is purrfect 
    let parsed_config =  Manifest::from_path(cargo_path)?;

    // Return the package name
    Ok(parsed_config.package.unwrap().name)
}