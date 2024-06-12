import React from 'react'
import { useState } from 'react'
import hippoImage from '../gallery/hippo.jpeg'
import elephImage from '../gallery/eleph.jpeg'
import rinoImage from '../gallery/rhino.jpg'

export default function DinamicImage() {

    const [animal, setAnimal] = useState('');

    const handleChange = (e) => {
        // alert(e.target.value);
        let imgSrc = e.target.value;
        setAnimal(imgSrc);
    }

  return (
    <div className='p-5 container'>
      <h2 className='pb-3'>동적인 이미지 처리</h2>
      <div className="row">
        <div className="col">
            <select onChange={handleChange} value={animal} className='form-control' name="" id="">
                <option value="choice" selected>좋아하는 동물</option>
                <option value="hippo">Hippo</option>
                <option value="eleph">Eleph</option>
                <option value="rhino">Rhino</option>
            </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center">
            <img 
            style={{maxWidth: '500px',width:'80%', borderRadius:'10px'}} 
            src={
                animal==='rhino' ? rinoImage : animal==='eleph' ? elephImage : hippoImage
            }
            alt="img1" />
        </div>
      </div>
    </div>
  )
}
