use std::{path::PathBuf, process::{Stdio, Command}, fs::{File, OpenOptions}, io::Result};

pub struct Executor<'a> {
    commands: Vec<Vec<&'a str>>,
    dirs: Vec<PathBuf>,
    out_path: PathBuf
}

impl<'a> Executor<'a> {
    pub fn new(commands: Vec<Vec<&'a str>>, dirs: Vec<PathBuf>, out_path: PathBuf) -> Self {
        Self {
            commands,
            dirs,
            out_path
        }
    }

    pub fn get_output_file(&self) -> Result<(Stdio , Stdio)> {
        // Create the log  file
        let file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(&self.out_path)?;

        // Get the stderr
        let stderr = Stdio::from(file.try_clone()?);

        // Get the stdout
        let stdout = Stdio::from(file);

        Ok((stderr , stdout))
    }

    pub fn execute_at(&self, command: &Vec<&str>, cwd: &PathBuf) -> Result<()> {
        // Get the stderr and stdout
        let (stderr, stdout) = self.get_output_file()?;

        // Create a new command
        Command::new("faketty")
            .stdout(stdout)
            .stderr(stderr)
            .current_dir(cwd)
            .args(command)
            .spawn()?
            .wait()?;

        Ok(())
    }

    pub fn pipe_commands(&self) -> Result<()> {
        for (command, cwd) in self.commands.iter().zip(&self.dirs) {
            self.execute_at(command, cwd)?;
        } 

        Ok(())
    }
}
