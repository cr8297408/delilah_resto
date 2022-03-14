module.exports = {
  apps : [
      {
        name: "",
        script: "./src/index.js",
        watch: true,
        env: {
            "PORT": ,
            "NODE_ENV": "development",
            "DB_HOST": '',

            "JWT_SECRET": '',
            "JWT_ALGORITHMS": '',
        },
      }
  ]
}

