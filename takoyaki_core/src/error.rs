pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    SerializeError(serde_json::Error),
    ReqwestError(reqwest::Error),
    CorruptConfig,
    ReadError(std::io::Error),
    ConfigNotLoaded,
    HexParseError(colorsys::ParseError),
}
