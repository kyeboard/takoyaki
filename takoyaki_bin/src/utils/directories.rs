use std::path::PathBuf;

pub struct Directories {
    pub build_dir: PathBuf,
    pub app_dir: PathBuf,
    pub log_dir: PathBuf,
}

pub fn get_root() -> PathBuf {
    let mut home = dirs::home_dir().unwrap();

    home.extend([".takoyaki"]);

    home
}

impl Directories {
    pub fn get_for_me(username: &str, name: &str) -> Self {
        let takoyaki_root = get_root();

        Self {
            build_dir: takoyaki_root.join("build").join(username),
            app_dir: takoyaki_root.join("build").join(username).join(name),
            log_dir: takoyaki_root.join("deployments").join(username).join(name)
        }
    }
}

