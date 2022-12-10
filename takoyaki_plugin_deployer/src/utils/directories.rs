use std::path::PathBuf;

use dirs::home_dir;

fn get_home_dir() -> PathBuf {
    home_dir().unwrap()
}

fn get(end: Vec<&str>) -> PathBuf {
    let mut root = get_home_dir().join(".takoyaki");

    root.extend(end);

    root
}

#[derive(Debug)]
pub struct Dirs {
    pub build_path: PathBuf,
    pub log_path: PathBuf,
    pub cargo_path: PathBuf,
    pub project_path: PathBuf,
    pub binary_path: PathBuf,
    pub root: PathBuf,
    pub plugin_path: PathBuf
}

impl Dirs {
    pub fn get_all_dirs_for_app(user: &str, name: &str, uuid: &str, path: &str) -> Self {
        Self {
            build_path: get(vec!["build", user]),
            plugin_path: get(vec!["plugin"]),
            binary_path: get(vec!["build", user, name, path, "target", "release"]),
            cargo_path: get(vec!["build", user, name, path, "Cargo.toml"]),
            project_path: get(vec!["build", user, name, path]),
            log_path: get(vec!["deployments" , user, name, &format!("{}.txt", uuid)]),
            root: get(vec![])
        }
    }
}
