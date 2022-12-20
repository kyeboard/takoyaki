use colored::*;

pub struct Logger {
    prefix_character: String
}

impl Logger {
    pub fn new() -> Self {
        Self {
            prefix_character: "==>".to_string()
        }
    }

    pub fn error(&self , msg: &str) -> ! {
        eprintln!("{} {}" , self.prefix_character , msg.red());

        std::process::exit(1)
    }

    pub fn success(&self , msg: &str) {
        println!("{} {}" , self.prefix_character , msg.green())
    } 

    pub fn warning(&self , msg: &str) {
        println!("{} {}" , self.prefix_character , msg.green())
    }
}

