import MyProfile from './example/MyProfile';

const App = () => {
    return (
        <>
            <h1>App04</h1>
            <hr />
            {/* 여기에 MyProfile 삽입. props로 name, userId, email, tel 전달 */}
            {/* <MyProfile name="Lee Hae In" userId="seasign" email="seasign10@gmail.com" tel="01012348614" /> */}
            <MyProfile myname="Lee Hae In" myuserId="seasign" myemail="seasign10@gmail.com" mytel="01012348614" />
        </>
    );
}
export default App;