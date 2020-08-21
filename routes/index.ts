import express = require("express");
import bodyParser = require("body-parser");
const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) =>{
    res.render('index',{title: 'Главная', path: "/"});
});
router.get('/discription', (req, res) =>{
    res.render('discriptions', {title: 'Описание', path: "/discription"});
});
router.get('/chat', (req, res) =>{
    res.render('chat', {title: 'Чат', path: '/chat'});
});
router.post('/chat', urlEncodedParser, (req, res) =>{
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.send(req.body.Message);
});

export default router;