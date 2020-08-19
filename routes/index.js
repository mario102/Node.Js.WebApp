"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { title: 'Главная', path: "/" });
});
router.get('/discription', (req, res) => {
    res.render('discriptions', { title: 'Описание', path: "/discription" });
});
exports.default = router;
//# sourceMappingURL=index.js.map