// 타입추론(type inference)
// js와 호환성을 위해 타입 주석 생략 가능
// 생략 > ts 컴파일러가 할당된 값에 따라 변수의 타입을 지정
// 이를 타입추론이라고 한다.

let a = 100; // a: number 으로 추론
let b = 'hello'; // b: string 으로 추론
console.log(a, b);
// a = true // [x]
// 컴파일러가 초기값에 따라 타입 추론하므로
// 그 이후에 해당 변수는 해당 타입의 값만 할당 가능

let c = {name: '고길동', age: 40}; // c: object 으로 추론
console.log(c);
// c는 name, age 속성을 가진 object 타입이므로 다른 속성을 가진 object는 할당 불가능
// c = {color: 'pink', size: 55}; // [x] 
c = {name: '둘리', age: 100}; // [o]
console.log(c);

// any type : 타입 추론이 불가능한 경우, 어떤 종류의 값도 할당 가능
let d:any = 0;
d = 'hello';
d = true;
d = 22;
console.log(d);

// undefined type : 변수에 할당된 값이 없는 경우, ts에서는 값으로도 사용되고 타입으로도 사용된다.
let e:undefined = undefined;
console.log(e);
// e = 100; // [x] undefined 타입에는 undefined 값만 할당 가능

function foo(value:boolean):string|undefined{
    if(value){ // value가 true일 때
        return 'hello';
    } else { // value가 false일 때
        return undefined;
    }
}
console.log(foo(true));
console.log(foo(false));

// 함수에서 유효성 체크시에도 사용
const check=(value:string|undefined)=>{
    if(value===undefined){
        console.log('값을 입력해주세요');
    } else {
        console.log(`아이디가 ${value} 인 사용자`);
    }
}
check('id123');
let f;
check(f); // 값이 없는 변수를 전달하면 undefined 타입으로 인식

// 클래스 타입
// 객체의 타입을 정의할 때 사용
/* 
class 클래스명{
  // [?] : 속성이 선택적(optional)임을 나타냄
  [private|protected|public] 속성명[?]:타입[=초기값];
  생성자(){}
  메서드(){}
}

private|protected|public : 접근제어자(access modifier)
- private : 클래스 내부에서만 접근 가능
- protected : 클래스 내부 + 파생 클래스에서 접근 가능(상속관계시, 자식이 부모로부터 상속받은 속성 접근 가능)
- public : 클래스 외부에서도 접근 가능 (기본값)
*/

class Hero{
  public name:string='';  // 초기값을 할당하지 않으면 에러 발생
         height:number=0; // public은 생략 가능
         power?:number; // power는 선택적 속성
}
let h1:Hero = {name:'헐크', height:220, power:100};
console.log(h1);
// class 유형은 new 연산자를 사용하여 객체를 생성
let h2= new Hero(); // 초기값 할당
h2.name='아이언맨';
h2.height=180;
console.log(h2);

class APerson{
  public name:string="사람A"; // has a 관계 public은 어디서든 접근 가능
  private age:number=32 // private은 클래스 내부에서만 접근 가능
  protected weight:number=95; // 자식클래스(super class)에서 접근 가능

  public setAge(val:number):void{ // setter 메서드
    this.age=val;
  }
  public getAge():number{ // getter 메서드
    return this.age;
  }
}

let a1:APerson = new APerson();
console.log(a1);
a1.name='사람B'; // 접근 가능
// a1.age=30; // [x] 접근 불가
a1.setAge(30);
console.log(a1);

// age만 출력하고 싶을 때
// console.log(a1.age); // [x] private 접근 불가 (private)
console.log(a1.getAge()); // [o] public 메서드로 접근 가능

// a1.weight=70; // [x] protected 접근 불가 (protected)
class Deadpool extends APerson{
  color:string='';
  showInfo():void{
    console.log(`
      name: ${this.name}
      age: ${this.getAge()}
      weight: ${this.weight}
      color: ${this.color}
      `);
      // age는 private이므로 getAge() 메서드로 접근
  }
}

// a2 > Dethpool 타입으로 변수 선언 > 이름, 나이, 색상, 몸무게  값 할당 > showInfo() 메서드 호출
let a2:Deadpool = new Deadpool();
a2.name='데드풀';
a2.setAge(39); // a2.age=39; [x]
a2.color='blood red';
a2.showInfo();