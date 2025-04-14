import React, { useState, useEffect } from 'react';

const App = () => {
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('India'); 

const fetchWeather = (city) => {
  const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=cc00c5bf888e488299d193336252701&q=${city}&days=7&aqi=yes&alerts=no`;
      fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error in fetched data: ', error);
        setLoading(false);
      });
    }
    useEffect(() =>{
      fetchWeather(location);
    }, [location]); 
    const handleSearch = (e) =>{
      if(e.key === 'Enter'){
        fetchWeather(location);
        
      }
    }
  
  return (
    <div className="bg-[#dce0d9] min-h-screen flex items-center justify-center">
      <div className="bg-[#fbf5f3] h-[640px] w-[900px] rounded-[35px] flex">
        <div className="left w-[30%] h-full bg-white rounded-l-[35px]">
          <input 
            type="text"
            placeholder='&#x1F50D; Search for places...' 
            className='p-4 bg-[#F8F9FA] text-[13px] mt-8 ml-9 h-8 w-50 placeholder:font-bold placeholder:text-black rounded-[40px]'
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown = {handleSearch}
          />
          <div>
            {
              Data && (
            <img 
              src={`https:${Data.current.condition.icon}`}
              alt="Weather icon" 
              className='h-42 mt-3 ml-10'
            />)
            }
          </div>
          <div>
            {Data ? (
              <div className="ml-14 mt-4">
                <p className='text-5xl'>{Data.current.temp_c}°C</p>
                <p className='text-[20] mt-5'>
                  {new Date(Data.location.localtime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    timeZone: Data.location.tz_id
                  })}
                  <span className="ml-2 text-xl text-gray-600 text-[17px]">
                    {new Date(Data.location.localtime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </p>
              </div>
            ) : null}
          </div>
          <div className='ml-18 mt-13 flex items-center'>
            <img src="//cdn.weatherapi.com/weather/64x64/night/116.png"
             alt="Cloud icon "
             className='h-6 mr-2 text-gray-700'/>
          {Data ? Data.current.condition.text : null}
          </div>
          <div>
          {Data && Data.forecast && Data.forecast.forecastday[0].day.daily_chance_of_rain ? (
              <span className='mt-3 ml-18 flex items-center'>
                <img src="//cdn.weatherapi.com/weather/64x64/day/176.png"
                 alt="Rain icon"
                 className='h-6 mr-2 text-gray-700 text-sm' />
                 Rain - {Data.forecast.forecastday[0].day.daily_chance_of_rain}%
              </span>
          ) : (
            <span className='mt-3 ml-18 flex items-center text-sm'>
                🌧️ Rain - 0%
              </span>
          ) }
          </div>
        </div>
        <div className="right w-[70%] h-full bg-[#f0f2f5] rounded-r-[35px] flex flex-col p-6">
          <div className="right_top">
           <div className="flex items-center gap-4">
             <p className="font-bold mt-2 ml-6">Today</p>
             <p className="font-bold mt-2">Week</p>
           </div>
              <div className="main_box flex gap-2 ml-5 mt-10">
                {Data && Data.forecast && Data.forecast.forecastday ? (
                  Data.forecast.forecastday.map((day, index) => (
                    <div 
                      key={index} 
                      className="h-24 w-20 bg-white rounded-2xl flex flex-col items-center justify-center text-sm p-2">
                      <p>{new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}</p>
                      <img src={`https:${day.day.condition.icon}`} alt="" className="h-8 w-8 my-1" />
                      <p className='text-[13px]'>{day.day.avgtemp_c}°c</p>
                    </div>
                  ))
                ) : null}
              </div>
          </div>
          <div className="right_bottom">
            <div className="title mt-10 font-bold ml-6">Today's Highlights</div>
            <div className='flex gap-10'>
                <div>
                  <div className="box1 text-gray-500 mt-10 h-35 w-50 bg-white ml-15 rounded-2xl p-3"> UV Index</div>
                </div>
                <div>
                  <div className="box1 text-gray-500 mt-10 h-35 w-50 bg-white ml-8 rounded-2xl p-3"> UV Index</div>
                </div>
            </div>
            <div className='flex gap-10'>
                <div>
                  <div className="box1 text-gray-500 mt-8 h-35 w-50 bg-white ml-15 rounded-2xl p-3"> UV Index</div>
                </div>
                <div>
                  <div className="box1 text-gray-500 mt-8 h-35 w-50 bg-white ml-8 rounded-2xl p-3"> UV Index</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;   