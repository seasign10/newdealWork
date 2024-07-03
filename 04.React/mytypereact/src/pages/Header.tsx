import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

export default function Header(props:any) {

  return <div className="header">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/postForm">Post Form</Link>
      </li>
      <li>
        <Link to="/postList">Post List</Link>
      </li>
    </ul>
  </div>;
}
