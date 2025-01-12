import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditTravelPlanPage from './EditTravelPlanPage';
import { BrowserRouter } from 'react-router';
import { TravelPlanContext } from '../../components/travelplan/TravelPlanContext';
import { useAuth } from '../../common/AuthContext';
import {
  deleteTravelPlan,
  getTravelPlan,
  getTravelPlanLocations,
  updateTravelPlan,
  updateTravelPlanLocation,
} from '../../components/travelplan/TravelPlanService';
import { NotFoundError, BadRequestError, ForbiddenError } from '../../errors/HttpErrors';

jest.mock('../../components/travelplan/TravelPlanService');
jest.mock('../../common/AuthContext');
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('EditTravelPlanPage Component', () => {
  const mockTravelPlan = {
    id: 1,
    accountId: 1,
    isFavorited: false,
    isPublished: false,
  };

  const mockLocations = [
    {
      id: 1,
      city: 'City1',
      country: 'Country1',
      startDate: '2023-01-01',
      endDate: '2023-01-10',
    },
  ];

  const mockSetTravelPlan = jest.fn();
  const mockClearTravelPlan = jest.fn();
  const mockSetLocations = jest.fn();
  const mockAddNewLocation = jest.fn();
  const mockRemoveLocation = jest.fn();
  const mockUpdateLocationField = jest.fn();
  const mockValidateLocations = jest.fn().mockReturnValue(true);
  const mockNavigate = jest.fn();
  const mockLogout = jest.fn();

  const mockContextValue = {
    travelPlan: mockTravelPlan,
    setTravelPlan: mockSetTravelPlan,
    clearTravelPlan: mockClearTravelPlan,
    locations: mockLocations,
    setLocations: mockSetLocations,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
    (require('react-router').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders travel plan form correctly', async () => {
    (getTravelPlan as jest.Mock).mockResolvedValue(mockTravelPlan);
    (getTravelPlanLocations as jest.Mock).mockResolvedValue(mockLocations);

    render(
      <BrowserRouter>
        <TravelPlanContext.Provider value={mockContextValue}>
          <EditTravelPlanPage />
        </TravelPlanContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockSetTravelPlan).toHaveBeenCalledWith(mockTravelPlan);
    });

    expect(screen.getByText('Edit your Travel Plan')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter city')).toHaveValue('City1');
    expect(screen.getByPlaceholderText('Enter country')).toHaveValue('Country1');
    expect(screen.getByDisplayValue('2023-01-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-01-10')).toBeInTheDocument();
  });

  it('adds a new location', () => {
    render(
      <BrowserRouter>
        <TravelPlanContext.Provider value={mockContextValue}>
          <EditTravelPlanPage />
        </TravelPlanContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Add Location'));
    const locationElements = screen.getAllByText(/location/i);

    expect(locationElements.length).toBeGreaterThan(0);
  });
})