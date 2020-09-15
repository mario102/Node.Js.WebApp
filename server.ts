import * as http from 'http';
import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import index from './routes/index';
import WebSocket = require('ws');
import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
  } from "sequelize";


const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server: server, clientTracking: true });
const sequelize = new Sequelize("mysql://test:test@localhost:3306/nodejsdatabase");

/*Настройка сервера*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'views');
app.use(express.static(path.join(__dirname,'bower_components')));
app.use(favicon(__dirname + '/favicon.ico'));

/*Вешаем обработчик на событие "connection" ws сервера*/
wsServer.on('connection', function connection(ws, req){
    console.log("К вебсокет серверу подключился клиент");
    ws.on('message', function recived(data){
        wsServer.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data);
            }
        });
    });
    ws.on('close', (code, reason)=>{
        console.log('Клиент закрыл соединение с webSocket сервером с кодом: ' + code + ' по причине: ' + reason);
    });
});

try {
    sequelize.authenticate();
    console.log('Соединение успешно установлено');
  } catch (error) {
    console.error('Соединение не установлено по причине: ', error);
  }

/*Конвеер обработки http запросов*/
app.use('/', index);

//если запрос по конвееру дошёл до сюда, значит запрашиваемая страница или файл или что-то ещё не найдено
//значит формируем ошибку и выдаём её юзеру
app.use(function(req, res, next){
    let err = new Error('Not found');
    err['status'] = 404;
    next(err);//формируем ошибку и передаём её дальше по конвееру
})

if (app.get('env') === 'development') {//если приожение находится в разработке, показываем ошибку со всеми подробностями
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {//иначе просто выводим название ошибки
    res.status(err['status'] || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
/*Конец конвеера*/

app.set('port', 3000);

server.listen(app.get('port'), () => {
    console.debug('Сервер запустился на прослушивание на порту ' + app.get('port'));
});