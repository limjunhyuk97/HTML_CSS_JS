// req.url 은 string, string.prototype.startsWith 로 특정 문자열로 시작하는지 확인
// req.on('data', callback)  : stream 형식의 데이터 반환
// req.end('ok')

const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용 : 영구적인 저장을 위해서는 DB를 필요로함

// req, res를 받았을때 서버의 동작을 정의
http.createServer(async (req, res) => {
  // req.method로 HTTP 요청 메소드를 구분중
  try {

    // GET 메소드를 받은 경우
    if (req.method === 'GET') {
      // GET으로 메소드를 받았을 때 MPA 방식으로 라우팅, [req.url]
      // Home으로 라우팅
      if (req.url === '/') {
        const data = await fs.readFile('./restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } 
      // about으로 라우팅
      else if (req.url === '/about') {
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } 
      // users로 라우팅(user에 대한 데이터를 json 형식으로) 
      else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    } 
    
    // POST 메소드를 받은 경우
    else if (req.method === 'POST') {
      // /user, req.url
      if (req.url === '/user') {
        let body = '';
        // 요청의 body(:JSON)를 stream 형식으로 받음, [req.on('data', callback)]
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body(:JSON)를 다 받은 후 실행됨, [req.on('end', callback)]
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          // id는 Date.now()로 지정
          const id = Date.now();
          users[id] = name; console.log(users);
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('ok');
        });
      }
    } 
    
    // PUT 메소드를 받은 경우
    else if (req.method === 'PUT') {
      // req.url 은 string, string.prototype.startsWith 로 특정 문자열로 시작하는지 확인
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          // 200 OK의 response
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        });
      }
    }
    
    // DELETE 메소드를 받은 경우
    else if (req.method === 'DELETE') {
      // req.url 은 string, string.prototype.startsWith 로 특정 문자열로 시작하는지 확인
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        // 200 OK의 response
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } 
  
  catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})


.listen(8082, () => {
  console.log('8082번 포트에서 서버 대기 중입니다');
});