import YourComp from "./example/JsxEx04";

const App=()=>{
    // user : 일반 데이터 (state가 아님)
    const user1={name:'John', email:'john@a.b.c', age:25};
  return (
    <div>
      <h2>App05</h2>
      <YourComp name="홍길동" email="hong@a.b.c" age="32"></YourComp>
      <YourComp name={user1.name} email={user1.email} age={user1.age}></YourComp>
      <YourComp {... user1} />
      <YourComp />
    </div>
  );
}
export default App;