const YourComp=({name, email, age})=>{
    // name = "Bread"
    return (
        <div style={{background:'beige', padding:'1rem', margin:5}}>
            <h3>Name: {name}</h3>
            <h3>Email: {email}</h3>
            <h3>Age: {age}</h3>
        </div>
    );
}
// const YourComp=(props)=>{
//     const user = props.user;
//     return (
//         <div style={{background:'beige', padding:'1rem', margin:5}}>
//             <h3>Name: {user.name}</h3>
//             <h3>Email: {user.email}</h3>
//             <h3>Age: {user.age}</h3>
//         </div>
//     );
// }
YourComp.defaultProps = {
    name: '이름없음',
    email: '이메일없음',
    age: '나이없음'
}
export default YourComp;