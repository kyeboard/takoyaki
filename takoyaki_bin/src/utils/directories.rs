use std::path::PathBuf;

pub fn hint_root_path() -> PathBuf {
    let config_path = dirs::config_dir();

    let mut path = match config_path {
        Some(path) => {
            path
        },
        None => {
            // Hoping that the root directory exists
            let mut home = dirs::home_dir().unwrap();

            home.extend([".config"]);

            home
        }
    };

    path.extend(["takoyaki"]);

    path
}

pub struct Directories {
    pub plugins_directory: PathBuf
}

impl Directories {
    pub fn instance() -> Self {
        // Get the root directory
        let takoyaki_root = hint_root_path();

        Self {
            plugins_directory: takoyaki_root.join("plugins")
        }
    }
}
