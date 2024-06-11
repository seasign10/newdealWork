import react, {Component} from 'react';
// class MyProfile extends Component {
//     render() {
//         const mystyle = {
//             textAlign: 'center',
//         }
//         console.log('props', this.props);
//         const {name, userId, email, tel}=this.props;
//         return(
//         <div style={mystyle}>
//             <h3>MyProfile</h3>
//             {/* 이미지 */}
//             <img src="images/img2.jpeg" alt="" style={{width: '400px'}} />
//             {/* 이름, 아이디, 이메일주소, 연락처 */}
//             <dt>
//                 <dd>이름: {name}</dd>
//                 <dd>아이디: {userId}</dd>
//                 <dd>이메일주소: {email}</dd>
//                 <dd>연락처: {tel}</dd>
//             </dt>
//         </div>
//         )
//     }
// }
///////////////////////////
class MyProfile extends Component {
    render() {
        const mystyle = {
            textAlign: 'center',
        }
        const { myname, myuserId, myemail, mytel } = this.props;
        const profile = {
            name: myname,
            userId: myuserId,
            email: myemail,
            tel: mytel
        };
        return(
        <div style={mystyle}>
            <h3>MyProfile</h3>
            {/* 이미지 */}
            <img src="images/img2.jpeg" alt="" style={{width: '400px'}} />
            {/* 이름, 아이디, 이메일주소, 연락처 */}
            <dt>
            <dd>이름: {profile.name}</dd>
                    <dd>아이디: {profile.userId}</dd>
                    <dd>이메일주소: {profile.email}</dd>
                    <dd>연락처: {profile.tel}</dd>
            </dt>
        </div>
        )
    }
}

export default MyProfile;