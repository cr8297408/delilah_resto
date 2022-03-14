email administrador:  admin@gmail.com
contraseña administrador: 12345

tecnologias usadas:
	nodemon
	visual estudio code
	swagger
	gitlab
	mocha
	mongoDB
	express
	nodeJs
	postman

librerias (depedndencias) a instalar: 
	bcrypt
	express.
	dotenv
	express-jwt
	helmet
	joi
	jsonwebtoken
	mongoose
	swagger-jsdoc
	swagger-ui-express

libreruas (devDependecias) a instalar
	chai
	chai-http
	mocha

* correr nodemon = npm run dev
* correr test = npm run test

luego de instalar las dependencias, crear el archivo .env dentro de la carpeta src, y alli agregar la variable de entorno: 

	PORT = 3000

	DB_HOST = 'localhost'
	DB_NAME = 'acamica2'
	DB_PORT = 27017

	JWT_SECRET = 'contraseniasegura' -- contraseña utilizada para encriptar y desencriptar contraseñas, a modelo de prueba se colocó esta.
	JWT_ALGORITHMS = 'HS256'


link del swagger: 

	http://localhost:3000/api-docs

link gitlab:

    https://gitlab.com/cesarpuentes452/hola/-/tree/master/acamica_back-end/proyect1_acamica

IMPORTANTE: 

* EN MI APLICACION TODO ESTÁ VALIDADO, POR LO QUE PARA PODER USAR ALGUNOS ENDPOINTS HAY QUE TENER CREADOS TODOS LOS ELEMENTOS QUE SE PIDEN EN LOS MODELOS;
POR LO QUE PARA FACILITAR LA EVALUACION, HE CREADO UNA FUNCION QUE CREA ALGUNOS ELEMENTOS POR DEFECTO CUANDO LA BASE DE DATOS ESTÁ VACIA.

OTRA CONSIDERACION ES QUE A LA HORA DE CREAR LOS PEDIDOS, LOS NOMBRES DE LOS PRODUCTOS, LOS NOMBRES DE MEDIOS DE PAGO Y LOS DE LOS ESTADOS, DEBEN DE SER ESCRITOS
DE LA MISMA MANERA EN LA QUE ESTÁN EN LA BD.

CONCLUSION: INSTALAR PAQUETERIA, CORRER MONGOD Y CORRER EL COMANDO INDEX.JS CON ESTO YA QUEDARÁ CREADA LA BASE DE DATOS CON USUARIOS, PRODUCTOS, PEDIDOS, MEDIOS DE PAGO,
Y ESTADOS PARA LOS PEDIDOS POR DEFECTO.


por ultimo el merge a master, lo realicé aunque el mensaje quedo en un folder aparte. puede verse el commit
del merge devolviendose y mirando el folder SPRINT2