#[macro_use]
extern crate rocket;

use std::error::Error;

mod utils;
mod route;

// Catches all OPTION requests in order to get the CORS related Fairing triggered.
#[options("/<_..>")]
fn all_options() {
    /* Intentionally left empty */
}

#[main]
async fn main() -> Result<() , Box<dyn Error>> {
    // Create a new instance of the setup
    let setup = utils::Setup::instance();

    // Ensure that the files exists
    setup.ensure_availability()?;

    // Create a new rocket instance
    let _ = rocket::build()
        .attach(utils::Cors)
        .mount("/", routes![all_options, route::create_new_deployment])
        .launch()
        .await?;

    Ok(())
}

