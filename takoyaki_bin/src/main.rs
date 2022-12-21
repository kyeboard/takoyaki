#[macro_use]
extern crate rocket;

mod middlewares;
mod routes;

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![routes::create_deployment])
}
