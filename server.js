// 로컬 개발 서버 (의존성 없음). 배포는 Vercel이 api/*.js 를 서버리스 함수로 실행한다.
//   node server.js  ->  http://localhost:8080
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const ROUTES = {
  '/api/quote': require('./api/quote'),
  '/api/minute': require('./api/minute'),
};

http.createServer((req, res) => {
  const p = new URL(req.url, 'http://x').pathname;
  if (ROUTES[p]) return ROUTES[p](req, res);
  if (p === '/' || p === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }
  res.writeHead(404); res.end('not found');
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
