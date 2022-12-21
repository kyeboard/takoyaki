// Import dependencies
use rocket::{
    http::Status,
    request::{FromRequest, Outcome},
    Request,
};
use serde::{Serialize, Deserialize};

// Auth Guard struct
#[derive(Debug)]
pub struct AuthGuard {
    pub username: String,
}

// Types of error
#[derive(Debug)]
pub enum Error {
    NoToken,
    InvalidToken
}

// Able to convert errors to detailed error
impl ToString for Error {
    fn to_string(&self) -> String {
        match *self {
            Error::NoToken => { "No token was passed. Make sure to set X-Appwrite-JWT header" }
            Error::InvalidToken => { "Either the token is expired or it is invalid" }
        }.to_string()
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AppwriteResponse {
    message: Option<String>,
    name: Option<String>
}

// Utility to get the user from the X-Appwrite-JWT
pub async fn get_user_from_token(token: &str) -> reqwest::Result<AppwriteResponse> {
    // Create a new reqwest client
    let client = reqwest::Client::new();

    // Send request to get the session from the JWT
    client.get("http://localhost/v1/account/")
        .header("X-Appwrite-Project", "639f2e32531c70a90614")
        .header("X-Appwrite-JWT", token)
        .send()
        .await?
        .json()
        .await
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthGuard {
    type Error = Error;

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        // Get the token
        let token = request.headers().get_one("X-Appwrite-JWT");

        // Check if it is empty
        if token.is_none() {
            return Outcome::Failure((Status::Unauthorized, Error::NoToken));
        }

        // Check if the token is valid
        let user = get_user_from_token(token.unwrap()).await.unwrap();

        // Check if there is any error
        if user.message.is_some() {
            return Outcome::Failure((Status::Unauthorized, Error::InvalidToken))
        }

        // Return success!
        return Outcome::Success(Self { username: user.name.unwrap() })
    }
}
