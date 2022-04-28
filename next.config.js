/** @type {import('next').NextConfig} */
const path = require("path");
const Dotenv = require("dotenv-webpack");

// TODO: なんでこのような設定になるのか調べる必要がある
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "./src")
    };
    config.plugins = [
      ...config.plugins,

      // 環境変数を優先して読み込む
      new Dotenv({
        systemvars: true
      })
    ];
    return config;
  }
}

module.exports = nextConfig
