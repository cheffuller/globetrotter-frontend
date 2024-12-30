import React from 'react';
import { Carousel } from 'react-bootstrap';

type HomeCarouselProps = {
  carouselImageList: string[];
};

const HomeCarousel = ({ carouselImageList }: HomeCarouselProps) => {
  return (
    <>
      <Carousel>
        {carouselImageList.map((image, index) => (
          <Carousel.Item key={index} >
            <img className='d-block w-100' src={image} alt='Travel Two' />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default HomeCarousel;
