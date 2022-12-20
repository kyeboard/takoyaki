use std::fs::create_dir_all;

use crate::utils::{Logger, Directories};
use downloader::{Download, Downloader};

pub async fn install_plugin(name: &str) -> reqwest::Result<()> {
    // Create new logger instance
    let logger = Logger::new();
    let dirs = Directories::instance();

    // Print the message
    logger.success("Fetching metadata for the plugin...");

    // Request for the file
    let file_uri = format!("http://localhost/v1/storage/buckets/639f2f2693da66fc3d22/files/{}/download?project=639f2e32531c70a90614", name);

    let out = &dirs.plugins_directory.join(name);

    create_dir_all(out).unwrap();

    // Build the downloader
    let mut downloader = Downloader::builder()
        .download_folder(&out)
        .parallel_requests(1)
        .build()
        .unwrap();

    let dl = Download::new(&file_uri);

    downloader.download(&[dl]).unwrap();

    Ok(())
}
