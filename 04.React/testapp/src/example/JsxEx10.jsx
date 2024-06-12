import {images} from '../data/imageData';
import {useState} from 'react';

export default function MyImageGallery(){
    const [imgs, setImages] = useState(images);

    return (
        <div>
            <h1>My Image Gallery</h1>
            <ul>
                {
                    imgs.map((img, idx)=>{
                        return (
                            <li key={idx}>
                                <img src={img.src} alt={img.alt} />
                                <h5>{img.title}</h5>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}