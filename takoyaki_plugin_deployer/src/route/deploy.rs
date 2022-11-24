use rocket::serde::{Deserialize, Serialize, json::Json};
use crate::middlewares::AuthGuard;

#[derive(Deserialize)]
pub struct DeploymentDetails {
    pub name: String,
    pub github_url: String,
    pub branch: String,
    pub path: String,
}

#[derive(Serialize)]
pub struct Response {
    deployment_id: String
}

#[post("/deploy" , format="application/json" , data="<info>")]
pub fn create_new_deployment(info: Json<DeploymentDetails>, auth_guard: AuthGuard) -> Json<Response> {
    let uuid = uuid::Uuid::new_v4().to_string();

    Json(Response {
        deployment_id: uuid
    })
}

