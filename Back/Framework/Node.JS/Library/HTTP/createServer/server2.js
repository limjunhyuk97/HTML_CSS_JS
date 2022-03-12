// 미리 만들어둔 html 파일 -> fs 모듈로 읽어서 전송
const http = require('http');
const fs = require('fs').promises;  // 파일을 읽어들이는 fs 모듈을 promise 형식으로 바꿔주는 방법으로 사용

http.createServer( async (req, res)=>{
  try {
    const data = await fs.readFile('./server2.html'); // 비동기적으로 data 가져옴
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  }
  catch(err) {
    console.error(err)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });  // 에러가 발생했다면 500 error 내보낸다.
    res.end(err.message);
  }
})
.listen(8081, ()=>{
  console.log("http://localhost:8081");
});