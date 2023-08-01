const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;


const searchBtn=document.querySelector(".search button");
searchBtn.addEventListener("click",getWeather);

const city=document.querySelector(".inpCity").addEventListener("keyup",
    (event)=>{
        if(event.key=="Enter"){
            // console.log(event.key);
            getWeather();
        }
        // console.log(event);
    }
)


async function getWeather(){
    const city=document.querySelector(".inpCity").value;

    if(city.trim()==""){
        // console.log("inside if")
        document.querySelector(".warning-box p").innerHTML=`input field <span>city name</span> cannot be empty`;
        document.querySelector(".warning-box").style.display="block";
        document.querySelector(".weather").innerHTML=``;
        return;
    }

    document.querySelector(".warning-box").style.display="none";

    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    // console.log(API)

    const response=await fetch(API);
    // console.log(response);
    if(!response.ok){
        document.querySelector(".weather").innerHTML=`
        
            <h2 style="margin:2rem 0; font-size:3rem">City Not Found</h2>
        `;
        return;
    }
    const data=await response.json();
    // console.log(data);
    displayWeather(data);

}

function displayWeather(data){
    // const cityName=data.name;
    const cityName=data.name;
    const windSpeed=data.wind.speed;
    const humidity =data.main.humidity;
    const temp=Math.floor(data.main.temp);

    const weather=document.querySelector(".weather");
    weather.innerHTML=`
    
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">
        <h1 class="temp">${temp}°c</h1>
        <h2 class="city">${cityName}</h2>
        <div class="details">
            <div class="col">
                <img src="images/humidity.png" alt="">
                <div>
                    <p class="humidity">${humidity}%</p>
                    <p>Humidity</p>
                </div>
            </div>

            <div class="col">
                <img src="images/wind.png" alt="">
                <div>
                    <p class="wind">${windSpeed}km/hr</p>
                    <p>Wind Speed</p>
                </div>
            </div>
        </div>
    `
}

