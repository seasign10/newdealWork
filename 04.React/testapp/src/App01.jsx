import JsxEx1 from './example/JsxEx01';
// import JsxEx1모듈에서 GetBrand, GetOs 컴포넌트를 import
import {GetBrand, GetOS} from './example/JsxEx02';

import MyLang from './example/JsxEx03';
import { GetPet } from './example/JsxEx03';

function App(){
	const mystyle = {
		color: 'blue',
		textAlign: 'center'	
	}
	return (
		<div>
			<h1 style={mystyle}>App</h1>
			<JsxEx1></JsxEx1>
			<hr />
			<GetBrand />
			<GetOS />
			<hr />
			<MyLang></MyLang>
			<GetPet></GetPet>
		</div>
	)
}

// App 함수를 외부에서 사용할 수 있도록 export
export default App;