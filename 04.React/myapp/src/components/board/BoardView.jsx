import React,{useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {Button, Col, Row, Card, Container, Badge} from 'react-bootstrap';
import {AiFillHeart, AiFillDislike} from 'react-icons/ai';
import axios from '../../lib/axiosCreate'
import { log } from 'three/examples/jsm/nodes/Nodes.js';

export default function BoardView() {
  const {id} = useParams(); // url 파라미터 값 가져오기 (게시글 번호)
  const [board, setBoard] = useState({});// 게시글 상세정보
  const [logId, setLogId] = useState(''); // 로그인한 사람의 아이디
  const navigate = useNavigate();

  useEffect(() => {
    // async가 useEffect에서는 사용하지 못하므로
    // 함수 내부에서 async를 사용하고 호출하는 방식으로 사용
    const fetchData=async()=>{
      // 비동기적으로 수행 .. 게시글 가져오기 > 댓글 가져오기
      //조회수
      await updateReadnum();
      // 게시글
      await getBoard();
      // 댓글
    };
    fetchData();
  },[id]);

  let uid=null; // 로그인한 사람의 userid값 받을 예정 
  useEffect(() => {
    // 세션 스토리지에 저장된 userInfo가 있는지 꺼내보자
    let str=sessionStorage.getItem('userInfo');
    // alert(str, typeof str);
    if(str!==null){
      const user = JSON.parse(str); // parse > stringfy와 반대
      uid = user.userid; // uid애 로그인한 사람의 아이디 할당
      setLogId(uid);
    }
  },[]);

  const onDelete = async()=>{
    let yn = window.confirm(`정말로 ${id} 삭제하시겠습니까?`);
    if(yn){
      await axios.delete(`/api/boards/${id}`)

      navigate('/post')
    }
  };

  const updateReadnum = async () => {
    await axios.put(`/api/boardReadnum/${id}`)
    .then(res=>{
      if(res.data.result==='success'){}
    })
    .catch(err=>log('Error :', err.message))
  };

  const getBoard = async () => {
    await axios.get(`/api/boards/${id}`)
    .then(res=>{
      // console.log(JSON.stringify(res.data));
      setBoard(res.data[0]);
    })
    .catch(err=>alert('Error :', err.message))
  };

  return (
    <Container className='py-3'>
      <h2>BoardView [ No. {id}]</h2>
      {board&&
      <>
      {/* 로그인한 사람의 아이디(uid)와 글쓴이의 아이디(board.userid)가 같은 경우에만 수정, 삭제 버튼을 출력 하자 */}
        <div className="text-end my-2 mt-5 mb-2">
        {(logId==board.userid)&&
        <>
          <Link to={`/postEdit/${id}`} className='mx-1'><Button variant="success">수정</Button></Link>
          <Button 
          className='mx-1'
          onClick={onDelete}
          variant='danger'>삭제</Button>
        </>
        }
        <Link to={`/post`} className='mx-1'><Button variant="dark">목록</Button></Link>
        </div>
          <Card>
          <Card.Body>
            <h4>{board.title}</h4>
            <hr />
            <div className="cArea">
              {board.content}
              <br />
              <AiFillHeart style={{color:'red'}} />
              <AiFillDislike style={{color:'green'}} />
              &nbsp;&nbsp;
              <Badge bg="primary">{board.readnum}</Badge>
            </div>
            </Card.Body>
          <Card.Footer>
            Create on {board.wdate} by {board.userid}
          </Card.Footer>
        </Card>
        </>
      }
      {
        !board&& <h4 className='text-center my-5'>존재하지 않는 게시글입니다.</h4>
      }
    </Container>
  )
}
