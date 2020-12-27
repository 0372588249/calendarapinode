const bodyParser = require('body-parser');

const express = require('express');
var cors = require('cors')

const port = 18022;
const app = express();
const routes = require('./routes/routes');
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

// app.get('/', (request, response) => {
//     console.log(`URL: ${request.url}`);
//    // response.send('Hello, Server!');
//     response.send({message: 'Node.js and Express REST API'});
// });


// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});
