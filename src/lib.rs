extern crate wasm_bindgen;
extern crate rustfmt_nightly;
extern crate console_error_panic_hook;

use wasm_bindgen::prelude::*;
use rustfmt_nightly::{Session, Config, Input, FormatReport, ErrorKind};

#[wasm_bindgen]
pub fn rustfmt(input: &str) -> RustfmtResult {
    console_error_panic_hook::set_once();
    let mut config = Config::default();
    let mut dst = Vec::new();
    config.override_value("emit_mode", "stdout");
    let report = {
        let mut session = Session::new(config, Some(&mut dst));
        let report = match session.format(Input::Text(input.to_string())) {
            Ok(report) => report,
            Err(err) => return RustfmtResult {
                contents: String::new(),
                state: Err(err),
            },
        };
        report
    };
    RustfmtResult {
        contents: String::from_utf8(dst).unwrap(),
        state: Ok(report),
    }
}

#[wasm_bindgen]
pub struct RustfmtResult {
    contents: String,
    state: Result<FormatReport, ErrorKind>,
}

#[wasm_bindgen]
impl RustfmtResult {
    pub fn code(&self) -> String {
        self.contents.clone()
    }

    pub fn error(&self) -> Option<String> {
        self.state.as_ref().err().map(|s| s.to_string())
    }
}
