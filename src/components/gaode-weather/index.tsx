import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENV_LOCAL } from '@constants/config';
import { List, Popover, Spin } from 'antd';
import { FormInstance } from 'antd/lib';
import { EPlan } from '@dtos/db';


interface Props {
  city: number;
  date: string;
}
const WeatherDisplay = ({ city, date }: Props) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

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

        
        let cast =response.data?.forecasts?.[0]?.casts || [];
        cast = cast.concat([
            {
              "date": "2024-09-08",
              "week": "3",
              "dayweather": "晴", // 白天天气
              "nightweather": "晴", // 晚上天气
              "daytemp": "34", // 白天温度
              "nighttemp": "27", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-09",
              "week": "3",
              "dayweather": "晴", // 白天天气
              "nightweather": "晴", // 晚上天气
              "daytemp": "37", // 白天温度
              "nighttemp": "28", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-10",
              "week": "3",
              "dayweather": "晴", // 白天天气
              "nightweather": "晴", // 晚上天气
              "daytemp": "35", // 白天温度
              "nighttemp": "24", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-11",
              "week": "3",
              "dayweather": "多云", // 白天天气
              "nightweather": "多云 ", // 晚上天气
              "daytemp": "37", // 白天温度
              "nighttemp": "30", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-12",
              "week": "3",
              "dayweather": "小雨", // 白天天气
              "nightweather": "小雨", // 晚上天气
              "daytemp": "34", // 白天温度
              "nighttemp": "25", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-13",
              "week": "3",
              "dayweather": "小雨", // 白天天气
              "nightweather": "小雨", // 晚上天气
              "daytemp": "31", // 白天温度
              "nighttemp": "20", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-14",
              "week": "3",
              "dayweather": "小雨", // 白天天气
              "nightweather": "小雨", // 晚上天气
              "daytemp": "33", // 白天温度
              "nighttemp": "19", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-15",
              "week": "3",
              "dayweather": "晴", // 白天天气
              "nightweather": "晴", // 晚上天气
              "daytemp": "35", // 白天温度
              "nighttemp": "21", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-16",
              "week": "3",
              "dayweather": "晴", // 白天天气
              "nightweather": "晴", // 晚上天气
              "daytemp": "36", // 白天温度
              "nighttemp": "24", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },{
              "date": "2024-09-17",
              "week": "3",
              "dayweather": "阴", // 白天天气
              "nightweather": "阴", // 晚上天气
              "daytemp": "35", // 白天温度
              "nighttemp": "26", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
            {
              "date": "2024-09-18",
              "week": "3",
              "dayweather": "小雨", // 白天天气
              "nightweather": "小雨", // 晚上天气
              "daytemp": "36", // 白天温度
              "nighttemp": "24", //  晚上温度
              "daywind": "北",
              "nightwind": "北",
              "daypower": "1-3",
              "nightpower": "1-3",
              "daytemp_float": "37.0",
              "nighttemp_float": "27.0"
            },
          ])

        const customizedTempResponse = await axios.get('/static/temp.json')
        console.log(9,customizedTempResponse);
        
        if (customizedTempResponse?.data) {
          
          const customizedTemp = customizedTempResponse?.data?.list
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

  return  <span style={{color:'grey'}}>早：{weather[index].dayweather}  {weather[index].daytemp}°C  ~  晚：{weather[index].nightweather} {weather[index].nighttemp}°C </span>

    // return (
    //   <Popover content= { <List
    //    style={{width:400}}
    //     itemLayout="horizontal"
    //     dataSource={weather}
    //     renderItem={(item, index) => (
    //       <List.Item>
    //         <List.Item.Meta
    //           avatar={item.date}
    //           title={<><span>{item.dayweather} - {item.nightweather} </span>,<span> {item.daytemp}°C - {item.nighttemp}°C</span></>}
    //           />
    //       </List.Item>
    //     )}
    //   /> }>
    //     <span style={{color:'grey'}}> {weather[0].date},  {weather[0].dayweather} - {weather[0].nightweather} ,  {weather[0].daytemp}°C - {weather[0].nighttemp}°C </span>
    //   </Popover>
    // );
};


export default WeatherDisplay;
