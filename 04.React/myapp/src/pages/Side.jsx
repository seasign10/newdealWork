import React from 'react';
import { Stack, Button, ListGroup } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

export default function Side() {

  const navigate = useNavigate();

  const moveLoc=()=>{
    let yn = window.confirm('MyComp1로 이동하시겠습니까?');
    if (yn) {
      // MyComp1로 이동
      // location 사용 시 reload 발생
      // window.location.href = '/comp1';

      // useNavigate 사용 시 render만 발생
      navigate('/comp1');
    } else {
      // MyComp1로 이동하지 않음
    }
}

  return (
    <Stack gap={2} className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
      {/* as를 사용하여 Link 컴포넌트로 변환 하여 역할을 수행 할 수 있다. */}
      <Button as={Link} to={'/'} variant="primary">Home</Button>
      <Button as={Link} to={'/comp1'} variant="secondary">MyComp1</Button>
      <Button onClick={moveLoc} variant='danger'>Confirm</Button>
      <Button as={Link} to={'/todo'} variant='warning'>TodoList</Button>
      <Button as={Link} to={'/naver'} variant='danger'>NaverBook</Button>
      <hr />
      {/* ul */}
      <ListGroup>
        <ListGroup.Item as={Link} to={'/board?page=2&size=10&keyword=React'} >Board</ListGroup.Item> {/* li */}
        {/* restful 방식, get */}
        <ListGroup.Item as={Link} to={'/users/5'} >UserDetail</ListGroup.Item> {/* li */}
        <ListGroup.Item as={Link} to={'/life'} >LifeCycle</ListGroup.Item> {/* li */}
        <ListGroup.Item as={Link} to={'/hook1'} >useEffect Hook</ListGroup.Item> {/* li */}
        <ListGroup.Item as={Link} to={'/clock'} >Clock</ListGroup.Item> {/* li */}
        <ListGroup.Item as={Link} to={'/hook2'} >useRef</ListGroup.Item> {/* li */}
        <ListGroup.Item as={Link} to={'/app2'} >Props Drill</ListGroup.Item> {/* li */}
        <ListGroup.Item as={Link} to={'/hook3'} >Context Api</ListGroup.Item> {/* li */}
        <ListGroup.Item as={Link} to={'/hook4'} >useContext Hook</ListGroup.Item> {/* li */}
        <ListGroup.Item as={Link} to={'/ajax1/5'} >Rest Api1(user)</ListGroup.Item>
        <ListGroup.Item as={Link} to={'/ajax2?page=1&per_page=3'} >Rest Api1(userList)</ListGroup.Item>
        <ListGroup.Item as={Link} to={'/ajax3'} >오늘의 날씨</ListGroup.Item>
      </ListGroup>
    </Stack>
  );
}
