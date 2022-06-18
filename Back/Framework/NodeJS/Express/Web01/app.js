const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, './public')));
app.use(express.json())
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,
  cookie : {
    httpOnly : true,
    secure : false
  },
  name : 'session-cookie',
}));

app.use((req, res, next) => {

  next();
})

app.get('/', (req, res, next)=> {
  console.log("GET / 요청에서만 실행된다.");
  res.sendFile(path.resolve(__dirname, "index.html"));
  // next();
}, (req, res) => {
  throw new Error("에러는 에러처리 미들웨어로 갑니다.")
});

// 에러처리 미들웨어
app.use((err, req, res, next)=> {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () =>{
  console.log("http://localhost:3000");
});