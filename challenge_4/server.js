const express = require('express');
const app = express();

app.use(express.static('client'));
app.get('/', (req, res) => res.send('hi'));

app.listen(3000, () => console.log('bowling app listening on port 3000'));