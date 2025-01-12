import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import TravelPlanCardManagement from './TravelPlanCardManagement';
import { API_ROOT_URL } from '../../consts/ApiUrl';
import { JWT_TOKEN } from '../../consts/JwtConst';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';
import { BrowserRouter } from 'react-router';
import { TravelPlanContext } from '../travelplan/TravelPlanContext';
import { fetchWeatherData } from '../APIComponents/GetWeather';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../APIComponents/GetWeather');
const mockedFetchWeatherData = fetchWeatherData as jest.MockedFunction<
  typeof fetchWeatherData
>;

const mockTravelPlanContextValue = {
  travelPlan: { id: 5, accountId: 1, isFavorited: false, isPublished: true },
  setTravelPlan: jest.fn(),
  clearTravelPlan: jest.fn(),
};

interface MockTravelPlanProviderProps {
  children: React.ReactNode;
}

const MockTravelPlanProvider: React.FC<MockTravelPlanProviderProps> = ({
  children,
}) => {
  return (
    <TravelPlanContext.Provider value={mockTravelPlanContextValue}>
      {children}
    </TravelPlanContext.Provider>
  );
};

describe('TravelPlanCardManagement Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays travel plans', async () => {
    const mockTravelPlans: TravelPlanDetail[] = [
      {
        id: 5,
        accountId: 1,
        isFavorited: false,
        isPublished: true,
        post: {
          id: 5,
          timestamp: new Date('2019-01-01T06:00:00.000+00:00'),
          travelPlanId: 5,
          username: 'john_doe',
          numberOfLikes: 1,
          comments: [],
          locations: [
            {
              id: 5,
              city: 'Rio de Janeiro',
              country: 'Brazil',
              endDate: new Date('2022-05-25'),
              startDate: new Date('2022-05-18'),
              travelPlanId: 5,
            },
          ],
        },
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockTravelPlans });

    const mockWeatherData = {
      weatherCode: [0],
      averageMax: 30,
      averageMin: 20,
      rain: 0,
      snowfall: 0,
    };

    mockedFetchWeatherData.mockResolvedValueOnce(mockWeatherData);

    render(
      <BrowserRouter>
        <MockTravelPlanProvider>
          <TravelPlanCardManagement />
        </MockTravelPlanProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
    expect(mockedAxios.get).toHaveBeenCalledWith(
        `${API_ROOT_URL}plans/recent/10`
      );
    })
  });

  it('removes JWT token from localStorage on fetch error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    render(
      <MockTravelPlanProvider>
        <TravelPlanCardManagement />
      </MockTravelPlanProvider>
    );

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${API_ROOT_URL}plans/recent/10`
      );
      expect(removeItemSpy).toHaveBeenCalledWith(JWT_TOKEN);
    });

    removeItemSpy.mockRestore();
  });
});
