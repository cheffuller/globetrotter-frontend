import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

describe('App Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<App />);
  };

  test('renders Login link at root URL', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders Register page at login URL', () => {
    window.history.pushState({}, 'Login', '/login');
    renderWithProviders(<App />);

    const registerButtons = screen.getAllByText(/register/i);

    expect(registerButtons).toHaveLength(2);
    expect(registerButtons[0]).toBeInTheDocument();
    expect(registerButtons[1]).toBeInTheDocument();
  });

  test('renders Login page at login URL', () => {
    window.history.pushState({}, 'Login', '/login');
    renderWithProviders(<App />);

    const loginElements = screen.getAllByText(/login/i);

    expect(loginElements.length).toBeGreaterThan(0);
    expect(loginElements[0]).toBeInTheDocument();
  });
});

test('renders Globetrotter link element', () => {
  window.history.pushState({}, 'Login', '/login');
  render(<App />);
  const linkElement = screen.getByText(/Globetrotter/i);
  expect(linkElement).toBeInTheDocument();
});
