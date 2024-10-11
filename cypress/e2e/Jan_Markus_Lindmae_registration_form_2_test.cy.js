beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('tester')
        cy.get('#email').type('Test@email.com')
        cy.get('input[name="name"]').type('first')
        cy.get('input[name="lastName"]').type('last')
        cy.get('input[data-testid="phoneNumberTestId"]').type('12334567')
        cy.get('input[name="password"]').type('VerySecurePassword!')
        cy.get('[name="confirm"]').type('VerySecurePasword!')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')
        cy.get('input[name="password"]').clear().type('VerySecurePassword!')
        cy.get('[name="confirm"]').clear().type('VerySecurePassword!')
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
        //Mandatory fields
        cy.get('#username').type('tester')
        cy.get('#email').type('Test@email.com')
        cy.get('input[name="name"]').type('first')
        cy.get('input[name="lastName"]').type('last')
        cy.get('input[data-testid="phoneNumberTestId"]').type('12334567')
        cy.get('input[name="password"]').type('VerySecurePassword!')
        cy.get('[name="confirm"]').type('VerySecurePassword!')

        //Other fields
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle2').click()
        cy.get('#cars').select('saab')
        cy.get('#animal').select('mouse')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type('tester')
        cy.get('#email').type('test@email.com')
        cy.get('input[name="name"]').type('first')
        cy.get('input[name="lastName"]').type('last')
        cy.get('input[data-testid="phoneNumberTestId"]').type('12334567')
        cy.get('input[name="password"]').type('VerySecurePassword!')
        cy.get('[name="confirm"]').type('VerySecurePassword!')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User cannot submit form with username field missing', ()=>{
        cy.get('#username').type('tester')
        cy.get('#email').type('test@email.com')
        cy.get('input[name="name"]').type('first')
        cy.get('input[name="lastName"]').type('last')
        cy.get('input[data-testid="phoneNumberTestId"]').type('12334567')
        cy.get('input[name="password"]').type('VerySecurePassword!')
        cy.get('[name="confirm"]').type('VerySecurePassword!')
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('.error_message').should('be.visible')
        cy.get('#success_message').should('not.be.visible')       
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        cy.log('Will check second logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100)
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    }) 

    it('Check second navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

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

    it('Check that checkbox list is correct', () => {
        //Array of checkboxes has 3 elements
        cy.get('input[type="checkbox"]').should('have.length', 3)

        //verify labels of checkboxes
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        //verify default state of checkboxes
        cy.get('input[type="checkbox"]').next().eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('not.be.checked')

        //check the checkboxes and assert that both checkboxes stay checked. 
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

    });

    it('Car dropdown is correct', () => {

        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

    });
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}