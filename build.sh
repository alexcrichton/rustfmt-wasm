set -ex

cargo +nightly build --target wasm32-unknown-unknown --release
rm -rf dist
mkdir dist
wasm-bindgen \
  target/wasm32-unknown-unknown/release/lol.wasm --out-dir dist \
  --no-modules
wasm-opt -Os dist/lol_bg.wasm -o dist/lol_bg.opt.wasm
mv dist/lol_bg.opt.wasm dist/lol_bg.wasm
#gzip -9 -k dist/lol_bg.wasm
python3 -m http.server
