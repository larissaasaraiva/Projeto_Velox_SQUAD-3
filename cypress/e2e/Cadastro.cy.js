describe('Cadastro com e-mail já existente', () => {

  it('Deve exibir erro ao tentar cadastrar com e-mail já cadastrado', () => {
    cy.visit('https://www.veloxtickets.com/Portal/Cadastre-se?ReturnUrl=%2FPortal%2FIngresso%2FCinema%2FSao-Paulo');

    cy.get('#FullName').type('Lorena Santos');
    cy.get('#CPF').type('04775037480'); 
    cy.get('#BirthDate').type('17-04-1989'); 
    cy.get('#Email').type('carolalbdid@gmail.com');
    cy.get('#ConfirmEmail').type('carolalbdid@gmail.com');
    cy.get('#Password').type('X123456m#cdk');
    cy.get('#ConfirmPassword').type('X123456m#cdk');
    cy.get('#TermsCheckBox').click()
    cy.get('#btnRegister').click();

    cy.get('#Email').should('have.css', 'border-color', 'rgb(169, 68, 66)');
    cy.get('.field-validation-error')
     .should('contain.text', 'E-mail c********d@gmail.com já cadastrado usando o CPF 008********-48.')
     .and('have.css', 'color', 'rgb(169, 68, 66)');

    cy.get('.alert > p').should('be.visible')
     .and('contain.text', 'E-mail c********d@gmail.com já cadastrado usando o CPF 008********-48.')
     .and('have.css', 'color', 'rgb(169, 68, 66)');
   
  });
});


describe('Cadastro com e-mail inválido', () => {

  it.only('Deve exibir erro ao tentar cadastrar com e-mail inválido', () => {
    cy.visit('https://www.veloxtickets.com/Portal/Cadastre-se?ReturnUrl=%2FPortal%2FIngresso%2FCinema%2FSao-Paulo');

    cy.get('#FullName').type('Caroline Albuquerque Didoné');
    cy.get('#CPF').type('00883717948');
    cy.get('#BirthDate').type('17-01-1989');
    cy.get('#Email').type('caroline@.com');
    cy.get('#ConfirmEmail').type('caroline@.com');
    cy.get('#Password').type('X123456m#cdk');
    cy.get('#ConfirmPassword').type('X123456m#cdk');
    cy.get('#TermsCheckBox').click()
    cy.get('#btnRegister').click();

    cy.get('#Email').should('have.css', 'border-color', 'rgb(169, 68, 66)');
    cy.get('#Email-error').should('contain.text', 'Informe seu e-mail corretamente.')
     .and('have.css', 'color', 'rgb(169, 68, 66)');
    cy.get('#ConfirmEmail').should('have.css', 'border-color', 'rgb(169, 68, 66)');
    cy.get('#ConfirmEmail-error').should('contain.text', 'Informe seu e-mail corretamente.')
     .and('have.css', 'color', 'rgb(169, 68, 66)');

     
  });
});
