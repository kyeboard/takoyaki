use std::{path::PathBuf, io::Result, fs::create_dir_all};

pub struct Setup {
    pub deployment_dir: PathBuf,
    pub builds_dir: PathBuf
}

// Hoping the home directory exists...
fn home_dir() -> PathBuf { dirs::home_dir().unwrap() }

impl Setup {
    pub fn instance() -> Self {
        let takoyaki_root = home_dir().join(".takoyaki");

        Self {
            deployment_dir: takoyaki_root.join("deployments"),
            builds_dir: takoyaki_root.join("build"),
        }
    }

    pub fn ensure_availability(&self) -> Result<()> {
        // Create the deployments dir
        create_dir_all(&self.deployment_dir)?;

        // Create the builds directory
        create_dir_all(&self.builds_dir)?;

        // Ok!
        Ok(())
    }
}

