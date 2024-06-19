import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NaverBookCard(props) {
  const {isbn, title, link, image, author, discount, pubdate}=props;

  let len = 20;
  let title_ellipsis=title;
  if(title.length>len){ // 제목이 len보다 길면
    title_ellipsis=title.substring(0, len)+'...';
  }
  let date = pubdate.substring(0, 4)+'-'+pubdate.substring(4, 6)+'-'+pubdate.substring(6, 8);

  return (
    <Card>
      <Link to="/">
        <Card.Img src={image}></Card.Img>
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={link}>
            {title_ellipsis}
          </Link>
        </Card.Title>
      </Card.Body>
      <Card.Text className='p-3 pt-0'>
        <div>가  격: {discount}원</div>
        <div>저  자: {author}</div>
        <div>출판일 : {date}</div>
      </Card.Text>
    </Card>
  );
}