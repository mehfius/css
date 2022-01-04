const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static("./export"));
app.use(cors());

console.log("acesso");

app.get('/', (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  require('./csscompact');
  //require('./jscompact');

  console.log('Compactou');
  
  res.send('!')

});

app.listen(8000, function () {
  console.log("rodando");
});
