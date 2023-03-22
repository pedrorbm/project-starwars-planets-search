import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import data from '../../cypress/mocks/testData';

describe('Teste inputName',() => {
    beforeEach(async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
          json: () => data,
        }));
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });

    it('Testando inputName',async  () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getAllByTestId('planet-name')).toHaveLength(10)
      }, {timeout:4000})
      const inputName = screen.getByTestId('name-filter')
      expect(inputName).toBeInTheDocument();

      userEvent.type(inputName, 'Tatooine');
      expect(inputName).toHaveValue('Tatooine')
      expect(screen.getAllByTestId('planet-name')).toHaveLength(1)
    });
  })