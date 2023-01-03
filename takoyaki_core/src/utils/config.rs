use std::path::PathBuf;
use colorsys::Rgb;
use serde::Deserialize;
use crate::Error;

#[derive(Deserialize)]
pub struct ConfigType {
    pub unicode: Unicode,
    pub colors: serde_json::Value
}

#[derive(Deserialize)]
pub struct Unicode {
    pub unicode: String,
    pub paint: String
}

pub struct Config {
    pub config: ConfigType
}

impl Config {
    pub fn new(endpoint: PathBuf) -> crate::Result<Self> {
        // Read the config as a raw string
        let raw = std::fs::read_to_string(endpoint).map_err(crate::Error::ReadError)?;

        // Parse it to the type
        Ok(Self {
            config: toml::from_str(&raw).map_err(|_| crate::Error::CorruptConfig)?
        })
    }

    pub fn get_color(&self, count: usize, fallback: String) -> crate::Result<Rgb> {
        // Create a json value for the fallback color
        let fallback_color = serde_json::Value::String(fallback);

        // Retrieve the color
        let color = self.config.colors.get(format!("{}_contribution", count)) // Get the color for the count of contributions
            .or_else(|| self.config.colors.get("x_contribution")) // Get the color for the variable count of contributions
            .unwrap_or(&fallback_color); // If none of them exists, use the fallback color
        
        // Convert the color to RGB format
        colorsys::Rgb::from_hex_str(color.as_str().unwrap()).map_err(Error::HexParseError)
    }

    pub fn get_unicode(&self) -> &Unicode {
        &self.config.unicode
    }
}

#[cfg(test)]
mod tests {
    use std::{fs::{create_dir_all, File}, path::PathBuf, io::Write};

    use crate::Config;

    fn before_all(name: &str) -> std::io::Result<()> {
        let raw_config = "
[unicode]
unicode = \"ඞ \"
paint = \"fg\"

[colors]
9_contribution = \"#A1BE91\"
x_contribution = \"#A3BE8C\"";

        // Create the temporary directory
        create_dir_all(PathBuf::from(".temp"))?;

        // Create a file that will contain the config
        let mut file = File::create(PathBuf::from(".temp").join(format!("config_{}.toml", name)))?;

        // Write to the file
        file.write_all(raw_config.as_bytes())?;

        // Ok!
        Ok(())
    }

    #[test]
    pub fn specific_color_should_be_used() -> std::io::Result<()> {
        before_all("specific_color")?;

        // Create config instance
        let config = Config::new(PathBuf::from(".temp").join("config_specific_color.toml")).unwrap();

        // Get the color
        let color = config.get_color(9, "".to_string()).unwrap();

        // Check
        assert_eq!(color.red() as usize, 161);
        assert_eq!(color.green() as usize, 190);
        assert_eq!(color.blue() as usize, 145);

        Ok(())
    }

    #[test]
    pub fn x_contribution_color_should_be_used() -> std::io::Result<()> {
        before_all("x_contribution")?;

        // Create config instance
        let config = Config::new(PathBuf::from(".temp").join("config_x_contribution.toml")).unwrap();

        // Get the color
        let color = config.get_color(1, "".to_string()).unwrap();

        // Check
        assert_eq!(color.red() as usize, 163);
        assert_eq!(color.green() as usize, 190);
        assert_eq!(color.blue() as usize, 140);

        Ok(())
    }

    #[test]
    pub fn fallback_color_should_be_used() -> std::io::Result<()> {
        let raw_config = "
[unicode]
unicode = \"ඞ \"
paint = \"fg\"

[colors]
9_contribution = \"#A1BE91\"";

        // Create the temporary directory
        create_dir_all(PathBuf::from(".temp"))?;

        // Create a file that will contain the config
        let mut file = File::create(PathBuf::from(".temp").join("fallback_color_config.toml"))?;

        // Write to the file
        file.write_all(raw_config.as_bytes())?;

        // Create config instance
        let config = Config::new(PathBuf::from(".temp").join("fallback_color_config.toml")).unwrap();

        // Get the color
        let color = config.get_color(1, "#88C0D0".to_string()).unwrap();

        // Check
        assert_eq!(color.red() as usize, 136);
        assert_eq!(color.green() as usize, 192);
        assert_eq!(color.blue() as usize, 208);

        Ok(())
    }

    #[test]
    pub fn invalid_color_should_error_out() -> std::io::Result<()> {
        let raw_config = "
[unicode]
unicode = \"ඞ \"
paint = \"fg\"

[colors]
9_contribution = \"#A1BE91\"";

        // Create the temporary directory
        create_dir_all(PathBuf::from(".temp"))?;

        // Create a file that will contain the config
        let mut file = File::create(PathBuf::from(".temp").join("invalid_color_config.toml"))?;

        // Write to the file
        file.write_all(raw_config.as_bytes())?;

        // Create config instance
        let config = Config::new(PathBuf::from(".temp").join("invalid_color_config.toml")).unwrap();

        // Get the color
        let color = config.get_color(1, "uwu".to_string());

        // Check
        assert!(color.is_err());

        Ok(())
    }

    #[test]
    pub fn unicode_should_be_parsed_correctly() -> std::io::Result<()> {
        before_all("unicode_parse")?;    

        // Create config instance
        let config = Config::new(PathBuf::from(".temp").join("config_unicode_parse.toml")).unwrap();

        // Check
        assert_eq!(config.get_unicode().unicode, "ඞ ");
        assert_eq!(config.get_unicode().paint, "fg");

        Ok(())
    }

}
