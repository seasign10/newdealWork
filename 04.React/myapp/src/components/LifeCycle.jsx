import React, { Component } from 'react'
// rcc : class component
// rfc : function component
// constructor() -> render() -> componentDidMount() 

export default class LifeCycle extends Component {

  state = {
    color: 'red'
  }
  constructor(props) {
    super(props);
    console.log('LifeCycle 생성자 호출 됨 : '+props);
  }
  componentDidMount() { // 컴포넌트가 화면에 나타날 때 호출
    console.log('LifeCycle componentDidMount 호출 됨');
  }
  componentDidUpdate() { // 컴포넌트의 상태가 변경될 때 호출 (예: 버튼 클릭, input 입력 등)
    console.log('LifeCycle componentDidUpdate 호출 됨');
    return true;
    // true를 반환하면 컴포넌트가 업데이트 된다.
    // false를 반환하면 컴포넌트가 업데이트 되지 않는다.
  }
  componentWillUnmount() { // 다른 컴포넌트로 이동할 때 호출
    // 시계와 같이 setInterval을 사용하여 계속 실행되는 경우 clear 해주는 작업을 한다.
    console.log('LifeCycle componentWillUnmount 호출 됨');
  }
  render() {
    console.log('LifeCycle render 호출 됨');
    return (
      <div className='py-5 text-center'>
        <h1
        style={{color:this.state.color}}
        onMouseOver={()=>{this.setState({color:'blue'})}}
        onMouseOut={()=>{this.setState({color:'red'})}}
        >React Component Life Cycle</h1>
      </div>
    )
  }
}
