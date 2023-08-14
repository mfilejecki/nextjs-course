/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "",
    mongodb_password: "",
    mongodb_clustername: "",
    mongodb_databasekey: "",
  },
};

module.exports = nextConfig;
