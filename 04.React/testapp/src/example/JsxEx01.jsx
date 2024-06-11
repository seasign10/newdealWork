function JsxEx1() {
	const mydata = 'Hello React';
	return(
		<div style={{backgroundColor: 'yellow', padding: '1rem'}}>
			<h1>JsxEx1 Component</h1>
			{/* 
				p 태그 안에 mydata를 출력
				p 태그의 배경색은 lightblue
			*/}
			<p style={{backgroundColor: 'lightblue'}}>{mydata}</p>
		</div>
	)
}

export default JsxEx1;