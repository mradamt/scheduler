import React from 'react';
import { render, cleanup, fireEvent, getByPlaceholderText, queryByPlaceholderText } from '@testing-library/react';
import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ]

  
  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    )
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('')
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name='Lydia Miller-Jones' />
    )
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    )
    fireEvent.click(getByText('Save'));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    // Set mock function
    const onSave = jest.fn();
    // Render Form with no value
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    // Try to save, check error message appears
    fireEvent.click(getByText("Save"));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    // Add a value to the form, click save again
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {target: {value: 'Ida Boomtick'}});
    fireEvent.click(getByText("Save"));
    // Check error message is cleared and the form was submitted with value added by user
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Ida Boomtick", null);
  });
  
  it("calls onCancel and resets the input field", () => {
    // Mock functions
    const onSave = jest.fn();
    const onCancel = jest.fn();
    // Render Form with no value
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} onCancel={onCancel}/>
    );
    // Try to save, check error message appears
    fireEvent.click(getByText("Save"));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    // Add a value to the form, simply so it's no longer blank
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {target: {value: 'Ida Boomtick'}});
    // Click cancel, check the error message and input value have been cleared
    fireEvent.click(getByText("Cancel"));
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
    expect(onCancel).toHaveBeenCalledTimes(1);
  })
  
})