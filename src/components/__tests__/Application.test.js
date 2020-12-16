import React from "react";
import { render, cleanup, fireEvent, waitForElement, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe('Application', () => {

  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    // Render the application and destructure getByText
    const { getByText } = render(<Application />);
    // Wait for mock axios call to resolve, check 'Monday' is displayed
    await waitForElement(() => getByText("Monday"))
    // Click 'Tuesday' and check that data for Tuesday is displayed
    fireEvent.click(getByText('Tuesday'));
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });
  
  
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
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Ida Boomtick'}});
    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, 'Ida Boomtick'));
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, 'day').find(item => 
      queryByText(item, /monday/i)
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument()
  });

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
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // Wait until the element with the "Add" button/image is displayed.
    await waitForElement(() => getByAltText(appointment, /add/i));
    // Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find(item => 
      queryByText(item, /monday/i)
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument()
  });

  // it('loads data, edits an interview and keeps the spots remaining for Monday the same', () => {
  //   // Render the Application.
  //   const { container } = render(<Application />);
  //   // Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, 'Archie Cohen'));
  // });

  it('shows the save error when failing to save an appointment', () => {
    render(<Application />)
  });

  it('shows the delete error when failing to delete an existing appointment', () => {
    render(<Application />)
  });

})



