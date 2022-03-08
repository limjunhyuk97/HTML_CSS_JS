// 미리 만들어둔 http 파일 -> fs 모듈로 읽어서 전송
const http = require('http');
const fs = require('fs').promises;

http.createServer( async (res, req)=>{
  try {
    const data = await fs.readFile('./server2.html');
  }
  catch {

  }
})