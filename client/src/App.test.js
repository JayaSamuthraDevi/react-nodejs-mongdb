import React from 'react';
import { render, fireEvent, waitFor,  getByTestId, getByDisplayValue} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter ,MemoryRouter,Router} from 'react-router-dom';  // Import BrowserRouter
import AddUser from './components/AddUser';
import Records from './components/Records';
import { createMemoryHistory } from 'history';

describe('AddUser Component', () => {
  it('should render correctly', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );
    
    // ... Rest of your test remains the same


 
    
    // You can use these queries to assert that your component renders as expected
    expect(getByText('First Name')).toBeInTheDocument();
    expect(getByText('Last Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Date Of Birth')).toBeInTheDocument();
    expect(getByText('Mobile')).toBeInTheDocument();
    expect(getByText('Address...')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();




    
  });



  it('should handle form submission', async () => {

    const alertSpy = jest.spyOn(window, 'alert');

    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );
    // Fill in form fields
    fireEvent.change(getByTestId('input-fname'), { target: { value: 'John' } });
    fireEvent.change(getByTestId('input-lname'), { target: { value: 'Doe' } });
    fireEvent.change(getByTestId('input-email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByTestId('input-dob'), { target: { value: '1990-01-01' } });
    fireEvent.change(getByTestId('input-mobile'), { target: { value: '98gkjk9761' } });
    fireEvent.change(getByTestId('input-address'), { target: { value: '123 Main St' } });


     // Spy on the window.alert function
    
    // Submit the form
    fireEvent.click(getByText('Submit'));

   
   
  });

//   // You can add more test cases to cover different scenarios and edge cases
describe('Records Component', () => {
  it('should redirect to "/" after clicking Add button', async () => {
    const history = createMemoryHistory(); // Create a memory history object

    const { getByText } = render(
      <BrowserRouter history={history}> {/* Use Router */}
        <Records />
      </BrowserRouter>
    );
    
    

    // Trigger a successful form submission action
    fireEvent.click(getByText('Add'));

    // Wait for the redirect to occur
    await waitFor(() => {
      // Check if the current route is "/getUsers"
      expect(history.location.pathname).toBe('/');
    });
  });

  // Add more test cases as needed
});




});
