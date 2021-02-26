const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
var multer = require("multer");
var upload = multer();

const connection = require("./connection/connect");
const route = require("./route");
const universalFunction = require("./lib/universal-Function");
const { statusCode } = require("./constant");
var path = __dirname;
const server = require("http").createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(logger("dev"));

app.use("/api", route);

app.use((error, req, res, next) => {
	if (error) {
		console.error(error);
		return universalFunction.sendErrorResponse(req, res, statusCode.BAD_REQUEST, error.message || error);
	}
	next();
});

// for parsing multipart/form-data
app.use(upload.array());
// app.use(express.static("public/images/"));
app.use(express.static('public'));
//https://opaybackend.herokuapp.com/images/image-1607046449.jpg

// server.listen(config.get("port"),async()=>{
//    console.log(`Running on:`,config.get("port"));
//    // await connection.mongoDbconnection();
// });

server.listen(3000, async () => {
	console.log(`Running on:`, config.get("port"));
	await connection.mongoDbconnection();
});
