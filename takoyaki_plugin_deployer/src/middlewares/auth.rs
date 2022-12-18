use rocket::{request::{FromRequest, Outcome}, Request, http::Status};
use reqwest::{Client, Result};

pub struct AuthGuard {
    username: String
}

#[derive(Debug)]
pub enum Error {
    InvalidAuthorizationHeader,
    InvalidToken
}

async fn get_user(token: &str) -> reqwest::Result<()> {
    let client = Client::new();


    let res = client.get("http://localhost/v1/account/sessions/current")
        .header("X-Appwrite-JWT", token)
        .header("X-Appwrite-Project", "639eaa41605ece286d06")
        .send()
        .await?
        .text()
        .await?
    ;

    println!("{:?}", res);

    Ok(())
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthGuard {
    type Error = Error;

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let mut authorize_header = request
            .headers()
            .get_one("Authorization")
            .unwrap_or("")
            .split_whitespace()
            .collect::<Vec<&str>>()
            .into_iter();

        if authorize_header.next().unwrap_or("").to_lowercase() != "bearer" {
            return Outcome::Failure((Status::Unauthorized, Error::InvalidAuthorizationHeader));
        }

        let user = get_user(authorize_header.next().unwrap_or("")).await;

        // let user = get_user(authorize_header.next().unwrap_or("")).await.unwrap();
        //
        // if user.error.is_some() {
        //     return Outcome::Failure((Status::Unauthorized, Error::InvalidToken));
        // }

        // Outcome::Success(Self { username: user.users.unwrap().into_iter().next().unwrap().screen_name })
        Outcome::Success(Self {
            username: "kyeboard".to_string()
        })
    }
}
