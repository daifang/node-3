const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//静态文件加载
app.use(express.static(__dirname+'/public'));
//路由
app.get('/login',(req,res)=>{
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.end(fs.readFileSync(__dirname+'/login.html'));
});
app.post('/login',(req,res,next)=>{
    let data = req.body;
    var json = readJsonSync(__dirname+'/public/data.json');
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    if(json.users[0].username === data.username && json.users[0].password === data.password){
        console.log('success!');
        res.setHeader('Set-cookie',[`loginStatus=true`]);
        res.redirect('/list');
    }else{
        console.log('failed!');
        res.setHeader('Set-cookie',[`loginStatus=false`]);
        res.end('用户名或密码错误');
    }
});
app.get('/list',(req,res)=>{
    //读取json文件
    res.setHeader('Content-Type','text/html;charset=utf-8');
    // console.log('json:',json);
    //进行对比
    var cookie = {};
    cookie = cookieToObj(req.headers.cookie);
    console.log('cookie:',cookie);
    if(cookie.loginStatus === 'true'){
        res.sendFile(__dirname + '/list.html');
    }else{
        res.send('用户名或密码错误');
    }
});





app.get('/listData',(req,res)=>{
    var json = readJsonSync(__dirname+'/public/data.json');
    res.send(json.chapterList);
});
app.listen(8000);
//读取json
readJsonSync = (path)=>{
    let data = fs.readFileSync(path,'utf8');
    return JSON.parse(data);
}
//解析cookie
function cookieToObj(cookie){
    let obj = {};
    if(cookie.split !== undefined){
        cookie.split(';').map(item=>{
            // console.log(item);
            item = item.trim();
            let arr = item.split('=');
            obj[arr[0]] = arr[1];
        });
    }
    return obj;
}