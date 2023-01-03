pub type Result<T> = std::result::Result<T, Error>;

pub enum Error {
    SerializeError(serde_json::Error),
    ReqwestError(reqwest::Error)
}
