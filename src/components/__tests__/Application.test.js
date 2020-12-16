import React from "react";
import { render, cleanup, fireEvent, waitForElement, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

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
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0]
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

})



