const express = require('express');
const app = express();

app.use(express.static('dist'));

app.use(express.static('client'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('connect four server listening on port 3000'));