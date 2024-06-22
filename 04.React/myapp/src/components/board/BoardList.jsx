import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../lib/axiosCreate'
import {Row, Col, Button, Table, Badge} from 'react-bootstrap'
const initData=[]

export default function BoardList() {
  const [boardList, setBoardList] = useState([]);// 게시글 목록
  const [totalCount, setTotalCount] = useState(0);// 총 게시글 수

  useEffect(()=>{
    const fetchBoardList = async()=>{
      await getBaordTotal();
      await getBaordList();
    }
    fetchBoardList(); // useEffect에서 호출
  },[]);

  const getBaordTotal = ()=>{
    axios.get('/api/boardTotal')
    .then(response=>
      setTotalCount(response.data.totalCount)
    )
    .catch(err=>{
      alert('Error: '+err.message);
    })
  }
  
  const getBaordList = async()=>{
      await axios.get('/api/boards')
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
                <td><Link to={`/post/${board.id}`}>{board.title}</Link></td>
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
    </>
  )
}
