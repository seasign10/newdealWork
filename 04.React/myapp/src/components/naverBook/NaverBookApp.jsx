import React, {useState, useMemo} from 'react';
import {Button, Container, Row, Col, Pagination} from 'react-bootstrap';
import NaverBookForm from './NaverBookForm';
import NaverBookCard from './NaverBookCard';
import axios from 'axios';

export default function NaverBookApp() {
  const [query, setQuery] = useState(''); // 검색어
  const [bookList, setBookList] = useState([]); // 검색 결과
  const [total, setTotal] = useState(0); // 검색 결과 건수
  const [start, setStart] = useState(1); // 검색 시작 위치 // display가 12라면 1, 13, 25, 37...
  const display = 12 // 한 페이지에 보여줄 건수
  const [pageCount, setPageCount] = useState(1); // 페이지 수 >> total/display
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageRangeStart, setPageRangeStart]=useState(1); //페이징 블럭처리에서 사용할 데이터

  const pageHandler = async(page) => {
    setCurrentPage(page);

    // start 계산
    let tmpStart = (page-1)*display+1;//네이버에서 가져올 시작 값 구하기
    fetchData(query, tmpStart);
  }

  const getPageNavi = useMemo(()=>{
    console.log('total:', total, 'display:', display);
    let pageCount = Math.ceil(total/display);
    setPageCount(pageCount);
    let navi = [];
    // pafeRangeStart+9 : 10
    // 1~10, 11~20, 21~30
    // pageRangeStart+9(10) 만큼, pc(총페이지수)까지 반복
    let end=Math.min(pageRangeStart+9, pageCount);
    console.log(pageCount, end);
    for(let i=pageRangeStart; i<=end; i++){
      navi.push(<Button 
      key={i} 
      onClick={()=>{pageHandler(i)}}
      className='xs mx-1'
      variant={i===Number(currentPage)? 'primary':'outline-primary'}>{i}</Button>)
    }// for end---
    if(pageCount>end){ // 총페이지수가 10보다 크면 넘겨줄 것임
      navi.push(<Button key="next" 
      onClick={()=>{ // end = 10
        setPageRangeStart(end+1);
        pageHandler(end+1);
      }}
      variant='primary' 
      className='xs mx-1'>Next</Button>)
    }
    //pageRangeStart: 1, 11, 21, 31, 41, ...
    if(pageRangeStart>1){
      //navi.unshift(배열의 맨앞에 추가), navu.push(배열의 맨뒤에 추가)
      navi.unshift(<Button 
        onClick={()=>{
          setPageRangeStart(pageRangeStart-10)// 이전 블럭의 시작값
          pageHandler(pageRangeStart-10)
        }}
        className='xs mx-1' key="prev">prev</Button>)
    }
    return navi;
;  }, [total, currentPage])

  // 검색이 되기도 전에 렌더링이 되어서 검색어가 빈값으로 나올 수 있으므로 async, await 사용
  const onFind=async(value)=>{ 
    // alert(value);
    await setQuery(value);
    fetchData(value, 1);
    setCurrentPage(1); // 검색 시, 현재 페이지를 1로 초기화
    setPageRangeStart(1); // 검색 시, 페이지 블럭을 1로 초기화
  }

  // packgage.json에 "proxy": "http://localhost:5000" 추가 했기 때문에
  // 앞의 갚을 생략하고 /api/books로 사용 가능
  const fetchData = async(value, start) => {
    let url=`/api/books?query=${value}&start=${start}&display=${display}`;
    // alert(url);

    // axios로 get 요청 > 응답 받아 콘솔에 출력
    axios.get(url)
    .then((res=>{
      const {items, total}= res.data; // 비구조화로 할당하면 res.data.item까지 쓰지 않아도 됨
      setBookList(items);
      setTotal(total);
    }
    ))
    .catch((err)=>console.log(err))
  }

  return (
    <Container>
      <h1 className='text-success text-conter my-5'>Naver Books</h1>
      <br />
      {total>0&& getPageNavi}
      <br />
      <br />
      <NaverBookForm onFind={onFind} />
      {total>0 &&
      <Row>
        <Col md={10} className='mx-auto my-4'>
          <h3>검색어 : 
          <span className='mx-2 text-primary'>{query}</span>
          <span className='mx-2 text-danger'>{total}개</span>
          </h3>
        </Col>
      </Row>
      }
      <Row className='mt-4'>
        {bookList&&
          bookList.map((book, i)=>(
          <Col md={3} key={i}>
            <NaverBookCard key={book.isbn} {...book} />  
          </Col>
          ))
        }
      </Row>
    </Container>
  )
}