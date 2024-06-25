import React from 'react'
// import './TodoListItem.css'

export default function TodoListItem(props) {
  const {id, content, wdate, isDone, onDelete, onChangeDone} = props

  const onChangeCheckBox = ()=>{
    onChangeDone(id); // id번에 해당하는 todo의 isDone값을 반대로 변경
  }

  return (
    <div className='TodoListItem'>
      <div className="chkbox">
        <input type="checkbox" 
        onChange={onChangeCheckBox}
        name='isDone' 
        checked={isDone} />
      </div>
      <div className="content" 
      style={{
        textDecoration: isDone? 'line-through':'none',
        color: isDone? 'gray':'black'
        }}>
        {content}
      </div>
      <div className="wdate">
        {new Date(wdate).toLocaleDateString()}
      </div>
      <div className="btnDel">
        <span className='btn btn-danger' key={id} onClick={()=>{
          // if(window.confirm(id+'번 할 일을 정말 삭제하시겠습니까?')){ // true를 리턴하면 삭제
            onDelete(id);
          // }
        }}>x</span>
      </div>
    </div>
  )
}