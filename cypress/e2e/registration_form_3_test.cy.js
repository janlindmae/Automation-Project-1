beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

describe ('Section 1: visual tests)', () => {

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        
         // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

})
    it('Country dropdown is correct', () => {
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
    
})
    it('Checks child dropdown based on parent option', () => {
        cy.get('#country').select('Spain')
        cy.get('#city').should('be.visible')
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')
        cy.get('#city').select('Malaga')
        cy.get('#country').select('Estonia')
        cy.get('#city').should('not.have.value', 'Malaga')
  });
    it('Check checkboxes and links', () => {
        cy.get('input[type="checkbox"]').eq(0).check()
        cy.get('input[type="checkbox"]').eq(1).check()
        cy.get('div').contains('Accept our privacy policy').should('be.visible')
        cy.get('a').should('contain', 'Accept our cookie policy')
        cy.get('a').should('have.attr', 'href', 'cookiePolicy.html')
        cy.get('a').click()
        cy.url().should('include', '/cookiePolicy.html')
        cy.go('back')
        cy.url().should('include', '/registration_form_3.html')
    });
    it('Check e-mail format', () => {
        cy.get('input[type="email"]').type('text')
        cy.get('#emailAlert span:eq(2)').should('be.visible').should('have.text', 'Invalid email address.')
        cy.get('input[type="email"]').type('text@email.com')
        cy.get('#emailAlert span:eq(2)').should('not.be.visible')
        cy.get('input[type="email"]').clear()
        cy.get('#emailAlert span:eq(1)').should('be.visible').should('have.text', 'Email is required.')

    });


})



/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!) */

describe('Functional tests for registration form 3', () => {
    it('Check that all fields can be filled in', () => {
        cy.get('#name').type('Tester')
        cy.get('input[type="email"]').type('text@email.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select("Tallinn")
        cy.get('input[type="date"]').eq(0).click().type('2024-10-11') 
            cy.get('input[type="date"]').eq(0).should('have.value', '2024-10-11');
        cy.get('input[type="radio"]').eq(2).check()
        cy.get('input[type="date"]').eq(1).click().type('1900-10-11') 
            cy.get('input[type="date"]').eq(1).should('have.value', '1900-10-11');
        cy.get('input[type="checkbox"]').eq(0).check()
        cy.get('input[type="checkbox"]').eq(1).check()
        cy.get('input[type="submit"]').should('be.enabled')
        //cy.get('input[type="submit"]').click()


    });

    it('Check what happens when mandatory fields are missing', () => {
        inputValidData('username')
        cy.get('input[type="email"').clear()
        cy.get('#emailAlert span:eq(1)').should('be.visible').should('have.text', 'Email is required.')
        cy.get('input[type="submit"]').should('not.be.enabled')
    });

    /*it.only('Check file upload functionality', () => {
        cy.fixture('upload_file.html').then((content)) => {
            // Create a Blob object from the HTML content
            const blob = new Blob([content], { type: 'text/html' })
          
            // Trigger the file input element
            cy.get('input[type="file"]').trigger('change', { force: true }, { files: [new File([blob], 'upload_file.html')] })
          }
    })*/ //couldn't figure this out...
   


});

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[type="email"]').type('text@email.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select("Tallinn")
    cy.get('input[type="checkbox"]').eq(0).check()
}