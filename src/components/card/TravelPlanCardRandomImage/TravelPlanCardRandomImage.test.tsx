import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TravelPlanCardRandomImage from './TravelPlanCardRandomImage';
import image1 from '../../../travel-images/travel-plan-random/alexandre-chambon-aapSemzfsOk-unsplash.jpg';
import image2 from '../../../travel-images/travel-plan-random/anete-lusina-rFKBUwLg_WQ-unsplash.jpg';
import image3 from '../../../travel-images/travel-plan-random/christine-roy-ir5MHI6rPg0-unsplash.jpg';
import image4 from '../../../travel-images/travel-plan-random/erwan-hesry-Q34YB7yjAxA-unsplash.jpg';
import image5 from '../../../travel-images/travel-plan-random/gerrie-van-der-walt-uOc3ldMSAiY-unsplash.jpg';
import image6 from '../../../travel-images/travel-plan-random/ian-dooley-3NCA3tbaE5I-unsplash.jpg';
import image7 from '../../../travel-images/travel-plan-random/mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg';
import image8 from '../../../travel-images/travel-plan-random/philipp-kammerer-6Mxb_mZ_Q8E-unsplash.jpg';
import image9 from '../../../travel-images/travel-plan-random/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg';
import image10 from '../../../travel-images/travel-plan-random/rebe-adelaida-zunQwMy5B6M-unsplash.jpg';
import image11 from '../../../travel-images/travel-plan-random/ross-parmly-rf6ywHVkrlY-unsplash.jpg';
import image12 from '../../../travel-images/travel-plan-random/scott-umstattd--6HgP_ekYC4-unsplash.jpg';
import image13 from '../../../travel-images/travel-plan-random/tom-barrett-M0AWNxnLaMw-unsplash.jpg';
import image14 from '../../../travel-images/travel-plan-random/urban-vintage-VfUN94cUy4o-unsplash.jpg';

const imageList = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
];

describe('TravelPlanCardRandomImage Component', () => {
  it('renders a random image within bounds', () => {
    const { container } = render(<TravelPlanCardRandomImage index={2} />);

    const img = container.querySelector('img');
    expect(imageList).toContain(img?.getAttribute('src'));
  });

  it('renders a random image when index is out of bounds', () => {
    const { container } = render(<TravelPlanCardRandomImage index={20} />);

    const img = container.querySelector('img');
    expect(imageList).toContain(img?.getAttribute('src'));
  });
});
