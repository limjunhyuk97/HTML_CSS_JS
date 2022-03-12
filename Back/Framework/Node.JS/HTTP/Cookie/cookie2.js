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

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

  // 주소가 /login으로 시작하는 경우
  // /에서 시작하여 상대경로로 들어간다.
  if(req.url.startsWith('/login')){
    const {query} = url.parse(req.url);
    const {name} = qs.parse(query); // qs.parse(url.parse(req.url).query) 로 해도 무방
    const expires = new Date();
    // 쿠키 유효 시간을 현재로부 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() + 5);
    // 302 : 임시 이동 + Header에 Cookie 추가해서 response로 보냄 + Cookie 정보에는 name=... Expires=... HttpOnly Path=/
    // 브라우저는 302 응답을 보면 해당 주소(Location)로 페이지를 redirect 한다
    // 한글은 헤더에 포함될 수 없으므로 encodeURIComponent를 사용
    res.writeHead(302, {
      Location : '/',
      'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();
  }

  // "name이라는 쿠키가 있는 경우"
  else if(cookies.name) {
    res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
    res.end(`${cookies.name}님 안녕하세용`);
  } 

  // /login으로 시작하지도, "name 쿠키가 없는 경우"
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

