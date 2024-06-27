import { IShape, ISquere, IRectangle, ICircle } from "./ex12_1";

// switch(): 타입가드를 사용하여 타입을 구분하는 함수  
// case'변수명': return (shape as 변수명).속성명; 
export const getArea = (shape:IShape):number=>{
  switch(shape.tag){
    case 'squere':
      return shape.size ** 2; // **: 제곱
    case 'rectangle':
      return shape.width * shape.height;
    case 'circle':
      return shape.radius ** 2 * Math.PI;
    default: return 0; // 타입이 맞지 않거나, 값이 없을 경우 0을 반환
  }
}

let squere:ISquere = {tag:'squere', size:12};
let rectangle:IRectangle = {tag:'rectangle', width:30, height:20};
let circle:ICircle = {tag:'circle', radius:10};
console.log(getArea(squere));
console.log(getArea(rectangle));
console.log(getArea(circle).toFixed(2));

