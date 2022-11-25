use rocket::{request::{FromRequest, Outcome}, Request, http::Status};
use crate::utils::get_user;

pub struct AuthGuard {
    pub username: String
}

#[derive(Debug)]
pub enum Error {
    InvalidAuthorizationHeader,
    InvalidToken
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

        let user = get_user(authorize_header.next().unwrap_or("")).await.unwrap();

        if user.error.is_some() {
            return Outcome::Failure((Status::Unauthorized, Error::InvalidToken));
        }

        Outcome::Success(Self { username: user.users.unwrap().into_iter().next().unwrap().screen_name })
    }
}
