use reqwest::Result;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug)]
pub struct UserError {}

// The user type
#[derive(Serialize, Deserialize, Debug)]
pub struct UserType {
    #[serde(rename = "screenName")]
    pub screen_name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub error: Option<UserError>,
    pub users: Option<Vec<UserType>>,
}

// Function to get the user from the token
pub async fn get_user(token: &str) -> Result<User> {
    // Create a new client
    let client = reqwest::Client::new();

    // Create a new empty body
    let mut body = HashMap::new();

    // Set the token
    body.insert("idToken", token);

    // Create a post request
    let resp: User = client
        .post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDV8RkplTsJa9NXueaUUunH7_OjxfIydEc")
        .header("Content-Type" , "application/json")
        .json(&body)
        .send()
        .await?
        .json()
        .await?
    ;

    Ok(resp)
}
