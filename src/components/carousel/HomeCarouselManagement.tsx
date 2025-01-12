import React from "react";
import HomeCarousel from "./HomeCarousel";
import image1 from '../../travel-images/carousel-images/anders-jilden-cYrMQA7a3Wc-unsplash.jpg'
import image2 from '../../travel-images/carousel-images/diego-jimenez-A-NVHPka9Rk-unsplash.jpg'
import image3 from '../../travel-images/carousel-images/neom-STV2s3FYw7Y-unsplash.jpg'
import image4 from '../../travel-images/carousel-images/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg'
import image5 from '../../travel-images/carousel-images/robin-noguier-sydwCr54rf0-unsplash.jpg'

const carouselImageList = [image1, image2, image3, image4, image5];

const HomeCarouselManagement = () => {

  return (
    <>
      <HomeCarousel carouselImageList={carouselImageList} />
    </>
  );
};

export default HomeCarouselManagement;
