use rocket::serde::{Deserialize, Serialize, json::Json};

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
pub fn create_new_deployment(info: Json<DeploymentDetails>) -> Json<Response> {
    let uuid = uuid::Uuid::new_v4().to_string();

    Json(Response {
        deployment_id: uuid
    })
}

