const express = require('express');
const Router = express.Router;

Router.length('/webtech',(req,res)=>{
    res.send('Webtech')
})
module.exports = Router;