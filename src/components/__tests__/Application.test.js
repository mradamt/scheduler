import React from "react";
import { render, cleanup, fireEvent, waitForElement, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import axios from 'axios';

import Application from "components/Application";

afterEach(cleanup);


describe('Application', () => {
  /* 1 */
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    // Render the application and destructure getByText
    const { getByText } = render(<Application />);
    // Wait for mock axios call to resolve, check 'Monday' is displayed
    await waitForElement(() => getByText("Monday"))
    // Click 'Tuesday' and check that data for Tuesday is displayed
    fireEvent.click(getByText('Tuesday'));
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });
  
  /* 2 */
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    // Render the Application.
    const { container } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // Select 1st (empty) appointment, save as variable
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByAltText(appointment, /add/i)
    );
    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, /add/i));
    // Enter the name "Ida Boomtick" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Ida Boomtick'}});
    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    // Wait until the element with the text "Ida Boomtick" is displayed.
    await waitForElement(() => getByText(appointment, 'Ida Boomtick'));
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, 'day').find(item => 
      queryByText(item, /monday/i)
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument()
  });

  /* 3 */
  it('loads data, deletes an interview and increases the spots remaining for Monday by 1', async () => {
    // Render the Application.
    const { container } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // Select 2nd (booked) appointment, save as variable
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    );
    // Click the "Delete" button on the 2nd (booked) appointment.
    fireEvent.click(getByAltText(appointment, /delete/i));
    // Check that the confirmation message is shown.
    expect(getByText(appointment, /delete the appointment\?/i)).toBeInTheDocument();
    // Click the "Confirm" button on the delete confirmation component.
    fireEvent.click(getByText(appointment, /confirm/i));
    // Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // Wait until the element with the "Add" button/image is displayed.
    await waitForElement(() => getByAltText(appointment, /add/i));
    // Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find(item => 
      queryByText(item, /monday/i)
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument()
  });

  /* 4 */
  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    // Render the Application.
    const { container } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // Select 2nd (booked) appointment, save as variable
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    );
    // Click the "Edit" button on the 2nd (booked) appointment.
    fireEvent.click(getByAltText(appointment, /edit/i));
    // Change the name to "Ida Boomtick" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Ida Boomtick'}});
    // Change interviewer to the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    // Wait until the element with the text "Ida Boomtick" is displayed.
    await waitForElement(() => getByText(appointment, 'Ida Boomtick'));
    // Check that the interviewer has been changed to Sylvia Palmer
    expect(getByText(appointment, 'Sylvia Palmer')).toBeInTheDocument();
    // Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, 'day').find(item => 
      queryByText(item, /monday/i)
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument()
  });

  /* 5 */
  it('shows the save error when failing to save an appointment', async () => {
    // Mock a rejected save operation
    axios.put.mockRejectedValueOnce();

    // Render the Application.
    const { container } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // Select 1st (empty) appointment, save as variable
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByAltText(appointment, /add/i)
    );
    // Test Add-Cancel
    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, /add/i));
    // Click "Cancel" and check if 'Add' button reappears
    fireEvent.click(getByText(appointment, "Cancel"));
    expect(getByAltText(appointment, /add/i)).toBeInTheDocument();
    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, /add/i));
    // Enter a student name and select an interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Ida Boomtick'}});
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // Click the "Save" button on that same appointment (we can assume 'Saving...' works).
    fireEvent.click(getByText(appointment, "Save"));
    // Wait until the element with 'Error' is displayed.
    await waitForElement(() => getByText(appointment, 'Error'))
    // Check that the "Could not save appointment." message is displayed.
    expect(getByText(appointment, 'Could not save appointment.')).toBeInTheDocument();
    // Check that closing the error returns the user to the Edit view.
    fireEvent.click(getByAltText(appointment, 'Close'))
    expect(getByText(appointment, "Save")).toBeInTheDocument();
  });

  /* 6 */
  it('shows the delete error when failing to delete an existing appointment', async () => {
    // Mock a rejected save operation
    axios.delete.mockRejectedValueOnce();

    // Render the Application.
    const { container } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // Select 2nd (booked) appointment, save as variable
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    );
    // Test Delete-Cancel
    // Click the "Delete" button on the 2nd (booked) appointment.
    fireEvent.click(getByAltText(appointment, /delete/i));
    // Click the "Cancel" button to back out of delete.
    fireEvent.click(getByText(appointment, /cancel/i));
    // Check that 'Archie Cohen' is displayed again
    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();
    // Test Delete-Confirm
    // Click the "Delete" button on the 2nd (booked) appointment.
    fireEvent.click(getByAltText(appointment, /delete/i));
    // Click the "Confirm" button on the delete confirmation component.
    fireEvent.click(getByText(appointment, /confirm/i));
    // Wait until the element with 'Error' is displayed.
    await waitForElement(() => getByText(appointment, 'Error'))
    // Check that the "Could not save appointment." message is displayed.
    expect(getByText(appointment, 'Could not delete appointment.')).toBeInTheDocument();
    // Check that closing the error returns the user to the Edit view with 'Archie Cohen' still displayed.
    fireEvent.click(getByAltText(appointment, 'Close'))
    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();
  });

})
