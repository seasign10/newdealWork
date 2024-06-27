import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'

export default function ReplyList({replise, deleteReply, startEditReply, logId}) {
  console.log(logId);
  return (
    <ul className='list-group'>
      {replise.length>0 && 
        replise.map((reply, i) =>(
          <li className='list-group-item d-flex justify-content-between align-items-center' key={reply.rid}>
            <div>
              [{reply.rid}]
              <strong>{reply.userid}</strong> &nbsp;
              {reply.content} <br />
              <small>{reply.wdate}</small>
            </div>
            <div>
              {reply.userid===logId && logId &&
                <Fragment>
                  <Button variant="primary" size="sm" 
                  onClick={()=>{startEditReply(reply)}}
                  className="mx-1">댓글 수정</Button>
                  <Button variant="danger" size="sm" 
                  onClick={()=>{deleteReply(reply.rid)}}
                  className="mx-1">댓글 삭제</Button>
                </Fragment>
              }
            </div>
          </li>
        )
      )

      }
    </ul>
  )
}
