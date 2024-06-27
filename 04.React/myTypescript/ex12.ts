// 대수 데이터 타입 (Algebraic Data Type)
// [1] 합집합 (Union type): A | B
// [2] 교집합 (Intersection type): A & B

// 1. 합집합 Union type
type numOrStr = number | string;
let n1:numOrStr = 5;
console.log(n1);
let n2:numOrStr = 'Hello';
console.log(n2);
// let n3:numOrStr = {}; // Error 

// 2. 교집합 Intersection type
type IName = {name:string};
type IAge = {age:number};
let person:IName&IAge = {name:'Julia', age:20};

const mergeObject = <T,U>(x:T, y:U):T&U=>{ // 타입이 다르기 떄문에 제네릭 사용
  return {...x, ...y};
}

let p1:IName = {name:'배트맨'};
let p2:IAge = {age:50};
let p3:IName&IAge = mergeObject(p1,p2);
console.log(p3);

// interface 조합
interface Printable {
  print():void;
}
interface Loggable {
  log():void;
}
// 2개의 인터페이스를 조합하여 PrinterLogger 타입 생성
type PrintLoggable = Printable & Loggable; 
// 타입선언시 사용

// 클래스 구성: ConsoleLogger
// 2가지 인터페이스를 상속받아 구현
class ConsoleLogger implements Printable, Loggable{
// class ConsoleLogger implements PrintLoggable{
  print():void{
    console.log('printing...');
  }
  log():void{
    console.log('logging...');
  }
}

let obj1:ConsoleLogger = new ConsoleLogger();
obj1.print();
obj1.log();

let obj2:Printable = new ConsoleLogger();
obj2.print();
// obj2.log(); // [x] 타입이 Printable이기 때문에 log() 사용 불가

let obj3:Loggable = new ConsoleLogger();
obj3.log();
// obj3.print(); // [x] 타입이 Loggable이기 때문에 print() 사용 불가

let obj4:PrintLoggable = new ConsoleLogger();
obj4.print();
obj4.log();

// 합집합 타입 구분
interface ISquere{ // 정사각형
  size:number;
}
interface IRectangle{ // 직사각형
  width:number;
  height:number;
}
interface ICircle{ // 원
  radius:number;  
}

type Shape = ISquere | IRectangle | ICircle;
// 인터페이스 타입의 객체 3개를 생성
let shape1:Shape = {size:10};
// let shape1:ISquere = {size:10};

let shape2:Shape = {width:10, height:20};
// let shape2:IRectangle = {width:10, height:20};

let shape3:Shape = {radius:10};
// let shape3:ICircle = {radius:10};

// getArea() 함수 정의
const getArea = (shape:Shape):number=>{
  if((shape as ISquere).size){ // as : 타입 단언으로 강제 형변환
    return (shape as ISquere).size ** 2;
  }else if((shape as IRectangle).width){
    return (shape as IRectangle).width * (shape as IRectangle).height;
  }else{
    return (shape as ICircle).radius ** 2 * Math.PI;
  }
}
// 해당 함수로는 면적을 구할 수 있지만, 타입스크립트의 강력한 타입 추론을 활용하지 못하며 번거롭다.
// 타입 가드를 사용하여 코드를 간결하게 작성할 수 있다.