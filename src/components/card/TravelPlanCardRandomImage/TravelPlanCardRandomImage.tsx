import React from 'react';
import { Card } from 'react-bootstrap';

declare global {
  interface NodeRequire {
    // A special feature supported by webpack's compiler that allows you to get all matching modules starting from some base directory.
    context: (directory: string, useSubdirectories: boolean) => any;
  }
}

const images = require.context(
  '../../../travel-images/travel-plan-random',
  false
);

const imageList = images.keys().map((image: any) => images(image));

const shuffledImageList = imageList.sort(() => Math.random() - 0.5);

type TravelPlanCardRandomImageProps = {
  index: number;
};

const TravelPlanCardRandomImage = ({
  index,
}: TravelPlanCardRandomImageProps) => {
  if (index <= imageList.length) {
    return <Card.Img variant='top' src={shuffledImageList[index]} />;
  } else {
    const randomImageIndex: number = Math.floor(
      Math.random() * imageList.length
    );
    return <Card.Img variant='top' src={shuffledImageList[randomImageIndex]} />;
  }
};

export default TravelPlanCardRandomImage;
