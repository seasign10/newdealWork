import React from 'react' // rfc
import {useState} from 'react';
import {images} from '../data/imageData';

export default function YourGallery() {
    const [imgs, setImages] = useState(images)
    return (
    <ul className='row'>
        {
            imgs.map((img, idx)=>{
                return(
                <li className='card m-3 col p-0 text-center' style={{minWidth:'400px', width:'400px'}}>
                    <img className='card-img-top' src={img.src} alt={img.alt} style={{height:'500px', width:'100%'}} />
                    <div className='card-body'>
                        <h4 className='card-title'>{img.title}</h4>
                        <p className='card-text'>Some example text.</p>
                        <a href='#' className='btn btn-primary'>See Profile</a>
                    </div>
                </li>

                )
            })
        }
    </ul>
  )
}
