const request=require('request');
const { exec } = require("child_process");
const { address } = require("ip");
const ip = require('ip');
const { stdout, stderr } = require("process");
let lat,long;
add=ip.address();
console.log(add);
// exec(`curl ipinfo.io/${add}/loc?token=60cf90aa1b9fbe`,(err,stdout,stderr)=>{
//     if(err) {console.log(err);return;}
//     if(stderr) {console.log("stderr\n"+stderr);return;}
//     if(stdout){
//         console.log(stdout);
//         var loc=stdout.split(",");
//         lat=loc[0];
//         long=loc[1];
//         console.log(lat);
//         console.log(long);
//     }
// })

loc='http://ipinfo.io/${add}/loc?token=60cf90aa1b9fbe'
request({loc,json:true},(error,{body}={})=>{
    if(error)
    {
        console.log('No connection');
    }
    else if(body.error)
    {
        console.log('Input provided is not complete');
    }
    else
    {
        console.log(body);
        // const x=body.current.temperature;
        // const y=body.current.feelslike;
        // const z=body.current.humidity;
        // const a=body.current.weather_descriptions[0];
        // console.log(a+'. Actual temperature is '+x+'F but it feels like '+y + 'F . ' +'Humidity is '+ z+' %.');
    }
})


const url ='http://api.weatherstack.com/current?access_key=3b11df54970d74f1eb58ccf5e763bdd2&query=${lat},${long}&units=f'
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            console.log('No connection');
        }
        else if(body.error)
        {
            console.log('Input provided is not complete');
        }
        else
        {
            const x=body.current.temperature;
            const y=body.current.feelslike;
            const z=body.current.humidity;
            const a=body.current.weather_descriptions[0];
            console.log(a+'. Actual temperature is '+x+'F but it feels like '+y + 'F . ' +'Humidity is '+ z+' %.');
        }
    })