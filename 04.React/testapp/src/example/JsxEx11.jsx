import React from 'react'; // rfc
import { useState } from 'react';
import { images } from '../data/imageData';

export const YourGallery = () => {
  const [imgs, setImages] = useState(images);

  const addImage = () => {
    let imgSrc = window.prompt(
      '새로 추가할 이미지 경로 입력',
      'images/pic7.jpeg'
    );
    let newTitle = window.prompt('새로 추가할 이미지 제목 입력', 'Hosub Cat');
    if (!imgSrc || !newTitle) {
      return;
    }
    let obj = { src: imgSrc, alt: 'Hosub Cat', title: newTitle };
    // 새로 추가할 객체
    let tmpImgs = [...imgs, obj];
    setImages(tmpImgs);
  };

  const updateImage = (editIdx) => {
    // 새 이미지 경로 입력
    let newSrc = window.prompt('수정할 이미지 경로 입력', 'images/pic8.jpeg');
    
    // 새 타이틀 입력 받기
    let newTitle = window.prompt('수정할 이미지 제목 입력', 'Baby Cat');
    if(!(newSrc && newTitle))return;
    
    // 수정할 객체 만들기
    let data = {src:newSrc, alt:'Baby Cat', title:newTitle};

    // 배열 사본 만들기
    let tmpImgs = [... imgs]; // 배열 사본 만들기

    // 배열 사본의 deitIdx 요소를 수정할 객체로 교체
    tmpImgs[editIdx] = data; // 사본을 이용해서 수정
    
    // setImages(교체된 배열 사본) 함수로 수정된 배열을 반영
    setImages(tmpImgs);
  };

  // 삭제 처리시 : 배열.filter() 함수 활용
  // true를 반환하는 요소들만 모아서 새로운 배열을 만들어 반환
  const deleteImage = (delIdx) => {
    // 사용하지 않을 객체는 _ 처리 (필요한건 정확한 index값 뿐, 이외 이미지의 정보는 삭제시 필요X)
    let tmpImgs = imgs.filter((_, idx)=>{
      // 삭제할 인덱스만 제외하고 모두 모아서 새로운 배열을 만듦
      return delIdx !== idx;
    })
    setImages(tmpImgs);
  };

  return (
    <>
      <div className="row my-3 text-center">
        <div className="col">
          <button onClick={addImage} className="btn btn-success" href="">
            Add image
          </button>
        </div>
      </div>
      <ul className="row my-3">
        {imgs.map((img, idx) => (
          <div className="col my-1">
            <li className="card" style={{ minWidth: '400px' }} key={idx}>
              <img
                className="card-img-top"
                src={img.src}
                alt={img.alt}
                style={{ height: '400px' }}
              />
              <div className="card-body">
                <h4 className="card-title">{img.title}</h4>
                <p className="card-text">Some example text.</p>
                <a href="#" onClick={()=>{
                  updateImage(idx); // idx 값이 있어야 반복문 내의 특정 요소를 수정할 수 있음
                }} className="m-2 btn btn-primary">
                  Update
                </a>
                <a href="#" onClick={()=>{
                  deleteImage(idx); // idx 값이 있어야 반복문 내의 특정 요소를 삭제할 수 있음
                }} className="m-2 btn btn-danger">
                  Delete
                </a>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};
