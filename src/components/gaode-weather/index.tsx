import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENV_LOCAL } from '@constants/config';
import { List, Popover, Spin } from 'antd';


interface Props {
  city: number;
  date: string;
}

interface IWeather {
  date: string;          // Format: "YYYY-MM-DD"
  week: string;          // Week number or day of the week
  dayweather: string;    // Weather condition during the day (e.g., "晴" for clear)
  nightweather: string;  // Weather condition during the night
  daytemp: string;       // Temperature during the day as a string (e.g., "34")
  nighttemp: string;     // Temperature during the night
  daywind: string;       // Wind direction during the day
  nightwind: string;     // Wind direction during the night
  daypower: string;      // Wind power during the day (e.g., "1-3")
  nightpower: string;    // Wind power during the night
  daytemp_float: string; // Temperature during the day as a float in string format (e.g., "37.0")
  nighttemp_float: string; // Temperature during the night as a float in string format
}

const WeatherDisplay = ({ city, date }: Props) => {
  const [weather, setWeather] = useState<IWeather[] | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://restapi.amap.com/v3/weather/weatherInfo`, {
          params: {
            city: city, // 城市编码
            key: ENV_LOCAL.NEXT_PUBLIC_GAODE_WEATHER_KEY , // 高德 API 密钥
            extensions: 'all' 
          }
        });

        
        let cast = (response.data?.forecasts?.[0]?.casts ?? []) as IWeather[];

        const customizedTempResponse = await axios.get('/static/temp.json')
        console.log(9,customizedTempResponse);
        
        if (customizedTempResponse?.data) {
          
          const customizedTemp = customizedTempResponse?.data?.list as IWeather[]
          console.log(77, customizedTemp);
          cast = cast.map(v => {
            const item = customizedTemp.find((i) => i.date ===v.date);
            if ( item) {
              return item
            }
            return v
          })
        }
        setWeather(cast);
      } catch (err) {
        setError(err);
      }
    };

    fetchWeather();
  }, [city]);

  if (error) {
    return <div>Error fetching weather data: {error.message}</div>;
  }

  if (!weather) {
    return <Spin  spinning={true}/>;
  }

  if (!date) {
    return null;
  }

  const index = weather.findIndex(v => v.date === date);
  if (index < 0 ) {
    return <span style={{color:'grey'}}>仅支持查看 15 天内天气</span>
  }
  const dw = weather[index].dayweather;
  const nw = weather[index].nightweather

  return  <span style={{color:'grey'}}>{weather[index].daytemp} - {weather[index].nighttemp} 度，{dw === nw ? dw : `${dw}转${nw}`} </span>
};


export default WeatherDisplay;
