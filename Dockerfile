FROM ubuntu:18.04 as binaryen

RUN apt-get update -y && apt-get install -y --no-install-recommends \
  git \
  g++ \
  libc6-dev \
  ca-certificates \
  make \
  cmake \
  python

RUN git clone https://github.com/WebAssembly/binaryen
WORKDIR /binaryen
RUN cmake -DCMAKE_BUILD_TYPE=Release .
RUN make -j$(nproc)
RUN make install

FROM ubuntu:18.04 as rust

RUN apt-get update -y && apt-get install -y --no-install-recommends \
  curl \
  gcc \
  libc6-dev \
  ca-certificates \
  patch

RUN curl https://sh.rustup.rs | sh -s -- -y --default-toolchain nightly-2018-09-07
ENV PATH=$PATH:/root/.cargo/bin
RUN rustup target add wasm32-unknown-unknown

WORKDIR /app
RUN curl -L https://crates.io/api/v1/crates/isatty/0.1.8/download | tar xzf -
RUN curl -L https://crates.io/api/v1/crates/rustc-ap-rustc_data_structures/237.0.0/download | tar xzf -
RUN curl -L https://crates.io/api/v1/crates/rustc-ap-rustc_errors/237.0.0/download | tar xzf -
RUN curl -L https://crates.io/api/v1/crates/rustfmt-nightly/0.99.4/download | tar xzf -
COPY . /app/src
RUN cd isatty-0.1.8 && patch -Np1 < /app/src/isatty.patch
RUN cd rustc-ap-rustc_data_structures-237.0.0 && patch -Np1 < /app/src/rustc-data-structures.patch
RUN cd rustc-ap-rustc_errors-237.0.0 && patch -Np1 < /app/src/rustc_errors.patch
RUN cd rustfmt-nightly-0.99.4 && patch -Np1 < /app/src/rustfmt.patch
WORKDIR /app/src
RUN cargo build --target wasm32-unknown-unknown --release
