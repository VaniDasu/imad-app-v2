var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/:articleName', function (req, res) {
    //articleName=articel-Onear 
    var articleName=req.param.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
