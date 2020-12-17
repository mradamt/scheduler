

describe('Appointments', () => {

  beforeEach(() => {
    // Resets the database
    cy.request('GET', '/api/debug/reset')
    // Visits the root of our web server
    cy.visit('/');
    // Ensure page is fully loaded and 'Monday' is displayed
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    // Clicks on the "Add" button in the second appointment
    cy.get('[alt=Add]')
      .first()
      .click()
    // Enters their name
    cy.get('[data-testid=student-name-input]')
      .type('Ida Boomtick')
    // Chooses an interviewer
    cy.get('[alt="Sylvia Palmer"]')
      .click()
    // Clicks the save button
    cy.contains('Save')
      .click()
    // Sees the booked appointment
    cy.contains('.appointment__card--show', 'Ida Boomtick')
    cy.contains('.appointment__card--show', 'Sylvia Palmer')
  })

  it('should edit an interview', () => {
    // (Force) clicks on the "Edit" button in the first appointment
    cy.get('[alt=Edit]').first().click({force: true})
  // Changes the name and interviewer
    cy.get('[data-testid=student-name-input]').clear().type('Ida Boomtick')
    cy.get('[alt="Tori Malcolm"]').click()
    // Clicks the save button
    cy.contains('Save').click()
    // Sees the edit to the appointment
    cy.contains('.appointment__card--show', 'Ida Boomtick')
    cy.contains('.appointment__card--show', 'Tori Malcolm')
  })

  it('should delete an interview', () => {
    // (Force) the delete button for the existing appointment
    cy.get('[alt=Delete]').first().click({force: true})
    // Clicks the confirm button
    cy.contains('Confirm').click()
    // Sees that the appointment slot is empty
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist')
  })

})