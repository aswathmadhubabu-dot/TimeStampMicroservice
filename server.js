var express = require('express');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/',function(request,response)
{
    response.render('index');
});

app.get('/:time', function(req, res, next) {
    var response = {};
    var months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    var t = req.params.time;

    if (!isNaN(t))
      {
      	 var date = new Date(t * 1000);
      } 
    var time = (isNaN(t)) ? t : months[date.getMonth()] + ' ' + String(date.getDate()) + ', ' + String(date.getFullYear());

    if (new Date(time) == "Invalid Date") {
        response.unix = null;
        response.natural = null;
        console.log("INvalid");
    } else {
        response.unix = Date.parse(time) / 1000;
        response.natural = time;
    }
    res.json(response);
});


app.listen(port,function (err) {
    console.log('server running at PORT : ' + port);

});

