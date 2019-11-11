var express = require('express');
var router = express.Router();
/* GET home page. */
var json = {
          username: "zhangsan",
          password: "123456"};
  
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});
router.post('/',function (req, res, next) {
  let data = req.body;
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    if(json.username === data.username && json.password === data.password){
        console.log('success!');
        res.setHeader('Set-cookie',[`loginStatus=true`]);
        res.redirect('/list');
    }else{
        console.log('failed!');
        res.setHeader('Set-cookie',[`loginStatus=false`]);
        res.end('用户名或密码错误');
    }
})
module.exports = router;


