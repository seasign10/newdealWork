var myname = "김철수";
// myname = 1234; // error
console.log('myname:', myname);
// (변수: 타입) : 반환값의 타입
// (var:type) : return type
function sayHello(name) {
    return "Hello, ".concat(name);
}
var str = sayHello('이영희');
console.log(str);
