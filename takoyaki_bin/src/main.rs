#[macro_use]
extern crate rocket;

mod middlewares;
mod utils;
mod routes;

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![routes::create_deployment, routes::poll_logs])
}

