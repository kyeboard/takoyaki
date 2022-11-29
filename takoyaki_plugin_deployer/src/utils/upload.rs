use std::{path::PathBuf, process::Command};
use reqwest::{multipart, Body, Client};
use rocket::tokio::fs::File;
use tokio_util::codec::{FramedRead, BytesCodec};

fn file_to_body(file: File) -> Body {
    let stream = FramedRead::new(file, BytesCodec::new());

    Body::wrap_stream(stream)
}

pub async fn upload_file(file_path: PathBuf) -> Result<() , Box<dyn std::error::Error>> {
    // let file = File::open(file_path).await?;
    //
    // // Create headers
    // let mut headers = reqwest::header::HeaderMap::new();
    //
    // headers.insert("X-Appwrite-Key", "65453ec75b41dae25c0ef3c394d3103a9fc3650f6d159406b4ce76efd003a57e37dfa5abe0defd2dfb8cd71844ccb61a9d08bd067a75501ae1175977b98fa9f1c709aaae9644753a56b47301a3e27cff044990fe3351d505fa0e58fd1f71f460e7e3ddb26ae44b81c85e772bf87ddf0bab1313bb3c2c537ecb102cc8f1528ab7".parse().unwrap());
    // headers.insert("X-Appwrite-Project", "6382eb67628d28aca1e4".parse().unwrap());
    // headers.insert("Content-Type" , "multipart/form-data".parse().unwrap());
    //
    // let file_part = multipart::Part::stream(file_to_body(file));
    //
    // // Create new form
    // let form = multipart::Form::new()
    //     .text("fileId", "unique()")
    //     .part("file" , file_part);
    //
    // // Create a new Client
    // let client = reqwest::Client::new();
    //
    // // Send
    // let res = client
    //     .post("http://localhost/v1/storage/buckets/plugins/files")
    //     .headers(headers)
    //     .multipart(form)
    //     .send()
    //     .await?
    // ;
    //
    // println!("{:?}" , res.status());
    let curl = Command::new("curl")
        .args(["--request" , "POST" , "http://localhost/v1/storage/buckets/plugins/files"])
        .args(["--header" , &format!("X-Appwrite-Key: {}" , "65453ec75b41dae25c0ef3c394d3103a9fc3650f6d159406b4ce76efd003a57e37dfa5abe0defd2dfb8cd71844ccb61a9d08bd067a75501ae1175977b98fa9f1c709aaae9644753a56b47301a3e27cff044990fe3351d505fa0e58fd1f71f460e7e3ddb26ae44b81c85e772bf87ddf0bab1313bb3c2c537ecb102cc8f1528ab7")])
        .args(["--header" , &format!("X-Appwrite-Project: 6382eb67628d28aca1e4")])
        .args(["--form" , "fileId=\"unique()\""])
        .args(["--form" , &format!("file=@\"{}\"" , file_path.to_str().unwrap())])
        .spawn()?
        .wait()?
    ;
    
    Ok(())
}
