import React, {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
// useSearchParams : query string을 사용하기 위한 hook (?)
// useParams : path parameter를 사용하기 위한 hook (:)
import { Pagination, Spinner } from 'react-bootstrap';

// query string 사용
// ajax2?page=1&per_page=3
// https://reqres.in/api/users?page=1&per_page=3

export default function ListUser() {
  const [userList, setUserList] = useState([]);
  const [total, setTotal] = useState(0); // 총 회원수 (12) / 3 = 4pages
  // 페이지수 = 
  // Math.ceil(총 회원수 / 한 페이지당 보여줄 회원수) // Math.ceil() : 올림
  // Math.ceil(total / per_page)
  const [totalPages, setTotalPages] = useState(1); // 최소한 페이지는 1부터 있어야 하므로
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩중 여부

  // query string으로 전달된 파라미터 값 (page, per_page) 가져오기
  const [params] = useSearchParams();
  const perPage = Number(params.get('per_page'));
  // console.log(params.get('page'));
  // console.log(params.get('per_page'));
  
  const getAllUsers = (page, per_page)=>{

    setLoading(true);

    // fetch() 함수를 사용하여 REST API 호출 : 요청 보내고 데이터 받아오기
    // fetch(`https://reqres.in/api/users?page=${params.get('page')}&per_page=${params.get('per_page')}`)
    let url =`https://reqres.in/api/users?page=${page}&per_page=${per_page}&delay=3`;
    fetch(url)
    .then(res=>res.json())
    .then(usersData=>{
      if(!usersData.data){
        alert('데이터가 없습니다.');
        return;
      }
      setLoading(false);
      
      // console.log(JSON.stringify(usersData)); // JSON.stringify() : JSON 객체를 문자열로 변환
      let tmpArr = [... usersData.data]; // 원본 데이터를 변경하지 않기 위해 복사해서 사용
      let tmpTotal = usersData.total; // total을 제공해주는 경우
      setUserList(tmpArr);
      setTotal(tmpTotal); // 총 회원수 (12)
      setTotalPages(usersData.total_pages); // 총 페이지수(4)
    })
    .catch(err=>{
      console.warn(err);
    });
  }

  useEffect(()=>{
    getAllUsers(1, perPage);
  }, []);

  const pageClickHandler = (page)=>{
    setCurrentPage(page);
    getAllUsers(page, perPage);
  };

  return (
    <div className='container py-4'>
      <h2>All Users - {total}명</h2>
      <br />
      <ul>
        {
          loading && 
          <Spinner animation='border' role="status">
            <span className='visually-hidden' >Loading...</span>
          </Spinner>
        }
      {userList&&userList.map((user, i)=>(
        <li key={user.id}>
          <img src={user.avatar} alt="" /><br />
          {user.first_name} {user.last_name} <br />
          <br />
          {user.email}
        </li>
      ))
        }
      </ul>
      <div>
        {/* 
        Array(len)
        Array(total) : 배열의 길이가 total인 배열이 생성
        [... Array(5)] : 배열의 길이가 5인 배열이 생성
        [undefined, undefined, undefined, undefined, undefined]
        [    0    ,     1    ,     2    ,     3    ,     4    ]
        Array.keys() : 배열의 인덱스를 반환(index 번호들만 추출)
        */}
        <Pagination> {/* totalPages길이의 배열을 생성해서 인덱스를 추출 */}
          {
            [... Array(totalPages).keys()].map((page)=>(
              <Pagination.Item 
              key={page+1} 
              active={(page+1)===currentPage}
              onClick={()=>{
                pageClickHandler(page+1);}}
              >{page+1}</Pagination.Item>
            ))
          }
        </Pagination>
      </div>
    </div>
  )
}