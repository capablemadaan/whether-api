const { exec } = require("child_process");
const { address } = require("ip");
const ip = require('ip');
const { stdout, stderr } = require("process");

let lat;
let long;
// add="103.147.136.255";
const location=(add,callback)=>{exec(`curl ipinfo.io/${add}/loc?token=60cf90aa1b9fbe`,(err,stdout,stderr)=>{
    if(err) {console.log("error :       ",err);return;}
    // if(stderr) {console.log("stderr :   ",stderr);return;}
    if(stdout){
        console.log("stdout: ",stdout);
        var loc=stdout.split(",");
        lat=parseFloat(loc[0]);
        long=parseFloat(loc[1]);
        console.log(typeof lat);
        console.log(typeof long);
        callback(lat,long);
    }});
}
module.exports=location