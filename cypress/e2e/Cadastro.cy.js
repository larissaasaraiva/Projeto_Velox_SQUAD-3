describe('Cadastro com e-mail já existente', () => {
  it('Deve exibir erro ao tentar cadastrar com e-mail já cadastrado', () => {
    cy.visit('https://www.veloxtickets.com/Portal/Cadastre-se?ReturnUrl=%2FPortal%2FIngresso%2FCinema%2FSao-Paulo');

    cy.get('#FullName').type('Lorena Santos');
    cy.get('#CPF').type('04775037480'); // sem pontuação
    cy.get('#BirthDate').type('17-04-1989'); // formato tipo input date
    cy.get('#Email').type('carolalbdid@gmail.com');
    cy.get('#Password').type('X123456m#cdk', { parseSpecialCharSequences: false });

    cy.contains('button', 'Cadastrar').click();

    // Valida a mensagem de erro
    cy.get('.alert.alert-danger.serverError').contains('E-mail c********d@gmail.com já cadastrado usando o CPF 008********-48.')
  });
});


describe('Cadastro com e-mail inválido', () => {
  it('Deve exibir erro ao tentar cadastrar com e-mail inválido', () => {
    cy.visit('https://www.veloxtickets.com/Portal/Cadastre-se?ReturnUrl=%2FPortal%2FIngresso%2FCinema%2FSao-Paulo');

    cy.get('#FullName').type('Caroline Albuquerque Didoné');
    cy.get('#CPF').type('00883717948');
    cy.get('#BirthDate').type('17-01-1989');
    cy.get('#Email').type('caroline@.com');
    cy.get('#Password').type('X123456m#cdk, { parseSpecialCharSequences: false }');

    cy.contains('button', 'Cadastrar').click();

    // Valida a mensagem de erro ao lado do campo de e-mail
    cy.get('#Email-error').contains('');
  });
});
