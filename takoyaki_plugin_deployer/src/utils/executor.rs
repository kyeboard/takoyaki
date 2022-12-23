use std::{path::PathBuf, process::{Stdio, Command, ExitStatus}, fs::OpenOptions};

pub struct Executor {
    out_path: PathBuf
}

impl Executor {
    pub fn new(out_path: PathBuf) -> Self {
        Self {
            out_path
        }
    }

    pub fn get_out(&self) -> std::io::Result<Stdio> {
        // Open the file
        let file = OpenOptions::new()
            .append(true)
            .create(true)
            .read(true)
            .write(true)
            .open(&self.out_path)?
        ;

        // Create Stdio
        Ok(Stdio::from(file))
    }

    pub fn execute(&self, command: Vec<&str>, dir: &PathBuf) -> Result<ExitStatus, Box<dyn std::error::Error>> {
        // Get output
        let stdout = self.get_out()?;
        let stderr = self.get_out()?;

        // Create a command
        let status = Command::new("faketty")
            .current_dir(dir)
            .stdout(stdout)
            .stderr(stderr)
            .args(command)
            .spawn()?
            .wait()?;

        Ok(status)
    }
}
