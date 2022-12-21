use crate::{middlewares::{AuthGuard, Error}, utils::{DeploymentInfo, create_new_deployment}};
use rocket::serde::json::Json;
use serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Response {
    error: bool,
    message: String
}

#[post("/deploy", format="application/json", data="<info>")]
pub fn create_deployment(info: Json<DeploymentInfo>, auth_guard: Result<AuthGuard, Error>) -> Json<Response> {
    // Return the error as the string (response)
    if auth_guard.is_err() {
        return Json(Response {
            error: true,
            message: auth_guard.unwrap_err().to_string()
        })
    }

    // Unwrap the error (it is safe!)
    let user = auth_guard.unwrap().username;

    // Create a new deployment
    create_new_deployment(&user, info.0).unwrap();

    Json(Response {
        error: false,
        message: user
    })
}
