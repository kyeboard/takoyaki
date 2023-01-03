use serde::{Deserialize, Serialize};
use std::{fs::File, io::Write, path::PathBuf};

pub struct Cache {
    endpoint: PathBuf,
}

impl Cache {
    pub fn new(root: PathBuf, name: &str) -> Self {
        Self {
            endpoint: root.join("cache").join(format!("{}.json", name)),
        }
    }

    pub fn exists(&self) -> bool {
        // Check if the file exists
        self.endpoint.exists()
    }

    pub fn get<T>(&self) -> Result<T, serde_json::Error>
    where
        T: for<'de> Deserialize<'de>,
    {
        // Check if the cache exists
        if !self.exists() {
            panic!("The cache does not exists!")
        }

        // Read the content as raw string
        let raw = std::fs::read_to_string(&self.endpoint).unwrap();

        // Parse it to T type using serde_json
        serde_json::from_str(&raw)
    }

    pub fn set<T>(&self, data: T) -> Result<(), std::io::Error>
    where
        T: Serialize,
    {
        // Parse the object to string
        let parsed = serde_json::to_string(&data).unwrap();

        // Make sure the parent of the file exists
        if let Some(parent) = self.endpoint.parent() {
            std::fs::create_dir_all(parent)?;
        }

        // Create the file
        let mut file = File::create(&self.endpoint)?;

        // Write the parsed object to the cache file
        file.write_all(parsed.as_bytes())?;

        Ok(())
    }
}

// Tests
#[cfg(test)]
mod tests {
    use std::{
        fs::{create_dir_all, File},
        io::Write,
        path::PathBuf,
    };

    use crate::Cache;

    #[test]
    pub fn non_existant_cache_should_return_false() {
        // Some random path
        let non_existant_root = PathBuf::from("/it/just/should/not/exist");

        // Create a cache instance
        let cache = Cache::new(non_existant_root, "uwu");

        // Check
        assert!(!cache.exists());
    }

    #[test]
    pub fn existant_cache_should_return_true() -> std::io::Result<()> {
        // Some random path
        let existant = PathBuf::from(".temp");

        // Create a file
        create_dir_all(existant.join("cache"))?;
        File::create(existant.join("cache").join("uwu.json"))?.write_all("{}".as_bytes())?;

        // Create a cache instance
        let cache = Cache::new(existant, "uwu");

        // Check
        assert!(cache.exists());

        // Ok!
        Ok(())
    }

    #[test]
    pub fn invalid_cache_should_return_error() -> std::io::Result<()> {
        // Some random path
        let existant = PathBuf::from(".temp");

        // Create a file
        create_dir_all(existant.join("cache"))?;
        File::create(existant.join("cache").join("bugged_cache.json"))?
            .write_all("{ is this acktually correct? }".as_bytes())?;

        // Create a cache instance
        let cache = Cache::new(existant, "bugged_cache");

        // Check
        assert!(cache.exists());
        assert!(cache.get::<serde_json::Value>().is_err());

        // Ok!
        Ok(())
    }

    #[test]
    pub fn valid_cache_should_not_error_out() -> std::io::Result<()> {
        // Some random path
        let existant = PathBuf::from(".temp");

        // Create a file
        create_dir_all(existant.join("cache"))?;
        File::create(existant.join("cache").join("valid.json"))?
            .write_all("{ \"is this acktually correct\": true  }".as_bytes())?;

        // Create a cache instance
        let cache = Cache::new(existant, "valid");

        // Check
        assert!(cache.exists());
        assert!(cache.get::<serde_json::Value>().is_ok());

        // Ok!
        Ok(())
    }

    #[test]
    #[should_panic]
    pub fn try_to_get_cache_on_an_invalid_path() {
        // Some random path
        let non_existant_root = PathBuf::from("/it/just/should/not/exist");

        // Create a cache instance
        let cache = Cache::new(non_existant_root, "uwu");

        // Check
        assert!(!cache.exists());
        assert!(cache.get::<serde_json::Value>().is_err());
    }

    #[test]
    pub fn write_cache_to_path_that_cannot_be_created_by_guests() {
        // Some random path
        let non_existant_root = PathBuf::from("/it/just/should/not/exist");

        // Create a cache instance
        let cache = Cache::new(non_existant_root, "uwu");

        // Check
        assert!(cache.set(serde_json::Value::Bool(false)).is_err());
    }

    #[test]
    pub fn valid_file_should_be_written() -> std::io::Result<()> {
        // Some random path
        let existant = PathBuf::from(".temp");

        // Create a file
        create_dir_all(existant.join("cache"))?;
        let path = existant.join("cache").join("valid_write.json");

        // Create a cache instance
        let cache = Cache::new(existant, "valid_write");

        // Check
        assert!(cache.set(serde_json::Value::Bool(false)).is_ok());
        assert_eq!(std::fs::read_to_string(path)?, "false");

        // Ok!
        Ok(())
    }
}
