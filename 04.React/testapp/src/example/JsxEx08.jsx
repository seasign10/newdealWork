import {useState} from 'react';

const Join = ()=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);

    const onChangeName = (e)=>{
        let stateName = '';
        const nameLen = e.target.value.length;

        // 이름은 5글자까지만 입력가능하게 처리
        if((nameLen < 5)){
            stateName = e.target.value;
        }else{
            stateName = e.target.value.substring(0, 5);
        }
        setName(stateName);
    }
    const onChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    const onChangeAge = (e)=>{
        if(isNaN(e.target.value)){
            alert('숫자만 입력가능합니다.');
            return;
        }else if(e.target.value < 0 || e.target.value > 150){
            alert('0~150 사이의 숫자만 입력가능합니다.');
            return;
        }
        setAge(Number(e.target.value));
    }

    return (
        <div className="container py-4 text-start">
            
            이름 <input type="text" 
            name="name" 
            value={name}
            placeholder="Name" 
            className="form-control"
            onChange={onChangeName} 
            /><br />
            
            이메일 <input type="text" 
            name="email" 
            value={email}
            placeholder="Email"  
            className="form-control" 
            onChange={onChangeEmail}
            /><br />

            나이 <input type="text" 
            name="age"
            value={age}
            placeholder="Age"  
            className="form-control" 
            onChange={onChangeAge}
            /><br />
            <button className="btn btn-primary">회원가입</button>
            <hr />
            <h1 style={{color: 'green'}}>
                이름: {name} 이메일: {email} 나이: {age}세
            </h1>
        </div>
    )
}
export default Join;