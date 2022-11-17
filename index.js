const express = require('express');
const mongoose= require('mongoose');
const mongo_db = "mongodb+srv://sehyun:0720@cluster0.ken63ir.mongodb.net/?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();


//DB setting
mongoose.connect(mongo_db);     // process.nev > 환경변수 오브젝트(기본 제공) -- mongo_db 환경변수 불러옴
const db = mongoose.connection;             // db 연결

db.once('open', function(){                 // db.once > 연결 시 한번만 발생하는 이벤트
    console.log('DB connected');            
});
db.on('error', function(err){               // db.on > 연결 중 다양하게 발생 가능....
    console.log('DB Error : ', err);        // 연결 실패
}); 

//Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());                         // json 형식의 데이터를 받는다
app.use(bodyParser.urlencoded({extended:true}));    // urlencoded 데이터를 extended로 분석..? > req.body에서 form으로 입력받은 데이터를 사용할 수 있음
                                                    // ==> form에 입력한 데이터가 bodyParser를 통해 req.body로 생성이 된다..
app.use(methodOverride('_method'));                 // qeury에 들어오는 값으로 http method를 바꾼다.. ex) http://eee.com/category/id?_method=delete >> delete로 바뀜


//Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));


//Port setting
const port = 3000;
app.listen(port, function(){
    console.log('server on! http://localhost:'+port);
})