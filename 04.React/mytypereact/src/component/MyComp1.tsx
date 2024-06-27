// 클래스형
import { Component } from 'react';

type MyComp1Props = {
  text:string;
  href:string;
  target?:string;
}

export default class MyComp1 extends Component<MyComp1Props>{
  
  render(){
    const {text, href, target} = this.props;
    return(
      <li>
        <a href={href} target={target}><h2>{text}</h2></a>
      </li>
    )
  }
}