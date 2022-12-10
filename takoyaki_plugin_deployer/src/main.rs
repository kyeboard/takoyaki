#[macro_use] extern crate rocket;

mod routes;
mod utils;

#[main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let _ = rocket::build()
        .mount("/", routes![routes::create_new_deployment])
        .launch()
        .await?;

    Ok(())
}
