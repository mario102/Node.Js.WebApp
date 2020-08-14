import express = require('express');
import path = require('path');
import index from './routes/index';

const app = express();

/*Настройка сервера*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'views');
app.use(express.static(path.join(__dirname,'bower_components')));

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
let server = app.listen(app.get('port'), ()=>{
    console.debug('Запускаем сервер на прослушивание на порту ' + app.get('port').toString());
})