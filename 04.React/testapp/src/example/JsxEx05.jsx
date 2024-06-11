import React, {Component} from 'react';

export default class HerComp extends Component {
    // state를 사용하지 않는 경우 constructor는 선택사항
    constructor(props){ // 생성자 : 객체가 생성될 때 호출되는 함수
        super(props); // props 등록
        console.log('HerComp constructor');
        this.state={ // state data 등록
            name: '이몽땅',
            isLoading: false,
        }
        // onClickHandler에 this를 바인딩
        // 클래스 컴포넌트에서 이벤트 처리 함수를 사용할 때는 반드시 this를 바인딩해야 함
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    // 이벤트 처리 함수
    onClickHandler = () => {
        // this.state.isLoading = true;[x] > 이렇게 하면 render()가 호출되지 않음
        console.log('onClickHandler');
        this.setState({isLoading: !this.state.isLoading});
        // state 값을 변경할 때는 반드시 setState() 함수를 이용해 변경해야 함
    }
    render(){
        // 여기서는 js 문법으로 작성할 수 있으므로, if문을 사용할 수 있음
        return (
            <div>
                {/* jsx안에서는 제어문(if, for, while)을 사용할 수 없다.
                표현식만 사용 가능
                1. 삼항연산자
                    변수 선언문 = (조건식)? 값1:값2;
                    조건식이 true면 값1, false면 값2
                */}
                {/* 삼항식은 표현식이므로 가능 */}
                {
                    this.state.isLoading ? 
                    <h3>{this.state.name}님 로그인 중...</h3>
                    :
                    <h3>로그인 하세요</h3>
                }
                
                {/* HTML일 경우
                 <button oiclick="onClickHandler()">Toggle</button>
                */}
                {/* JSX일 경우 : class component일 경우 this 필수 */}
                <button onClick={this.onClickHandler}>Toggle</button>
            </div>
        )
    }
}