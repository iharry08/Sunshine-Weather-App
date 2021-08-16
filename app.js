
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
 
app.use( bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home");
});

app.post("/",function(req,res){
    const cityname = req.body.cityName ;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=20bfd35ac5ff82780167e76421e14105&units=imperial&q="+ cityname;
    https.get(url,function(response){
    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = ((5/9)*(weatherData.main.temp-32)).toFixed(2);
        const s = (weatherData.weather[0].description);
        const weatherInfo= s[0].toUpperCase() + s.slice(1);
        const icon = weatherData.weather[0].icon;
        const iconurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
       
        res.render("city",{temperature:temp,icon :iconurl,climate:weatherInfo});

    });
    
 })
});

app.listen(3000,function(){
    console.log("Server is running");
});