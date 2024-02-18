const express = require('express')
const routers = express.Router();

routers.get('/laura',(req,res)=>{
    res.send('laura')
});

module.exports = routers;