import React from 'react'
import { useState } from 'react'
import hippoImage from '../gallery/hippo.jpeg'
import elephImage from '../gallery/eleph.jpeg'
import rinoImage from '../gallery/rhino.jpg'

export default function OurGallery() {

    const images = [hippoImage, elephImage, rinoImage];
    // images 배열에서 현재 보여줄 인덱스 번호를 state로 관리
    const [currentIdx, setCurrentIdx] = useState(0);

    const btn = (e) => {
        let cnt = currentIdx;
        if(e.target.innerText == 'Next'){
            cnt++;
            console.log(`${cnt} : ${images.length}`);
            if(cnt==images.length){
                cnt=0;
            }
        }else{ // Prev
            cnt--;
            if(cnt<0){
                cnt=images.length-1;
            }
        }
        setCurrentIdx(cnt);
    }
    return (
        <div className="container">
        <div className="row">
            <div className="col">
                <img style={{height:'300px'}} src={images[currentIdx]} alt="animal" />
                <br />
                <button onClick={btn} className='btn btn-outline-success m-3'>Prev</button>
                {currentIdx+1} / {images.length}
                <button onClick={btn} className='btn btn-outline-danger m-3'>Next</button>
            </div>
        </div>
        </div>
    )
}
