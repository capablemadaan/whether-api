const request=require('request');
const { exec } = require("child_process");
const { address } = require("ip");
const ip = require('ip');
const { stdout, stderr } = require("process");
const geocode=require('./geocode');
const location=require('./location');

// add=ip.address();
// console.log(add);
// const { exec } = require("child_process");
// const { address } = require("ip");
// const ip = require('ip');
// const { stdout, stderr } = require("process");


const forecast= (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=522e583ce0e47a10dfb8286b5dc66888&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f';
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            console.log(error);
            callback('No connection',undefined);
        }
        else if(body.error)
        {
            console.log(body.error);
            callback('Input provided is not complete',undefined);
        }
        else
        {
            const x=body.current.temperature;
            const y=body.current.feelslike;
            const z=body.current.humidity;
            const a=body.current.weather_descriptions[0];
            console.log(a+'. Actual temperature is '+x+'F but it feels like '+y + 'F . ' +'Humidity is '+ z+' %.')
            callback(undefined,a+'. Actual temperature is '+x+'F but it feels like '+y + 'F . ' +'Humidity is '+ z+' %.');
        }
    })
   
}
// location('103.147.136.255',(lat,long)=>{
//     forecast(lat,long);
// });

module.exports=forecast;