import React from 'react'
// npm i --s react-icons  // 아이콘 사용을 위한 패키지 설치
// https://react-icons.github.io/react-icons
import { BsCalendar2Minus } from "react-icons/bs";

export default function TodoHeader() {
  return (
    <div className='mb-4'>
      <h1>오늘 할 일</h1>
      <h3 className="text-success d-flex align-items-center justify-content-center">
        <BsCalendar2Minus className='mx-2' /> {new Date().toLocaleDateString()}
      </h3>
    </div>
  )
}