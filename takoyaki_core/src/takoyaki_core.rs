use serde::Deserialize;

use crate::{Powerup, Config, Cache};

pub struct Takoyaki<'a, T>
where
    T: for<'de> Deserialize<'de>
{
    name: &'a str,
    powerup: Box<dyn Powerup<T>>
}

impl<'a, T> Takoyaki<'a, T>
where
    T: for<'de> Deserialize<'de>
{
    pub fn with_powerup(name: &'a str, powerup: Box<dyn Powerup<T>>) -> Self {
        Self {
            name,
            powerup
        }
    }

    pub async fn start(&self) {
        // Get the root for the takoyaki
        let root = dirs::home_dir().unwrap().join(".takoyaki");
        let config_file = dirs::config_dir().unwrap().join("takoyaki").join("config.toml");

        // Create the instance of Config, Cache
        let config = Config::new(config_file).unwrap();
        let cache = Cache::new(root, self.name);

        // Get the state of the plugin
        let state = self.powerup.ready(cache);

        // Resolve the state
        let data: T = state.resolve().await.unwrap();

        // Get the printable from the data
        let printable = self.powerup.evolve(data);

        // Pretty print the data
        printable.pretty_print(config);
    } 
}

