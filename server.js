const express = require("express")
const app = express()
const path = require('path')

app.get("/", function(req, res) {
  console.log("Game runing running on port localhost:3000") 
  res.sendFile(path.join(__dirname+'/index.html'));

})
  app.use(express.static(__dirname + '/src'));

app.listen(3000)
