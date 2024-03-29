const path = require('path')
const express = require('express')
const hbs=require('hbs');
const request =require('request');
const geocode=require('./utils/geocode');
const forecast =require('./utils/forecast');
const location= require('./utils/location');
const ip = require('ip');

const app = express()
const port = process.env.PORT||3000
//defining paths for express to work with
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath =path.join(__dirname,'../templates/views');
const partialspath =path.join(__dirname,'../templates/partials');

//setting up viewengine
app.set('view engine', 'hbs')
//by  default app.get looks into a directory b=named viws to change the directory name use app.set('views','otherdirectoryname');
app.set('views',viewspath);

hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saksham Madaan'
    })
    console.log(req.socket.remoteAddress)
    console.log(req.ip);
    console.log(ip.address());
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Saksham Madaan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name : 'Saksham Madaan'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        res.send({
            error: 'Address is required!'
        })
    }
    else{
        location(ip.address(),(latitude,longitude)=>{
            // if(error){
            //    return res.send({error});
            // }
            forecast(latitude,longitude,(error,data)=>{
                if(error)
                return res.send({error});
                return res.send({
                    // location: "Temprature near you",
                    data:data,
                    address:req.query.address
                });
            })
        })
}
})

app.get('/help/*',(req,res)=>{
    res.render('404-message',{
        title : '404',
        name:'Saksham Madaan',
        error : 'Help article not found'
    });
})

app.get('*',(req,res)=>{
    res.render('404-message',{
        name : 'Saksham Madaan',
        title :'404',
        error : 'Page not found.'
    });
})
app.listen(port, () => {
    console.log('Server is up on port ' +port);
})