use std::{path::PathBuf, process::Command};
use crate::rocket::tokio::io::AsyncWriteExt;
use std::io::Write;
use std::io::Read;
use std::fs::File;
use futures::stream::iter;
use streamer::{Stream, StreamExt, Streaming};
use reqwest::{multipart, Body, Client};
use tokio_util::codec::{FramedRead, BytesCodec};

pub async fn upload_file(file_path: PathBuf) -> Result<() , Box<dyn std::error::Error>> {
    // Open the file
    let file = File::open(file_path)?;

    // Create a streaming object
    let streaming = Streaming::new(file);

    // Create headers
    let mut headers = reqwest::header::HeaderMap::new();

    headers.insert("X-Appwrite-Key", "65453ec75b41dae25c0ef3c394d3103a9fc3650f6d159406b4ce76efd003a57e37dfa5abe0defd2dfb8cd71844ccb61a9d08bd067a75501ae1175977b98fa9f1c709aaae9644753a56b47301a3e27cff044990fe3351d505fa0e58fd1f71f460e7e3ddb26ae44b81c85e772bf87ddf0bab1313bb3c2c537ecb102cc8f1528ab7".parse()?);
    headers.insert("X-Appwrite-Project", "6382eb67628d28aca1e4".parse()?);

    let id: Option<String> = None;
    let client = reqwest::Client::new();

    // Iterate through all the chunks
    streaming
        .chunks(5 * 1024 * 1024) // 5MB
        .for_each(|en| async {
            rocket::tokio::fs::write(PathBuf::from("test") , en).await;
            let file = rocket::tokio::fs::File::open("test").await.unwrap();

            let stream = FramedRead::new(file , BytesCodec::new());
            let body = multipart::Part::stream(Body::wrap_stream(stream));

            let form = multipart::Form::new()
                .text("fileId", "unique()")
                .part("file" , body);

            let res = client 
                .post("http://localhost/v1/storage/buckets/plugins/files")
                .headers(headers.clone()) 
                .multipart(form)
                .send()
                .await
                .unwrap();

            println!("{:?}" , res.status());
        })
        .await
    ;

    Ok(())
}

// pub async fn upload_file(file_path: PathBuf) -> Result<() , Box<dyn std::error::Error>> {
//     // Open the file
//     let mut file = File::open(file_path)?;
//
//     // Set the chunk size
//     let size = 0x4000;
//
//     // Create headers
//     let mut headers = reqwest::header::HeaderMap::new();
//
//     headers.insert("X-Appwrite-Key", "65453ec75b41dae25c0ef3c394d3103a9fc3650f6d159406b4ce76efd003a57e37dfa5abe0defd2dfb8cd71844ccb61a9d08bd067a75501ae1175977b98fa9f1c709aaae9644753a56b47301a3e27cff044990fe3351d505fa0e58fd1f71f460e7e3ddb26ae44b81c85e772bf87ddf0bab1313bb3c2c537ecb102cc8f1528ab7".parse()?);
//     headers.insert("X-Appwrite-Project", "6382eb67628d28aca1e4".parse()?);
//     headers.insert("Content-Type" , "multipart/form-data".parse()?);
//     let id: Option<String> = None;
//     let client = reqwest::Client::new();
//
//
//     loop {
//         // Create a vector with the size
//         let mut chunk = Vec::with_capacity(size);
//
//         // Write to the vector
//         let length = file.by_ref().take(size as u64).read_to_end(&mut chunk)?;
//
//         // Check if we have reached the end
//         if length == 0 {
//             break
//         }
//
//         let form = multipart::Form::new()
//             .text("fileId", "unique()")
//             .part("file" , file_stream);
//
//         if id.is_some() {
//             headers.clone().insert("X-Appwrite-ID", id.clone().unwrap().parse()?);
//         }
//
//         let res = client 
//             .post("http://localhost/v1/storage/buckets/plugins/files")
//             .headers(headers.clone()) 
//             .multipart(form)
//             .send()
//             .await?
//         ;
//
//         println!("{:?}" , res.status());
//         println!("{:?}" , res.text().await?);
//
//         break;
//     };
//
//     // let file = File::open(file_path).await?;
//     //
//     // // Create headers
//     // let mut headers = reqwest::header::HeaderMap::new();
//     //
//     // headers.insert("X-Appwrite-Key", "65453ec75b41dae25c0ef3c394d3103a9fc3650f6d159406b4ce76efd003a57e37dfa5abe0defd2dfb8cd71844ccb61a9d08bd067a75501ae1175977b98fa9f1c709aaae9644753a56b47301a3e27cff044990fe3351d505fa0e58fd1f71f460e7e3ddb26ae44b81c85e772bf87ddf0bab1313bb3c2c537ecb102cc8f1528ab7".parse().unwrap());
//     // headers.insert("X-Appwrite-Project", "6382eb67628d28aca1e4".parse().unwrap());
//     // headers.insert("Content-Type" , "multipart/form-data".parse().unwrap());
//     //
//     // let file_part = multipart::Part::stream(file_to_body(file));
//     //
//     // // Create new form
//     // let form = multipart::Form::new()
//     //     .text("fileId", "unique()")
//     //     .part("file" , file_part);
//     //
//     // // Create a new Client
//
//     //
//     // // Send
//     // let res = client
//     //     .post("http://localhost/v1/storage/buckets/plugins/files")
//     //     .headers(headers) 
//     //     .multipart(form)
//     //     .send()
//     //     .await?
//     // ;
//     //
//     // println!("{:?}" , res.status());
//     // let curl = Command::new("curl")
//     //     .args(["--request" , "POST" , "http://localhost/v1/storage/buckets/plugins/files"])
//     //     .args(["--header" , &format!("X-Appwrite-Key: {}" , "65453ec75b41dae25c0ef3c394d3103a9fc3650f6d159406b4ce76efd003a57e37dfa5abe0defd2dfb8cd71844ccb61a9d08bd067a75501ae1175977b98fa9f1c709aaae9644753a56b47301a3e27cff044990fe3351d505fa0e58fd1f71f460e7e3ddb26ae44b81c85e772bf87ddf0bab1313bb3c2c537ecb102cc8f1528ab7")])
//     //     .args(["--header" , &format!("X-Appwrite-Project: 6382eb67628d28aca1e4")])
//     //     .args(["--form" , "fileId=\"unique()\""])
//     //     .args(["--form" , &format!("file=@\"{}\"" , file_path.to_str().unwrap())])
//     //     .spawn()?
//     //     .wait()?
//     // ;
//     
//     Ok(())
// }
