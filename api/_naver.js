// 네이버 금융 API 프록시 공용 함수
// 브라우저에서 직접 호출하면(Origin 헤더) 403이 나므로 서버에서 대신 가져온다.
// Vercel 서버리스 함수와 로컬 server.js 양쪽에서 같이 쓴다.
module.exports = function naverProxy(url) {
  return async (req, res) => {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      res.statusCode = r.status;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.end(await r.text());
    } catch (e) {
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: String(e) }));
    }
  };
};
