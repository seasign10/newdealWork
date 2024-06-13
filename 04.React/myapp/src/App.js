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

function App() {
  return (
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
            <Col xs={12} sm={9} md={8} className='d-none d-sm-block' style={{backgroundColor: 'beige'}}>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/comp1" element={<MyComp/>} />
                <Route path='/board' element={<BoardList />} />
                <Route path='/users/:id' element={<UserDetail />} />
                <Route path='/life' element={<LifeCycle />} />
                <Route path='/hook1' element={<UseEffectHook />} />
                <Route path='/clock' element={<Clock />} />

                {/* 위의 path 이외 나머지는 *가 전부 받는다. */}
                <Route path="*" element={<PageNotFound/>} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
