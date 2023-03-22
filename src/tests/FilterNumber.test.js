import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import data from '../../cypress/mocks/testData';

describe('Teste inputNumber',() => {
    beforeEach(async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
          json: () => data,
        }));
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });

    it('Testando inputNumber',async  () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getAllByTestId('planet-name')).toHaveLength(10)
      }, {timeout:4000})
      
      const filterTag = screen.getByTestId('column-filter')
      const filterCondition = screen.getByTestId('comparison-filter')
      const filterNumber = screen.getByTestId('value-filter')

      userEvent.selectOptions(filterTag, 'surface_water')
      userEvent.selectOptions(filterCondition, 'igual a')
      userEvent.type(filterNumber, '8')
      userEvent.click(screen.getByTestId('button-filter'))
      userEvent.selectOptions(filterTag, 'diameter')
      userEvent.selectOptions(filterCondition, 'maior que')
      userEvent.type(filterNumber, '123')
      userEvent.click(screen.getByTestId('button-filter'))
      userEvent.selectOptions(filterTag, 'population')
      userEvent.selectOptions(filterCondition, 'menor que')
      userEvent.type(filterNumber, '6000000')
      userEvent.click(screen.getByTestId('button-filter'))

      expect(screen.getAllByTestId('planet-name')).toHaveLength(1)

      const filters = screen.getAllByTestId('filter')
      expect(filters).toHaveLength(3)

      const remove = screen.getAllByTestId('btn-remove')[0]
      userEvent.click(remove)
      await waitFor(() => {
        expect(screen.getAllByTestId('filter')).toHaveLength(2)
      })

      userEvent.click(screen.getByTestId('button-remove-filters'))
      await waitFor(() => {
        expect(screen.queryAllByTestId('filter')).toHaveLength(0)
      })
    });
  })