import express = require("express");
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index',{title: 'Експресс'});
});
router.get('/discription', (req, res) =>{
    res.render('discriptions', {title: 'Описание'});
});

export default router;