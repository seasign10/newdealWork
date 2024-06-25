import React, {useState, useEffect, useMemo} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../lib/axiosCreate'
import {Row, Col, Button, Table, Badge, Pagination} from 'react-bootstrap'
const initData=[]

export default function BoardList() {
  const display = 5; // 한 페이지에 보여줄 목록 개수
  const [boardList, setBoardList] = useState([]);// 게시글 목록
  const [totalCount, setTotalCount] = useState(0);// 총 게시글 수
  const [pageCount, setPageCount] = useState(1) // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 번호
  const [pageRangeStart, setPageRangeStart] = useState(1) // 페이지 네비게이션 시작 번호 1, 6, 11, 16, ...

  useEffect(()=>{
    const fetchBoardList = async()=>{
      // 총 게시글 수
      await getBaordTotal();
      // 모든 게시글
      await getBaordList(0); // offset=0
    }
    fetchBoardList(); // useEffect에서 호출
  },[]);

  useEffect(()=>{
    let pageCnt = Math.ceil(totalCount/display);
    setPageCount(pageCnt);
  },[totalCount])

  const getPageNavi = useMemo(()=>{
    let navi=[];
    // Math.min(1, 5) => 1 : 둘 중 작은 값, 총 페이지수가 5보다 작으면 총페이지수만큼만 보여주기
    // 즉, 페이지가 1개면 1만 보여주고 2개면 1,2만 보여준다. 5를 초과하는 값 7이면 1,2,3,4,5만 보여준다.
    let end = Math.min(pageRangeStart+4, pageCount);
    for(let i=pageRangeStart;i<=end;i++){
      navi.push(<Pagination.Item 
        key={i} 
        active={i===currentPage}
        onClick={()=>{
          pageHandler(i);
        }}
        >{i}</Pagination.Item>)
    }
    if(pageCount>end){
      navi.push(<Pagination.Item 
        key='next'
        onClick={()=>{
          setPageRangeStart(end+1);
          pageHandler(end+1);
        }}
        >다음</Pagination.Item>);
    }
    // pageRangeStart:1, 6, 11, 16, ...
    if(pageRangeStart>1){
      navi.unshift(<Pagination.Item 
        key='prev'
        onClick={()=>{
          setPageRangeStart(pageRangeStart-5);
          pageHandler(pageRangeStart-5);
        }}
        >이전</Pagination.Item>);
    }
    return navi;
  },[pageCount, currentPage])

  const pageHandler = (page)=>{
    // alert('page: '+page);
    const offest=(page-1)*display;
    setCurrentPage(page);
    getBaordList(offest);
  }

  const getBaordTotal = ()=>{
    axios.get('/api/boardTotal')
    .then(response=>
      setTotalCount(response.data.totalCount)
    )
    .catch(err=>{
      alert('Error: '+err.message);
    })
  }
  
  const getBaordList = async(offset)=>{
    if(!offset) offset=0; // offset이 없으면 첫 페이지 데이터 보여주기
    // offset을 이용해 DB에서 데이터를 끊어서 가져오자
      await axios.get(`/api/boards?offset=${offset}`)
      .then(response=>{
        const responseData = response.data;
        // console.log(JSON.stringify(responseData));
        setBoardList(responseData);
      })
      .catch(err=>{
        alert('Error: '+err.message);
      });
  }

  return (
    <>
      <Row className='my-3'>
        <Col className='p-3 mx-auto' md={10}>
          <h1 className='text-center'>Board List</h1>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col className='p-3 mx-auto text-center' md={10}>
          <h4>총 게시글 수 : {totalCount}</h4>
        </Col>
      </Row>
      {boardList.length>0 &&
      <Row className='my-3'>
        <Col className='p-3 mx-auto' md={10}>
          <Table striped border hover>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>게시일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              { boardList.map((board, i)=>(
              <tr key={board.id}>
                <td>{board.id}</td>
                <td><Link 
                to={`/post/${board.id}`}
                style={{textDecoration: 'none'}}
                >{board.title}</Link></td>
                <td>{board.userid}</td>
                <td>{board.wdate}</td>
                <td>{board.readnum}</td>
              </tr>
              ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      }
      {boardList.length===0 &&
      <Row className='my-3'>
        <Col className='p-3 mx-auto' md={10}>
          <h4>게시글이 없습니다.</h4>
        </Col>
      </Row>
      }
      {/* 페이지 네비게이션 */}
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
        <Pagination>{getPageNavi}</Pagination>
      </div>
    </>
  )
}
