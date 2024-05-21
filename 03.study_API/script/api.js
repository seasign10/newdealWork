let testArr = [];

// 1. 데이터를 가져오기 위한 함수를 만들어보자.
const getData = async ()=>{
  // 주소(url)
  // 공공데이터포털 json 링크
  // const url = `https://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=KWnKkw4c%2FCEAvAiJWCNfpPBpO9g0nW2u7KSwDkaM0wcG930KuF%2F9vy32a5Xc5fyPnP0sSOD2IVFZ0vZkrBcmmw%3D%3D&MobileOS=ETC&MobileApp=webTest&_type=json&contentId=1095732&imageYN=Y&subImageYN=Y&numOfRows=10&pageNo=1`
  // console.log(url);
  
  // 주소값을 보기편한 객체화 : new URL()
  // 주소의 물음표(?)를 먼저 찾으면 자료의 기준이됙 때문에 접근하기 쉽다.
  // 이후에는 앰퍼샌드(&)를 기준으로 값이 들어가있는 것을 확인할 수 있다.
  const url = new URL(`https://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=KWnKkw4c%2FCEAvAiJWCNfpPBpO9g0nW2u7KSwDkaM0wcG930KuF%2F9vy32a5Xc5fyPnP0sSOD2IVFZ0vZkrBcmmw%3D%3D&MobileOS=ETC&MobileApp=webTest&_type=json&contentId=1095732&imageYN=Y&subImageYN=Y&numOfRows=11&pageNo=1`)
  const infoUrl = new URL(`https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=KWnKkw4c%2FCEAvAiJWCNfpPBpO9g0nW2u7KSwDkaM0wcG930KuF%2F9vy32a5Xc5fyPnP0sSOD2IVFZ0vZkrBcmmw%3D%3D&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=webTest&_type=json&listYN=Y&arrange=A&eventStartDate=20170901`)
  // console.log(url);
  
  // 데이터를 가져올 때 더 쉽게 만들 수 있음.
  // fetch() : 자바스크립트에서 서버로 네트워크 요청을 간편하게 보내고 응답받기위한 도구
  // API 호출은 시간이 걸리는 타입. 그래서 우리는 코드가 다음줄로 안넘어가고 이 api 호출을 기다리게 해야한다.
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.response.body.items.item);
  const infoResponse = await fetch(infoUrl);
  const infoData = await infoResponse.json();
  console.log(infoData.response.body.items.item);
  // status: 200
  // statusText: "OK"
  // 이 두줄만 확인해도 제대로 값을 받고있는지 알 수 있다.

  // 샘플 데이터를 배열로 저장해보자.
  // 값을 골라오기 쉽게 만들수 있다. [{},{},{}...]
  testArr = data.response.body.items.item;
  infoArr = infoData.response.body.items.item;

  testUI(); // 호출
}

// 함수 호출
getData();

let contents = ``;
// 화면에 그리는 작업
// let testUI = ()=>{
//   console.log(testArr[0].imgname);
//   console.log(testArr[0].originimgurl);
//   console.log(testArr.length); // 데이터 11개
//   for(let i=0;i<testArr.length;i++){
//     contents += `
//     <dl>
//       <dt>${testArr[i].imgname}</dt>
//       <dd><a href=""><img src="${testArr[i].smallimageurl}" alt=""></a></dd>
//     </dl>
//     `
//   }
//   document.querySelector('.test').innerHTML = contents;
// }
let testUI = ()=>{
  for(let i=0;i<infoArr.length;i++){
    contents += `
    <dl>
      <dt>${infoArr[i].title}</dt>
      <dd><a href=""><img src="${infoArr[i].firstimage}" alt=""></a></dd>
      <dd>장소 : ${infoArr[i].addr1}</dd>
      <dd>문의 : ${infoArr[i].tel}</dd>
     </dl>
    `
  }
  document.querySelector('.test').innerHTML = contents;
}
