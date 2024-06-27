// class 구성시 생성자를 구성할 수 있다.
// 생성자는 객체를 생성할 때 호출되는 일종의 메서드
// constructor(매개변수1, 매개변수2, ...){this.변수1=매개변수1;...} 형태로 구성
class Student{
  no: number=1;
  name: string='아무개';
  class: string='Front-end';
}
let s1:Student = new Student();
console.log(s1);

class Teacher{
  no: number;
  name: string;
  subject: string;
  // no: number=1;
  // name: string='김이최';
  // subject: string='React';

  constructor(no:number, name:string, subject:string){
    this.no = no; // this.no : 클래스 속성, no : 생성자 매개변수
    this.name = name;
    this.subject = subject;
  }
}
let t1:Teacher = new Teacher(2, '일타강사', 'Vue');
console.log(t1);

class Staff{
  // constructor에서 public, private, protected을 선언하지 않으면 클래스 속성으로 인식되지 않는다.
  // 아래의 코드를 생략할 수 있다.
  // name:string;
  // part:string;
  constructor(public name:string, public part:string){
  }
}
// 아래 코드와 동일
// class Staff{
//   public name:string;
//   public part:string;
// }

let sf1:Staff = new Staff('김이삭', '총무');
console.log(sf1.name, sf1.part);

// interface : IPerson
// 속성 : name, age?, height
interface IPerson{
  name:string;
  age?:number;
  height:number;
}
// class : CPerson
// 클래스가 인터페이스를 상속받을 때는 implements 사용
// CPerson 에서 IPerson을 상속받고 생성자를 구성
// 매개변수는 모두 public으로 선언
class CPerson implements IPerson{
  // 필수 속성만 구성해도 되고, 선택 속성도 구성해도 된다.
  constructor(public name:string, public height:number){}

  // CPerson에서 ShowInfo()함수를 구성하고 그 안에서 이름, 나이, 키 출력
  public showInfo():string{ // void 대신 string으로 변경 : 문자열 반환(return)
    let str:string = `
    이름: ${this.name}님
    신장: ${this.height}cm
    `;
    return str;
  }
}
// CPerson 타입 객체 생성 > showInfo() 호출
// let per1:CPerson = new CPerson(); // [x] 매개변수가 없어서 오류
let per1:CPerson = new CPerson('기쁨이', 5);
console.log(per1.showInfo());


// 추상 클래스 : abstract class
// abstract 키워드를 사용하여 추상 클래스를 선언
// 추상클래스 목적 : 상속받는 자식클래스에서 추상클래스의 속성이나 메서드를 강제로 구현하도록 함
/*
  abstract class 추상클래스명{
    abstract 속성명:속성타입;
    abstract 함수명:함수타입;
  }
  추상 클래스는 new 연산자를 사용하여 객체를 생성할 수 없다.
*/
abstract class Animal{
  abstract name:string;
  abstract crySound():string;
  constructor(public age?:number){} // constructor : 생성자
  // 생성자 : 객체 생성시 호출되는 메서드
}
// let ani1:Animal = new Animal(); // [x] 추상클래스는 객체 생성 불가
// [o] 추상클래스를 상속받아 구현
class Dog extends Animal{ // 추상 클래스 > 클래스 상속 : extends
  // name:string='강아지'; // [o] 추상클래스의 속성을 구현
  // constructor(public name:string){} // [x] 추상클래스의 속성을 구현하지 않아서 오류
  constructor(public name:string){ // [o] 추상클래스의 속성을 구현
    // super()
    // 부모클래스의 기본 생성자
    // 부모클래스 생성자 호출
    super();
  } 
  crySound():string{
    return '멍멍';
  }
}
let d1:Dog = new Dog('바둑이');
console.log(d1.name, d1.crySound());

// 1. Cat클래스를 만들되 Animal을 상속받아 구현
// 2. constructor에서 name, age를 매개변수로 받기
// 3. crySound()함수를 구현
class Cat extends Animal{
  constructor(public name:string, public age:number){
    super(age); // age는 부모클래스의 생성자로 전달
  }
  crySound():string{
    return '야옹';
  }
}
let c1:Cat = new Cat('나비', 3);
console.log(c1, c1.crySound());