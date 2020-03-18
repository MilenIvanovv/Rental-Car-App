import React from "react";
import { create } from "react-test-renderer";
import Estimations from './Estimations';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

const mockStore = configureStore([]);

// describe("Estimations component", () => {
//   test("Matches the snapshot", () => {
//     const button = create(<Estimations />);
//     expect(button.toJSON()).toMatchSnapshot();
//   });
// });

describe('My Connected React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      form: {
        firstName: {
          value: '',
          error: 'not touched'
        },
        lastName: {
          value: '',
          error: 'not touched'
        },
        age: {
          value: '',
          error: 'not touched'
        },
        returnDate: {
          value: '2020-03-18T12:18',
          error: 'not touched'
        },
        isFormValid: false
      }
    });

    component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Estimations />
        </MemoryRouter>
      </Provider>
    );

    console.log(component.root.findAllByType('Estimations'))
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('', () => {
    it('should dispatch an action on button click', () => {
    });
  })
});