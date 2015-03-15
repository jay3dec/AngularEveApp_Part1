var express = require('express'),
        app = express(),
        path = require('path'),
        request = require('request');

app.use(express.static(__dirname + '/public'));

bodyParser = require('body-parser')

app.set('views', path.join(__dirname + '/public/signup'));
app.set('view engine', 'ejs');

app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.urlencoded({
        extended: true
}));
 
app.get('/',function(req,res){
        res.sendFile('index.html',{'root': __dirname + '/public/index'});
});

app.get('/signIn', function(req, res) {
        res.sendFile('signin.html', {
                    'root': __dirname + '/public/signin'
                });
});

app.get('/signUp',function(req,res){
        res.render('signup',{error:''})
});

app.post('/register', function(req, resp) {
       var _firstName = req.body.inputFirstName;
       var _lastName = req.body.inputLastName;
       var _username = req.body.inputUsername;
       var _password = req.body.inputPassword;
       var _phone = req.body.inputPhone;

       var options = {
               url: 'http://127.0.0.1:5000/user/',
        method: 'POST',
        auth: {
                    user: 'admin',
            password: 'password'
        },
        formData: {
                    firstname: _firstName,
            lastname: _lastName,
            username: _username,
            password: _password,
            phone: _phone
        }
       }

       request(options, function(err, res, body) {
               if (err) {
                           return resp.render('signup', {
                                           error: err
                                       })
                               }
                   var result = JSON.parse(body)
               if (result._status == 'ERR') {
                           if (result._error.code == '400') {
                                           return resp.render('signup', {
                                                               error: 'Username Already Exists!'
                                                           })
                                                   }
                                   return resp.render('signup', {
                                                   error: result._issues.username
                                               })
                                       } else {
                                                   console.log('All good');
                                                           resp.redirect('http://localhost:3000/#/signin');
                                                               }
       })
});
 
app.listen(3000)
