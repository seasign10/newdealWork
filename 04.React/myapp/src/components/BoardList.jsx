import React from 'react'
import { useSearchParams } from 'react-router-dom'
// useSearchParams : url에 query string을 읽고 수정하는데 사용되는 hook
// useSearchParams()가 반환하는 배열(2차원 배열)은
// URLSearchParams 객체를 스프레드 연산자로 배열로 변환한 것 이기 때문에
// URLSearchParams 객체가 가지고 있는 메서드 get() set() append() delete() 등을 사용할 수 있다.

// board?page=2&size=10&keyword=React => URLSearchParams() 이용
// user/5 => useParams() 이용

export default function BoardList() {

  const [params]=useSearchParams(); // 2차원 배열
  console.log(params); // URLSearchParams 객체
  // [[page, 2], [size, 10], [keyword, React]]
  const search = [... params]; // 1차원 배열
  console.log(search);

  return (
    <div className='container py-4 text-center'>
      <h2>Board List</h2>
      {
        // search.map((item, index)=>( // {} 대신 () 사용하여 return 생략
        //   <h3 key={index}> 파라미더 명:{item[0]} , 파라미터 값 : {item[1]} </h3>
        // ))
      }
      <br />
      {/* 파라미터 값 추출 하기 위해서 get 사용 */}
      <h3>page: {params.get('page')}</h3>
      <h3>size: {params.get('size')}</h3>
      <h3>keyword: {params.get('keyword')}</h3>
    </div>
  )
}
