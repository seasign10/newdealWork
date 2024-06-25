import React from 'react'

export default function ReplyList({replise}) {
  return (
    <ul className='list-group'>
      {replise.length>0 && 
        replise.map((reply, i) =>(
          <li className='list-group-item' key={reply.rid}>
            <div>
              <strong>{reply.userid}</strong>
              {reply.content} <br />
              <small>{reply.wdate}</small>
            </div>
          </li>
        )
      )

      }
    </ul>
  )
}
