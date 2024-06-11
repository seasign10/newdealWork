import './mystyle.css';

export default function App(){
    return (
        <div className='App02'>
            <h1 style={{color: 'tomato'}}>App02</h1>
            <hr />
            <p className="m1">Hello React</p>
            <p id="m2">ID selector</p>
            <label>이름 : </label>
            <input type="text" name='userName' id='userName' /><br />
            <img src="images/img1.png" alt="" style={{width: '200px', margin: '1rem'}} />
        </div>
    )
}