use rocket::Either;
use crate::{utils::{create_deployment, DeploymentInfo}, middlewares::AuthGuard};
use rocket::serde::json::Json;
use serde::Serialize;

// Response structs
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct SuccessResponse {
    deployment_id: String,
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct ErrorResponse<'a> {
    message: &'a str,
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
#[serde(transparent)]
pub struct Response<'a> {
    #[serde(with = "either::serde_untagged")]
    inner: Either<SuccessResponse, ErrorResponse<'a>>
}

fn create_new_uuid() -> String {
    uuid::Uuid::new_v4().to_string()
}

#[post("/deploy", format="application/json", data="<info>")]
pub async fn create_new_deployment<'a>(info: Json<DeploymentInfo>, auth: AuthGuard) -> Json<Response<'a>> {
    // Create a new uuid for the deployment
    let deployment_id = create_new_uuid();

    // Request a new deployment
    rocket::tokio::spawn(create_deployment(info.into_inner(), Box::leak(Box::new(deployment_id.clone()))));

    Json(Response { inner: Either::Left(SuccessResponse {
        deployment_id
    })})
}
