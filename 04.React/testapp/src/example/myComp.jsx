import React, {Component} from 'react';

class MyComp extends Component { // 클래스형 컴포넌트 | extends : 상속
  render() { // render() : 화면에 표시할 내용을 반환하는 함수 | 클래스형 컴포넌트에서는 필수

    // this.props : 부모 컴포넌트에서 전달한 속성값을 가지고 있는 객체 | 부모가 내려준 속성을 받아서 사용
    // this.props.mycolor : 부모 컴포넌트에서 전달한 mycolor 속성값
    const {mycolor, bgcolor, myspace} = this.props;
    const mystyle = {
        color: mycolor,
        backgroundColor: bgcolor,
        padding: myspace
    };
    return (
      <div>
        <h1 style={{color: mystyle.color, backgroundColor: mystyle.backgroundColor, padding: mystyle.padding}}>Class Component : MyComp</h1>
      </div>
    );
  }
}
export default MyComp;