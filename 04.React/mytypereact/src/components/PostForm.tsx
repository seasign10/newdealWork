import React,{FormEvent} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup' // 유효성 체크 라이브러리
import axios from '../lib/axiosCreate'
import {AxiosResponse} from 'axios'

// 다른 곳에도 사용할 수 있도록 export
export interface ResponseData{
  result:string;
  data?:string;
}

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
// FormData 객체를 이용 > 사용자가 입력한 값들을 전송해야 한다.

// useFomix 훅을 사용해보자 > 폼 상태와 이벤트를 관리하는 훅
// onChange와 관련된 핸들러 함수를 자동으로 생성하고 제공 > handleChange 함수 제공
// formik.values 속성을 통해 사용자가 입력한 값을 접근할 수 있다.
// 설치해서 사용 > npm install formik

// Yup: 데이터 검증을 위한 js 스키마 생성 라이브러리
// formik 속성 중
// errors: 유효성 검증 중에 발생한 오류를 포함하는 객체
//touched: 사용자 입력 필드를 추적하는 객체
export default function PostForm() {
  const formik = useFormik<PostFormValues>({
    initialValues:{userid:'', title:'', content:''},
    validationSchema: Yup.object({
      userid: Yup.string().required('작성자를 입력하세요'),
      title: Yup.string().required('제목을 입력하세요'),
      content: Yup.string().required('내용을 입력하세요'),
      // mixed : 모든 종류의 데이터 유형을 다룰 수 있음
      attach: Yup.mixed().required('파일을 첨부하세요'),
    }),
    onSubmit: async (values)=>{
      // console.log(values);
      // FormData에 파라미터 값을 담아서 전송
      const formData = new FormData();
      formData.append('userid', values.userid);
      formData.append('title', values.title);
      formData.append('content', values.content);
      if(values.attach){
        formData.append('attach', values.attach);
      }
      try{
        const response:AxiosResponse = 
        await axios.post(`/api/postUpload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const responseData:ResponseData = response.data;
        alert(JSON.stringify(responseData));
      }catch(err){
        alert('Error :'+err)
      }
    },
  });

  const onChangeFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.currentTarget.files){
      formik.setFieldValue('attach', e.currentTarget.files[0]);

    }
  }

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
                        // onBlur : input 요소가 포커스를 잃었을 때 발생하는 이벤트
                        onBlur={formik.handleBlur}
                        value={formik.values.userid}          
                        name="userid" className="form-control"></input>
                        {formik.touched.userid && formik.errors.userid?
                          <div className='text-danger'>{formik.errors.userid}</div>:null
                        }
                    </td>
                </tr>
                <tr>
                    <td style={{width:'20%'}}>
                        <label>제목</label>
                    </td>
                    <td>
                        <input type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        name="title" className="form-control"></input>
                        {formik.touched.title && formik.errors.title?
                          <div className='text-danger'>{formik.errors.title}</div>:null
                        }
                    </td>
                </tr>
                <tr>
                    <td style={{width:'20%'}}>
                        <label>글내용</label>
                    </td>
                    <td>
                        <textarea 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                        className="form-control" name="content"/>
                        {formik.touched.content && formik.errors.content?
                          <div className='text-danger'>{formik.errors.content}</div>:null
                        }
                    </td>
                </tr>
                <tr>
                    <td style={{width:'20%'}}>
                        <label>첨부파일</label>
                    </td>
                    <td>
                        <input type="file"
                        name="attach" 
                        onChange={onChangeFile}
                        onBlur={formik.handleBlur}
                        className="form-control"></input>
                        {formik.touched.attach && formik.errors.attach?
                          <div className='text-danger'>{formik.errors.attach}</div>:null
                        }
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
