import React from "react";
import HomeCarousel from "./HomeCarousel";

const carouselImages = require.context(
  '../../travel-images/carousel-images',
  false
);

const carouselImageList = carouselImages.keys().map((image: any) => carouselImages(image));

const HomeCarouselManagement = () => {

  return (
    <>
      <HomeCarousel carouselImageList={carouselImageList} />
    </>
  );
};

export default HomeCarouselManagement;
