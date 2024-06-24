import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import Home from './pages/Home';
import Header from './pages/Header';
import Side from './pages/Side';
import MyComp from './pages/MyComp';
import PageNotFound from './pages/PageNotFound';
import UserDetail from './components/UserDetail';
import BoardList from './components/BoardList';
import LifeCycle from './components/LifeCycle';
import UseEffectHook from './components/UseEffectHook';
import Clock from './components/Clock';
import UseRefHook from './components/UseRefHook';
import AppPropsDrill from './components/context_api/AppPropsDrill';
import AppCxt from './components/context_api/AppCtx';
import AppCxt2 from './components/context_api/AppCtx2';
import OpenWeather from './components/ajax/OpenWeather';
import SingleUser from './components/ajax/SingleUser';
import ListUser from './components/ajax/ListUser';
import NaverBookApp from './components/naverBook/NaverBookApp';
import SignUp from './components/member/SignUp';
import TodoApp from './components/todo/TodoApp';
import MemberList from './components/member/MemberList';
import SignIn from './components/member/SignIn';
import BoardApp from './components/board/BoardApp';
import BoardView from './components/board/BoardView';
import BoardModify from './components/board/BoardModify';

// 로그인한 회원정보를 제공할 Context
import {SigninUserProvider} from './components/member/SigninUserContext';


function App() {
  return (
    <SigninUserProvider>
      {/* 아래 감싸진 코드가 children */}

      <div className="container py-4">
        {/* 모든 컴포넌트의 뿌리가 되는 쪽에서 BrowserRouter로 감싸줘야 한다. */}
        <BrowserRouter>
          <Container>
            {/* Header */}
            <Row>
              <Col xs={12}>
                <Header />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={3} md={4} style={{display:'flex'}}>
                <Side />
              </Col>
              {/* d-sm-block : sm 사이즈일때 부터 block */}
              <Col xs={12} sm={9} md={8} className='d-none d-sm-block'>
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/comp1" element={<MyComp/>} />
                  <Route path='/board' element={<BoardList />} />
                  <Route path='/users/:id' element={<UserDetail />} />
                  <Route path='/life' element={<LifeCycle />} />
                  <Route path='/hook1' element={<UseEffectHook />} />
                  <Route path='/clock' element={<Clock />} />
                  <Route path='/hook2' element={<UseRefHook />} />
                  <Route path='/app2' element={<AppPropsDrill />} />
                  <Route path='/hook3' element={<AppCxt />} />
                  <Route path='/hook4' element={<AppCxt2 />} />
                  <Route path='/todo' element={<TodoApp />} />
                  <Route path='/ajax3' element={<OpenWeather />} />
                  <Route path='/naver' element={<NaverBookApp />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/ajax1/:id' element={<SingleUser />} />
                  <Route path='/ajax2' element={<ListUser />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/members' element={<MemberList />} />
                  <Route path='/signin' element={<SignIn />} />
                  <Route path='/post' element={<BoardApp />} />
                  <Route path='/post/:id' element={<BoardView />} />
                  <Route path='/postEdit/:id' element={<BoardModify />} />

                  {/* 위의 path 이외 나머지는 *가 전부 받는다. */}
                  <Route path="*" element={<PageNotFound/>} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </BrowserRouter>
      </div>
    </SigninUserProvider>
  );
}

export default App;
