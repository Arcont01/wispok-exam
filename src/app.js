const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

global.__basedir = __dirname + "/";

const routerApi = require('./routes');

const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CRUD Node.js');
});

routerApi(app);

app.listen(port, () => {
    console.log("Port ==> ", port);
});