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

  });

  it('should render with given state from Redux store', () => {
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

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('confirm button should be disabled if form is not valid', () => {

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

    const btn = component.root.findAllByType('button')

    expect(btn[0].props.disabled).toEqual(true);
  });

  it('confirm button should be active if form is not valid', () => {

    store = mockStore({
      form: {
        firstName: {
          value: 'test',
          error: 'not touched'
        },
        lastName: {
          value: 'test',
          error: 'not touched'
        },
        age: {
          value: 'test',
          error: 'not touched'
        },
        returnDate: {
          value: '2020-03-18T12:18',
          error: 'not touched'
        },
        isFormValid: true
      }
    });

    component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Estimations />
        </MemoryRouter>
      </Provider>
    );

    const btn = component.root.findAllByType('button')

    expect(btn[0].props.disabled).toEqual(false);
  });
});