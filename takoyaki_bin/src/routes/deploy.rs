use crate::{middlewares::{AuthGuard, Error}, utils::{DeploymentInfo, create_new_deployment}};
use uuid::Uuid;
use rocket::serde::json::Json;
use serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Response {
    error: bool,
    message: String,
    deployment_uuid: Option<String>
}

#[post("/deploy", format="application/json", data="<info>")]
pub fn create_deployment(info: Json<DeploymentInfo>, auth_guard: Result<AuthGuard, Error>) -> Json<Response> {
    // Return the error as the string (response)
    if auth_guard.is_err() {
        return Json(Response {
            error: true,
            message: auth_guard.unwrap_err().to_string(),
            deployment_uuid: None
        })
    }

    // Unwrap the error (it is safe!)
    let user = auth_guard.unwrap().username;

    // Generate a new UUID
    let uuid = Uuid::new_v4().to_string();

    // Create a new deployment
    create_new_deployment(&user, info.0, &uuid).unwrap();

    // Return success message
    Json(Response {
        error: false,
        message: String::from("Successfully created a new deployment"),
        deployment_uuid: Some(uuid)
    })
}
