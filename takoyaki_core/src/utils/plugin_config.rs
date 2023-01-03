use std::path::PathBuf;

use serde::Deserialize;

pub struct PluginConfig {
    endpoint: PathBuf,
}

impl PluginConfig {
    pub fn new(root: PathBuf, name: &str) -> Self {
        Self {
            endpoint: root.join("config").join(format!("{}.toml", name)),
        }
    }

    pub fn retrieve<T>(&self) -> Option<T>
    where
        T: for<'de> Deserialize<'de>,
    {
        // Check if the config file exists
        if !self.endpoint.exists() && !self.endpoint.is_file() {
            return None;
        }

        // Read the config as a raw string
        let raw = std::fs::read_to_string(&self.endpoint).unwrap();

        // Parse it to T type
        let parsed = toml::from_str(&raw);

        // Check and return the value accordingly
        match parsed {
            Ok(parsed_config) => Some(parsed_config),
            Err(_) => None,
        }
    }
}
