const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.port || 4800;

const api = require("./routes");


app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("", api);

app.listen(port, (req, res )=>{
    console.log(`App started running on port: ${port}`);
});


