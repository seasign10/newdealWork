import React, {FC, useState, useEffect} from 'react'
import axios from '../lib/axiosCreate'
import {AxiosResponse} from 'axios'

interface Post{
  id:number;
  userid:string;
  title:string;
  content:string;
  attach:string;
  reg_date:string;
}

const PostList:FC =()=>{
  const [postList, setPostList] = useState<Post[]>([]);
  useEffect(()=>{
    const fetchData = async()=>{
      await getPostList();
    }
    fetchData();
  }, []);
  const getPostList = async()=>{
    try{const response:AxiosResponse = await axios.get('/api/postList');
    setPostList(response.data);
    
    }catch(err){
      alert('Error :'+(err as Error).message);
    }
  }

  return (
    <div className='container py-4'>
      <h2 className='text-center my-5'>Post List</h2>
      {postList.length>0&& postList.map((post:Post, i:number)=>(
      <div key={i} className='d-flex my-3 p-3' style={{borderRadius: '10px'}}>
        <div className='flex-shink-0' style={{width: '25%'}}><img src={`http://localhost:5000/uploads/${post.attach}`} 
        alt={post.attach} style={{width: '90%', borderRadius:'1rem'}} /></div>
        <div>
          <h4>{post.userid}<small><i>Posted on {post.reg_date}</i></small></h4>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div><button className='btn btn-primary'>Edit</button></div>
          <div><button className='btn btn-danger'>Delete</button></div>
        </div>
      </div>
      ))
      }
    </div>
  )
}

export default PostList;