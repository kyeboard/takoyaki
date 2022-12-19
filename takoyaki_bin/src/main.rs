use clap::{Command, Arg};

mod commands;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let command = Command::new("takoyaki")
        .version(option_env!("CARGO_PKG_VERSION").unwrap_or("unknown"))
        .about("Elegantly print your contributions in your terminal")
        .arg_required_else_help(true)
        .subcommand(
            Command::new("plug")
                .about("Installs a new plugin")
                .arg_required_else_help(true)
                .arg(
                    Arg::new("name")
                        .required(true)
                )
        )
    ;

    let matches = command.get_matches();

    match matches.subcommand() {
        Some(("plug", sub_matches)) => {
            commands::install_plugin(
                sub_matches.get_one::<String>("name").unwrap()
            ).await?;
        },
        _ => {

        }
    };

    Ok(())
}
