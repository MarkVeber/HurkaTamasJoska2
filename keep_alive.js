const express = require('express');
const app = express();
const port = 2323;
app.get('/', (req, res) => res.send('Sztéjn alájv!'));

app.listen(port, () => console.log(`Iten tudsz listöningőni: http://localhost:${port}`));