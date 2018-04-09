var mysql = require("mysql");
var express = require('express');
var app = express();

var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;

const crypto = require('crypto');
const secret = 'abcdefg';

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`)


app.set('view engine', 'ejs');
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
app.use (cors());

var connection = mysql.createConnection
(
    {
        host: "localhost",
        port: 3306,
        database: "fashion",
        user: "root",
        password: "",
    }
);
app.get('/', function(req, res)
{
    var sql =
    `SELECT * from userdata`;
     connection.query(sql, function(err,rows){
    
        res.json(rows);
      
    });
})
app.post('/register', function(req, res)
{
    const password = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex');
            
    connection.query("insert into userdata set ? ",
    {
        name : req.body.name,
        email : req.body.email,
        
    });
    connection.query("insert into userlogin set ? ",
    {
        username : req.body.username,
        password : req.body.password,
        
    });
    console.log(req.body);
})

//===================USER SEASON=================
app.get('/seasonuser', function(req, res)
{
   
        connection.query("select * from season",function(err,rows){
    
            res.json(rows);
        });
})

// //===============USER SUBCATEGORY ================
app.get('/subcategoryuser', function(req, res){
    
    connection.query('select * from subcategory', function(err,rows){
                data : rows,
                res.json(rows);
        })    
    })

// //================USER PRODUCT =====================
app.get('/product', function(req, res){
   
    connection.query("select * from product", function(err,rows){
                data : rows,
                res.json(rows);
        })  
    })

// //================PRODUCT DETAIL=====================
app.get('/productdetail', function(req, res){
    connection.query(`SELECT product, harga, deskripsi, color, size, stock FROM product
        LEFT JOIN product_color ON product.id = product_color.productid
        LEFT JOIN product_size ON product_color.id = product_size.colorid`, function(err,rows){
    data : rows,
    res.json(rows);
})  
})

app.listen(3002);