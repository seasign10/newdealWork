import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Container, Alert, Image } from 'react-bootstrap'

export default function OpenWeather() {
  // 위도 경도
  const [location, setLocation] = useState({lat:null, lon:null})

  const [timezone, setTimezone] = useState('')
  const [temp, setTemp] = useState(0)
  const [desc, setDesc] = useState('')
  const [icon, setIcon] = useState('')
  const [iconUrl, setIconUrl] = useState('')

  const [error, setError] = useState('')
  const [isReady, setIsReady] = useState('')

  // useEffect안에서 async를 사용하려면 함수를 정의해서 사용해야 한다.
  // useEffect는 async를 지원하지 않는다.
  useEffect(()=>{
    const fetchLocation = async ()=>{
      await getCurrentLocation()
      if(location.lat && location.lon){
        await getWeather(location.lat, location.lon)
      }
    }
    fetchLocation()
  },[])

  // 현재 내가 있는 위치의 위도, 경도 가져오기
  const getCurrentLocation = ()=>{
    // navigator객체의 geolocation 속성을 이용해
    // 사용자의 현재위치정보를 가져오기
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition, showError)
    }else{
      setError('Geolocation is not supported by this browser.')
    }
  }

  // 현재 사용자 위치정보가 position 으로 들어온다
  const showPosition = (position)=>{
    // console.log(position);
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    })
    setError(null)
  }
  const showError = (error)=>{
    setError('Error: ' + error.message)
    // switch(error.code){
    //   case error.PERMISSION_DENIED:
    //     setError('User denied the request for Geolocation.')
    //     break
    //   case error.POSITION_UNAVAILABLE:
    //     setError('Location information is unavailable.')
    //     break
    //   case error.TIMEOUT:
    //     setError('The request to get user location timed out.')
    //     break
    //   case error.UNKNOWN_ERROR:
    //     setError('An unknown error occurred.')
    //     break
    // }
  }

  const getWeather = async(lat, lon)=>{
    const api_key = '';
    let url=`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${api_key}`
    axios.get(url)
    .then(res=>{
      // console.log(JSON.stringify(res))
      const {timezone} = res.data; 
      const {temp} = res.data.current; // 절대 온도(kelvin)
      const {description, icon} = res.data.current.weather[0];
      setIconUrl(`http://openweathermap.org/img/wn/${icon}@2x.png`)
      
      setTimezone(timezone);
      setTemp(Math.ceil(temp-273.15)); // 절대온도를 섭씨온도로 변환
      setDesc(description);
      setIcon(icon);
      setIsReady(true)
    })
    .catch(err=>{console.log(err)}
  )}

  const {lat, lon} = location;

  return (
    <Container className='py-5'>
      <h1>오늘 날씨</h1>
      <br />
      <h2>현재 나의 위치</h2>
      <Alert variant='primary'>
      <h3>Lattitude: {lat}</h3>
      <h3>Longtitude: {lon}</h3>
      </Alert>

      <Alert variant='dark'>
        <h3>Timezone: {timezone}</h3>
        <h3>Temparature: {temp}</h3>
        <h3>Description: {desc}</h3>
        <Image src={iconUrl} />
      </Alert>

      {error &&
      <Alert variant='danger'>
        <h4>Error: {error}</h4>
      </Alert>
      }

    </Container>
  )
}
