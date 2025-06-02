#![deny(clippy::all)]

use futures::prelude::*;
use napi::bindgen_prelude::*;
use std::{fs, path::PathBuf, time::SystemTime};
use tokio;

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}

#[napi(object)]
pub struct FileMetadata {
  pub path: String,
  pub content: Option<String>,
  pub size: Option<f64>,
  pub modified: Option<String>,
  pub error: Option<String>,
}

#[napi]
pub fn read_file_info(name: String) -> FileMetadata {
  let path = PathBuf::from(&name).canonicalize();

  match path {
    Ok(full_path) => match fs::read_to_string(&full_path) {
      Ok(content) => {
        let metadata = fs::metadata(&full_path).ok();
        let size = metadata.as_ref().map(|m| m.len() as f64);
        let modified = metadata
          .and_then(|m| m.modified().ok())
          .and_then(|t| t.duration_since(SystemTime::UNIX_EPOCH).ok())
          .map(|d| format!("{}", d.as_secs()));

        FileMetadata {
          path: name,
          content: Some(content),
          modified,
          size,
          error: None,
        }
      }
      Err(err) => FileMetadata {
        path: name,
        content: None,
        modified: None,
        size: None,
        error: Some(format!("Failed to read content: {}", err)),
      },
    },
    Err(err) => FileMetadata {
      path: name,
      content: None,
      modified: None,
      size: None,
      error: Some(format!("Invalid Path: {}", err)),
    },
  }
}

#[napi]
pub async fn read_file_async(path: String) -> Result<Buffer> {
  tokio::fs::read(path)
    .map(|r| match r {
      Ok(content) => Ok(content.into()),
      Err(e) => Err(Error::new(
        Status::GenericFailure,
        format!("failed to read file, {}", e),
      )),
    })
    .await
}
