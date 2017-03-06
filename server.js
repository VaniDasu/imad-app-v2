var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user:'vanidasu',
    database:'vanidasu',
    host:'db.imad.hasura-app.io',
    port: 8080,
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
     'article-one':{
        title:'Article One| Vani Dasu',
        heading: 'Article One',
        date: 'March 2, 2017',
        content: `
                    <p>
                        This is the content of article one. This is the content of article one. This is the content of article one. This is the content of article one.
                    </p>
                     <p>
                         paragraph two
                        This is the content of article one.
                    </p>
                     <p>
                         paragraph teen
                        This is the content of article one.
                    </p>`
    },
     'article-two': {
          title:'Article Two| Vani Dasu',
        heading: 'Article Two',
        date: 'Feb 2, 2017',
        content: `
                    <p>
                        This is the content of article two. This is the content of article two. This is the content of article two. This is the content of article two.
                    </p>
                     <p>
                         paragraph two
                        This is the content of article two.
                    </p>
                     <p>
                         paragraph teen
                        This is the content of article two.
                    </p>`
     },
     'article-three':{
            title:'Article Three| Vani Dasu',
            heading: 'Article Three',
            date: 'Feb 3, 2017',
            content: `
                        <p>
                            This is the content of article three. This is the content of article three. This is the content of article three. This is the content of article three.
                        </p>
                         <p>
                             paragraph two
                            This is the content of article three.
                        </p>
                         <p>
                             paragraph teen
                            This is the content of article tbree.
                        </p>`
     }
    
}
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
        var htmlTemplate= `<html>
            <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        
            </head>
            <body>
                  <div class="container">
                        <div>
                            <a href="/">Home</a>
                        </div>
                        <hr/>
                        <h2> ${heading}</h2>
                        <div>
                           ${date}
                        </div>
                        
                            <div>
                            ${content}
                            </div> 
                 </div>
            </body>
        </html>
        `;

    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
   //make a select req
   //return a response with the results
   pool.query('SELECT * FROM test', function(err, result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result));
       }
       
   });
});

app.get('/:articleName', function (req, res) {
    //articleName=article-One 
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
