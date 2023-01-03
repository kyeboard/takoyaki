use crate::{Cache, Error};
use reqwest::RequestBuilder;
use serde::Deserialize;

// Enum to set the state of the Pending
pub enum Pending {
    Cache(Cache),
    Reqwest(RequestBuilder)
}

pub struct State {
    pending: Pending
}

impl State {
    pub fn from_cache(cache: Cache) -> Self {
        Self {
            pending: Pending::Cache(cache)
        }
    }

    pub fn from_reqwest(client: RequestBuilder) -> Self {
        Self {
            pending: Pending::Reqwest(client)
        }
    }

    pub async fn resolve<T>(&self) -> crate::Result<T> 
    where
        T: for<'de> Deserialize<'de>
    {
        match &self.pending {
            Pending::Cache(cache) => {
                cache.get::<T>().map_err(|e| Error::SerializeError(e))
            },
            Pending::Reqwest(client) => {
                client
                    .try_clone()
                    .unwrap()
                    .header("User-Agent", "takoyaki")
                    .send()
                    .await
                    .map_err(|e| Error::ReqwestError(e))?
                    .json()
                    .await
                    .map_err(|e| Error::ReqwestError(e))
            }
        }
    }
}


// Tests
#[cfg(test)]
mod tests {
    use std::{path::PathBuf, fs::{create_dir_all, File}, io::Write};

    use crate::{Cache, State};

    #[tokio::test]
    pub async fn resolve_state_from_cache() -> std::io::Result<()> {
        let existant = PathBuf::from(".temp"); 

        // Create a file
        create_dir_all(existant.join("cache"))?;
        File::create(existant.join("cache").join("state_cache.json"))?.write_all("{ \"is this acktually correct\": true  }".as_bytes())?;

        // Create a cache instance
        let cache = Cache::new(existant, "state_cache");

        // Create state
        let state = State::from_cache(cache);

        // Check
        assert!(state.resolve::<serde_json::Value>().await.is_ok());

        Ok(())
    }

    #[tokio::test]
    pub async fn resolve_state_from_reqwest() -> std::io::Result<()> {
        let client = reqwest::Client::new()
            .get("https://jsonplaceholder.typicode.com/todos/1")
        ;

        // Create state
        let state = State::from_reqwest(client);

        // Check
        assert!(state.resolve::<serde_json::Value>().await.is_ok());

        Ok(())
    }

    #[tokio::test]
    pub async fn resolve_state_from_reqwest_but_invalid_url() -> std::io::Result<()> {
        let client = reqwest::Client::new()
            .get("https://ifthisexists.imgonnabesupersed.rust/some/route")
        ;

        // Create state
        let state = State::from_reqwest(client);

        // Check
        assert!(state.resolve::<serde_json::Value>().await.is_err());

        Ok(())
    }

    #[tokio::test]
    #[should_panic]
    pub async fn resolve_state_but_invalid_cache() {
        // Some random path
        let non_existant_root = PathBuf::from("/it/just/should/not/exist"); 

        // Create a cache instance
        let cache = Cache::new(non_existant_root, "uwu");

        // Create state
        let state = State::from_cache(cache);

        // Check
        assert!(state.resolve::<serde_json::Value>().await.is_err());
    }
}
