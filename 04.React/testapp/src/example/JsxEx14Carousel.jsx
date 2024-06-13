import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import { images } from '../data/imageData';

export default function MyCarousel() {
  return (
    <Row>
      <Col>
        <Carousel>
          {images.map((img, idx) => {
            return (
              <Carousel.Item>
                <img
                  style={{ height: '500px', width: '800px' }}
                  src={img.src}
                  alt={img.alt}
                />
                <Carousel.Caption>
                  <h3>{img.title}</h3>
                  <p>Context</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Col>
    </Row>
  );
}
