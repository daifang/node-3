var express = require('express');
var router = express.Router();

var data = {
  "users": [
      {
          "username": "zhangsan",
          "password": "123456"
      }
  ],
  "chapterList": [
      {
          "title": "三股冷空气接连来袭 北方多地雨雪降温",
          "views": 10
      },
      {
          "title": "多地企业工资指导线温和调整 你的工资涨了吗？",
          "views": 20
      },
      {
          "title": "填补空白！中国首款10兆瓦级海上风电机组通过认证？",
          "views": 30
      }
  ]
};
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type','text/html;charset=utf-8');
    var cookie = {};
    cookie = cookieToObj(req.headers.cookie);
    console.log('cookie:',cookie);
    if(cookie.loginStatus === 'true'){
      res.render('list',{ data : data });
    }else{
      res.send('用户名或密码错误');
    }
});

//解析cookie
function cookieToObj(cookie){
  let obj = {};
  if(cookie){
      cookie.split(';').map(item=>{
          item = item.trim();
          let arr = item.split('=');
          obj[arr[0]] = arr[1];
      });
  }
  return obj;
}
module.exports = router;
