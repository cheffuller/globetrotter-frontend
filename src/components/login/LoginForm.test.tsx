import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LoginForm } from './LoginForm';
import { loginRequest } from './LoginService';
import { useAuth } from '../../common/AuthContext';
import { useNavigate } from 'react-router';
import { ResponseMessage } from '../response-message/ResponseMessage';
import { HttpStatusCode } from 'axios';
import { AccountRole } from '../../enums/AccountRole';
import { HOME_URL } from '../../consts/PageUrls';

jest.mock('./LoginService');
jest.mock('../../common/AuthContext');
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../response-message/ResponseMessage');

describe('LoginForm Component', () => {
  const mockLoginRequest = loginRequest as jest.MockedFunction<typeof loginRequest>;
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
  const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
  const mockResponseMessage = ResponseMessage as jest.MockedFunction<typeof ResponseMessage>;

  const mockStartWaitingForResponse = jest.fn();
  const mockStopWaitingAfterFailure = jest.fn();
  const mockStopWaitingAfterSuccess = jest.fn();
  const mockGetResponseMessage = jest.fn().mockReturnValue(<div></div>);

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
        login: jest.fn(),
        isLoggedIn: false,
        username: '',
        logout: function (): void {
            throw new Error('Function not implemented.');
        }
    });
    mockUseNavigate.mockReturnValue(jest.fn());
    mockResponseMessage.mockReturnValue({
      startWaitingForResponse: mockStartWaitingForResponse,
      stopWaitingAfterFailure: mockStopWaitingAfterFailure,
      stopWaitingAfterSuccess: mockStopWaitingAfterSuccess,
      getResponseMessage: mockGetResponseMessage,
      waitingForResponse: { current: false },
      requestFailed: { current: false },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<LoginForm loginMode={AccountRole.User} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls loginRequest and navigates on successful login', async () => {
    const mockToken = 'mock-jwt-token';
    mockLoginRequest.mockResolvedValueOnce(mockToken);

    const { getByLabelText, getByRole } = render(<LoginForm loginMode={AccountRole.User} />);

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginRequest).toHaveBeenCalledWith({
        accountRole: AccountRole.User,
        username: 'testuser',
        password: 'password123',
      });
      expect(mockStopWaitingAfterSuccess).toHaveBeenCalledWith('Login successful.');
      expect(mockUseAuth().login).toHaveBeenCalledWith(mockToken);
      expect(mockUseNavigate()).toHaveBeenCalledWith(HOME_URL);
    });
  });

  it('displays error message on invalid login credentials', async () => {
    const mockError = { status: HttpStatusCode.Unauthorized };
    mockLoginRequest.mockRejectedValueOnce(mockError);

    const { getByLabelText, getByRole } = render(<LoginForm loginMode={AccountRole.User} />);

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'wronguser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginRequest).toHaveBeenCalledWith({
        accountRole: AccountRole.User,
        username: 'wronguser',
        password: 'wrongpassword',
      });
      expect(mockStopWaitingAfterFailure).toHaveBeenCalledWith('Invalid login credentials.');
    });
  });

  it('displays server unavailable message on server error', async () => {
    const mockError = { status: HttpStatusCode.InternalServerError };
    mockLoginRequest.mockRejectedValueOnce(mockError);

    const { getByLabelText, getByRole } = render(<LoginForm loginMode={AccountRole.User} />);

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginRequest).toHaveBeenCalledWith({
        accountRole: AccountRole.User,
        username: 'testuser',
        password: 'password123',
      });
      expect(mockStopWaitingAfterFailure).toHaveBeenCalledWith('Server is unavailable.');
    });
  });
});