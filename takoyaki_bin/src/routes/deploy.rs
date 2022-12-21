use crate::middlewares::{AuthGuard, Error};
use rocket::serde::json::Json;
use serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Response {
    error: bool,
    message: String
}

#[post("/deploy")]
pub fn create_deployment(auth_guard: Result<AuthGuard, Error>) -> Json<Response> {
    // Return the error as the string (response)
    if auth_guard.is_err() {
        return Json(Response {
            error: true,
            message: auth_guard.unwrap_err().to_string()
        })
    }

    // Unwrap the error (it is safe!)
    let user = auth_guard.unwrap().username;


    Json(Response {
        error: false,
        message: user
    })
}
