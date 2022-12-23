use rocket::serde::json::Json;
use serde::Serialize;

use crate::{middlewares::{AuthGuard, Error}, utils::Directories};


#[derive(Serialize)]
pub struct Response {
    error: Option<String>,
    logs: Option<String>
}

#[get("/poll/<name>/<uuid>")]
pub fn poll_logs(name: String, uuid: String, auth_guard: Result<AuthGuard, Error>) -> Json<Response> {
    // Return the error as the string (response)
    if auth_guard.is_err() {
        return Json(Response {
            error: Some(auth_guard.unwrap_err().to_string()),
            logs: None
        })
    }

    // Get the Directories
    let dirs = Directories::get_for_me(&auth_guard.unwrap().username, &name);

    // Read the file
    let file = std::fs::read_to_string(dirs.log_dir.join(format!("{}.txt" , uuid)));

    // Check if there is any error
    match file {
        Ok(log) => {
            Json(Response {
                error: None,
                logs: Some(log)
            })

        },
        Err(_) => {
            Json(Response {
                error: Some("No deployment for the specified project found.".to_string()),
                logs: None
            })
        }
    }
}
