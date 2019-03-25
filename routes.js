const express = require("express");
var request = require("request");
const router = express.Router();

const WEATHER_KEY = "cb2f3668dfb9de119de8ab3556e03e3d";
const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=${WEATHER_KEY}&q=`;


router.get("/",(req, res)=>{
    res.send("Welcome to Invisible technologies weather app");
});

router.post("", (req,res)=>{
    let locArray = req.body;
    let reqResponse = [];
    
    reqWeatherArray(locArray).then(resData => {
        reqResponse = resData;
        return res.status(200).send(reqResponse)
    });
});

async function reqWeatherArray(locArray){
    let resResponse = [];
    for (let i = 0; i < locArray.length; i++) {
        const URL = WEATHER_API + locArray[i].name;
        console.log(URL);
        const requestBody = {
            method: 'get',
            url: URL,
            json: true,
            headers: 
            {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }
        try {

        let locWeather = await requestPromiseWeather(requestBody);
        resResponse.push(locWeather.main);
        
            
        } catch (error) {
            console.error(error);
            resResponse.push(error);
        }
    }
    return resResponse;

}

function requestPromiseWeather(requestBody){
   
    return new Promise((resolve, reject) => { 
            request(requestBody, function(err, response, body){
            if(err){
                console.log('Error occurred:', err);
                return reject({});
            }

            if (response.statusCode != 200) {
                reject(body);
            }
            let apiResponse = body;
            if(!apiResponse){
                console.log("Response body is empty");
                return reject({});
            }
            return resolve(apiResponse);
        });
    });
}


module.exports = router;