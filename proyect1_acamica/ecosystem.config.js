module.exports = {
  apps : [
      {
        name: "delilah-api",
        script: "./src/index.js",
        watch: true,
        env: {
            "PORT": 3000,
            "NODE_ENV": "development",
	    "DB_HOST": 'mongodb+srv://USUARIOBASE:C11A22R33P44CY@cluster0.3feag.mongodb.net/PROYECT_ACAMICA3?retryWrites=true&w=majority',

	    "JWT_SECRET": 'contraseniasegura',
	    "JWT_ALGORITHMS": 'HS256',
        },
      }
  ]
}
