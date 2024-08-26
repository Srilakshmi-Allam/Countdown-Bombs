import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

jest.useFakeTimers();

describe('Timebomb App', () => {
  test('renders Explode button initially', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Explode/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders all bombs with initial time left', () => {
    render(<App />);
    const bombElements = screen.getAllByText(/Time left:/i);
    expect(bombElements.length).toBe(4);
  });

  test('starts countdown when Explode button is clicked', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Explode/i);
    
    // Simulate button click
    fireEvent.click(buttonElement);

    // Fast-forward time to see countdown progress
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const bombElements = screen.getAllByText(/Time left:/i);
    expect(bombElements.length).toBe(4);
  });

  test('updates time left every second', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Explode/i);
    
    // Start countdown
    fireEvent.click(buttonElement);

    // Fast-forward 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const bombElements = screen.getAllByText(/Time left:/i);
    expect(bombElements.length).toBe(4);
  });

 

  test('button text changes to "Waiting to explode..." after starting', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Explode/i);
    
    // Start countdown
    fireEvent.click(buttonElement);
    
    expect(buttonElement).toHaveTextContent('Waiting to explode...');
  });
});
