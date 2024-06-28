import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import Header from './pages/Header';
import Signup from './components/SignUp';
import PostForm from './components/PostForm';
import PageNotFound from './pages/PageNotFound';

interface AppProps {}

const App:FC<AppProps> = ()=>{
  return (
    <>
      <BrowserRouter>
        <div className='container py-5'>
          <Header />
          <div>
            <Routes>
              {/* <Route path='/' element={<Home />}></Route> */}
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/postform' element={<PostForm />}></Route>

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;