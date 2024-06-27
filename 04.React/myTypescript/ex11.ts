// Generic을 이용하여 타입을 파라미터화 해보자
// 제너릭은 어떤 타입이든 받아들일 수 있는 추상화된 타입을 생성,
// 컴파일러는 사용 시점에 해당 타입을 결정한다.
interface Value{
  val:number;
  valArr:string[];
}
let v1:Value = {val:10, valArr:['a', 'b', 'c']};

interface IValue<T>{
  val:T;
  valArr:T[];
}
let v2:IValue<number> = {
  val:100,
  valArr:[10, 20, 30]
};
console.log(v2);

// v3:IValue > 제너릭을 string타입으로 지정해서 값을 할당 후 출력
let v3:IValue<string> = {
  val:'hello',
  valArr:['world', 'typescript']
};
console.log(v3);

let v4:IValue<boolean> = {
  val:true,
  valArr: Array(3).fill(false)
}
console.log(v4);

// 함수 정의시 제너릭 사용
function printArray<T>(arr:T[]):void{
  arr.forEach((v:T)=>console.log(v)
  )
}

// printArray() 호출
printArray<number>([1, 2, 3]);
printArray<string>(['a', 'b', 'c']);

// type에서 제너릭 사용
type Person<T> = {
  no:T;
  name:string;
  tel:string;
}
// Person 타입의 객체 2개 생성
// printArray() 함수의 매개변수로 전달
const p1:Person<number> ={
  no:1,
  name:'hong',
  tel:'010-1234-5678'
}
const p2:Person<string> ={
  no:'2',
  name:'kim',
  tel:'010-1234-5678'
}
printArray<Person<number>>([p1]);
printArray<Person<string>>([p2]);

// 클래스에서 제너릭 사용
// IValue 인터페이스를 상속받는 myValue 클래스 구성
class MyValue<T> implements IValue<T>{ 
  // val:T;
  // valArr:T[];
  constructor(public val:T, public valArr:T[]){
    // 위처럼 생성자에 매개변수를 선언하면 아래를 생략할 수 있다.
    // this.val = v;
    // this.valArr = arr;
  }
}
// MyValue 타입의 변수 선언 > 객체 생성해서 속성값 할당
let mv1:MyValue<number> = new MyValue<number>(100, [10, 20, 30]);
let mv2:MyValue<string> = new MyValue<string>('hello', ['world', 'typescript']);
console.log(mv1);
console.log(mv2);

// printValue() 함수 구성한 뒤 mv1, mv2 매개변수로 전달
// function printValue<T>(){...}
const printValue = <T>(obj:IValue<T>):T=>{ // 리턴값을 T로 지정(반환)
// const printValue = <T>(obj:IValue<T>)=>{
  console.log(obj.val);
  console.log(obj.valArr);
  return obj.val;
};
printValue<number>(mv1);
printValue<string>(mv2);
let p = printValue<number>(mv1);
console.log(p*3); // 100* 3 = 300
