const request =require('request');

const geocode=(address,callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWtzaGF0MzYiLCJhIjoiY2tqenlubjZkMGNkbTJvazI5am85NmpudSJ9.StLcx3k1YgxWqnsuJOVeWw&limit=1';
 request({url,json:true},(error,{body}={})=>{
     if(error){
         callback('No connection',undefined);
     } 
     else if(body.features.length===0){
         callback('Input Provided is not complete!',undefined);
     }
     else{
         callback(undefined,{
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
         })

     }
})
}
geocode("hisar",(error,data)=>{
    console.log(error);
})
module.exports=geocode