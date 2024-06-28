// ChangeEvent : input, select, textarea 등의 값이 변경될 때 발생하는 이벤트 객체
// SyntheticEvent : 이벤트 객체를 대체하는 객체로서 이벤트 객체의 타입을 정의할 때 사용
import React,{ChangeEvent, useState, SyntheticEvent} from 'react'
import FileInput from './FileInput';

// IEventCompProps : props의 타입을 정의
export interface IEventCompProps {}
// IEventCompState : state의 타입을 정의
export interface IEventCompState {
  userid:string;
  passwd:string;
  chk:boolean;
  isAgree:boolean;
  agree:string;
  // File : 파일 객체를 의미
  attach:File[]|null; // file 객체는 배열로 받아야 한다.
}

export default function EventComp(props:IEventCompProps) {
  // state 정의에 대해 엄격하기 때문에 초기값을 정의해야 한다.
  let initValue = {userid:'', passwd:'', chk:true, isAgree: false, agree:'', attach:null}
  const [form, setForm] = useState<IEventCompState>(initValue) // ({})로 하면 타입을 추론할 수 없기 때문에 위 처럼 타입을 정의

  const onChangeValue = (e:ChangeEvent<HTMLInputElement>)=>{ // <HTMLInputElement> : e.target의 타입을 정의
    setForm({... form, [e.target.name]:e.target.value})
  }

  const onChangeChecked = (e:ChangeEvent<HTMLInputElement>)=>{
    // checkbox일 경우
    if(e.target.name === 'chk'){
      setForm({...form, chk:e.target.checked})
    }else{
      // radio일 경우
      setForm({...form, isAgree:e.target.checked, agree:e.target.value})
    }
  }

  const onChangeFile = (e:ChangeEvent<HTMLInputElement>)=>{
    // text: e.target.value
    // checkbox: e.target.checked
    // file: e.target.files
    const files:FileList|null = e.target.files;
    if(files){
      for(let i=0;i<files.length;i++){
        const file:File|null = files.item(i);
        console.log(file);
      }
    }
    setForm({...form, [e.target.name]:e.target.files})
  }
  
  const onButtonClick = (e:SyntheticEvent):void=>{
    alert(form.userid?`안녕하세요. ${form.userid}님`:'아이디를 입력하세요.')
  }

  return (
    <div style={{padding: '0 3rem'}}>
      <h2>다양한 이벤트 처리</h2>
      <div style={{background:'pink', color:'gray', fontSize:'1.5em', marginBottom: '1rem', padding: '1rem'}}>
        ID: {form.userid}<br />
        PW:  {form.passwd}<br />
        CHK: {form.chk?'아이디 저장':'아이디 저장 안함'}<br />
        IsAgree: {form.isAgree?'약관 동의':'약관 동의 안함'}<br />
        Agree: {form.agree}<br />
        Files: {form.attach&&form.attach.length>0? form.attach[0].name :'파일 없음'}
      </div>
      <input type="text" name="userid" onChange={onChangeValue} />
      <br />
      <input type="password" name="passwd" onChange={onChangeValue} />
      <br />
      <label htmlFor="chk">
        {/* react에서는 checked를 사용하지 않고 defaultChecked 사용 */}
        <input type="checkbox" name='chk' id='chk' 
        defaultChecked={form.chk}
        onChange={onChangeChecked}
        />
        아이디 저장
      </label>
      <br />
      <label htmlFor="agree">
        <input type="radio" name='agree' id='agree' 
        value='동의함' 
        checked={form.agree==='동의함'}
        defaultChecked={form.isAgree}
        onChange={onChangeChecked}
        />
        이용 약관에 동의하십니까?
      </label>
      <br /><br />
      {/* multiple 속성을 주면 여러 개 파일 첨부 가능 */}
      {/* <input type="file" name='attach' accept='images/*' 
      multiple
      onChange={onChangeFile}
       /> */}
      <FileInput onChangeFile={onChangeFile} />
      <br /><br />
      <button onClick={onButtonClick}>전송 버튼</button>
    </div>
  )
}
