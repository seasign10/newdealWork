let getNow = new Date();
let year = getNow.getFullYear();
let month = getNow.getMonth()+1;
let date = getNow.getDate();

const getData = async ()=>{
  const url = new URL(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=KWnKkw4c%2FCEAvAiJWCNfpPBpO9g0nW2u7KSwDkaM0wcG930KuF%2F9vy32a5Xc5fyPnP0sSOD2IVFZ0vZkrBcmmw%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0`)
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.response.body.items);
}

getData();