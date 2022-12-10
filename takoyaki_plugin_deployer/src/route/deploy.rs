use crate::middlewares::AuthGuard;
use crate::utils::{create_deployment, DeploymentInfo};
use rocket::serde::{json::Json, Serialize};

#[derive(Serialize)]
pub struct Response {
    deployment_id: String,
}

#[post("/deploy", format = "application/json", data = "<info>")]
pub fn create_new_deployment(info: Json<DeploymentInfo>, auth_guard: AuthGuard) -> Json<Response> {
    let uuid = uuid::Uuid::new_v4().to_string();

    rocket::tokio::spawn(create_deployment(info.0, auth_guard.username, uuid.clone()));

    Json(Response {
        deployment_id: uuid,
    })
}
