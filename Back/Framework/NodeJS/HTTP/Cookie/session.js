const http = require('http');
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')

// reduce(callback, initialvalue);
//   - callback(acc, el, idx) {} : acc는 누산기 (누적된 계산에 용이)
//   - initialvalue : acc의 초기값에 대한 지정

// decodeURIComponent(encodedRI) : 암호화된 URI Component를 해독한다.
// encodeURIComponent(URI) : URI를 암화화한다.

// Cookie를 파싱한다.
const parseCookies = (cookie='') => {
  return cookie
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, [k, v])=> {
    acc[k.trim()] = decodeURIComponent(v);
    return acc;
  }, {});
};

// session 객체를 만든다. session변수 - 사용자 정보를 엮고, cookie로 session변수를 주는 것.
session = {};

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

  // 주소가 /login으로 시작하는 경우 : form 양식을 제출한 경우
  // /에서 시작하여 상대경로로 들어간다.
  if(req.url.startsWith('/login')){
    const {query} = url.parse(req.url);
    const {name} = qs.parse(query); // qs.parse(url.parse(req.url).query) 로 해도 무방
    const expires = new Date();
    // 쿠키 유효 시간을 현재로부 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() + 5);
    // session을 설정
    const uniqueInt = Date.now();
    session[uniqueInt] = {
      name,
      expires
    };
    res.writeHead(302, {
      Location : '/',
      'Set-Cookie' : `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();
  }

  // "세션이라는 쿠키가 존재하고, 아직 유효한 경우" : 쿠키가 유휴한 경우
  else if(cookies.session && cookies.session) {
    res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
    res.end(`${session[cookies.session].name}님 안녕하세용`);
  } 

  // /login으로 시작하지도 않거나, 세션 쿠기가 없거나, 유효하지 않은 경우 : 쿠키가 유효하지 않은 경우
  else {
    try {
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
      res.end(data);
    } catch(err) {
      res.writeHead(500, { 'Content-Type' :  'text/plain; charset=utf-8' } );
      res.end(err.message);
    }
  }
})

.listen(8084, ()=> {
  console.log("http://localhost:8084");
})

