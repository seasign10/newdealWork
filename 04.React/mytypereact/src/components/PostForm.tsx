import React,{FormEvent} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup' // 유효성 체크 라이브러리
import axios from '../lib/axiosCreate'
import {AxiosResponse} from 'axios'
import { log } from 'console'

export interface PostFormValues {
  userid:string;
  title:string;
  content:string;
  attach?:File;
}

// 파일 업로드 할 때 form의 method는 post 방식으로 해야한다.
// get은 url 형식으로 전달되기 때문에 파일을 전달할 수 없다.
// post 방식일 때, (html form의)enctype 속성값을 "multipart/form-data"로 해야한다.
// axios를 이용할 때는 header에 "Content-Type": "multipart/form-data"를 지정
// useFomix 훅을 사용해보자 > 폼 상태와 이벤트를 관리하는 훅
// onChange와 관련된 핸들러 함수를 자동으로 생성하고 제공 > handleChange 함수 제공
// formik.values 속성을 통해 사용자가 입력한 값을 접근할 수 있다.
// 설치해서 사용 > npm install formik


// const onSubmit = (e:FormEvent<HTMLFormElement>)=>{
//   e.preventDefault();
// }
export default function PostForm() {
  const formik = useFormik<PostFormValues>({
    initialValues:{userid:'', title:'', content:''},
    onSubmit: async (values)=>{
      console.log(values);
      console.log(values.userid);
    },
  });

  return (
    <div className="container">
      <div className="col-8 offset-2">
          <h1 className="text-center my-4">POST</h1>
          <form onSubmit={formik.handleSubmit}>
           <table className="table">
               <tr>
                    <td style={{width:'20%'}}>
                        <label>작성자</label>
                    </td>
                    <td>
                        <input type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}                 
                        name="userid" className="form-control"></input>
                    </td>
                </tr>
                <tr>
                    <td style={{width:'20%'}}>
                        <label>제목</label>
                    </td>
                    <td>
                        <input type="text"
                        name="title" className="form-control"></input>

                    </td>
                </tr>
                <tr>
                    <td style={{width:'20%'}}>
                        <label>글내용</label>
                    </td>
                    <td>
                        <textarea className="form-control" name="content"/>
                    </td>
                </tr>
                <tr>
                    <td style={{width:'20%'}}>
                        <label>첨부파일</label>
                    </td>
                    <td>
                        <input type="file"
                        name="attach" className="form-control"></input>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button type="submit" className="btn btn-success">글쓰기</button>                       
                        <button type="reset" className="btn btn-danger mx-2">다시쓰기</button>                       
                    </td>
                </tr>
           </table> 
        </form>
      </div>
    </div>
  )
}
