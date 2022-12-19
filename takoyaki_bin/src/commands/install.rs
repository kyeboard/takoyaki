use std::cmp::min;
use std::fs::File;
use std::io::Write;

use reqwest::Client;
use indicatif::{ProgressBar, ProgressStyle};
use futures_util::StreamExt;
use colored::*;

pub async fn download_file(client: &Client, url: &str, path: &str) -> Result<(), String> {
    // Reqwest setup
    let res = client
        .get(url)
        .send()
        .await
        .unwrap()
    ;

    let total_size = res
        .content_length()
        .unwrap_or(8640000)
    ;

    // Indicatif setup
    let pb = ProgressBar::new(total_size);

    // Create a style
    pb.set_style(ProgressStyle::default_bar()
        .template("{msg}\n{spinner:.green} [{elapsed_precise}] [{wide_bar:.cyan/blue}] {bytes}/{total_bytes} ({bytes_per_sec}, {eta})")
        .progress_chars("#>-"));
    
    pb.set_message(&format!("Downloading {}", url));

    // download chunks
    let mut file = File::create(path).or(Err(format!("Failed to create file '{}'", path)))?;
    let mut downloaded: u64 = 0;
    let mut stream = res.bytes_stream();

    while let Some(item) = stream.next().await {
        let chunk = item.or(Err(format!("Error while downloading file")))?;
        file.write_all(&chunk)
            .or(Err(format!("Error while writing to file")))?;
        let new = min(downloaded + (chunk.len() as u64), total_size);
        downloaded = new;
        pb.set_position(new);
    }

    pb.finish_with_message(&format!("Downloaded {} to {}", url, path));
    return Ok(());
}

pub async fn install_plugin(name: &str) -> reqwest::Result<()> {
    // Print the message
    println!("==> {}", "Getting metadata for the plugin...".green());

    // Request for the file
    let file_uri = format!("https://bigota.d.miui.com/V14.0.22.12.8.DEV/miui_ALIOTH_V14.0.22.12.8.DEV_b32a86af08_13.0.zip");

    // Download the file
    let client = reqwest::Client::new();

    // Send the request to get the file
    // let file = 
    download_file(&Client::new(), &file_uri, "github").await.unwrap();

    Ok(())
}
