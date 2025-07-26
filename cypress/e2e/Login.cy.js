const Login = {
  válido: { 
    email: 'tester_costumer01@qa.team', 
    senha: 'FqCpZR7x91'
},
  
  inválido: {
    email: 'testE874@gmail.com', 
    senha: 'teste124@'
  }
};


describe('Teste de Login', () => {

 beforeEach(() => {

   cy.visit('https://www.veloxtickets.com/');
   cy.get('.info > #locationConfirmed').click();
   cy.get('.content > .button > .btn').click();
   cy.get('#LoginLink').click();
  });

  it(' Login com credenciais válidas', () => {
   
   cy.get('#Email').type(Login.válido.email);
   cy.get('#Password').type(Login.válido.senha);
   cy.get('#btnLogin').click();
   cy.wait(5000);
   cy.get('#modalTwoFactor > .modal-dialog > .modal-content > .modal-header > .modal-title > h4').contains('Confirmar Identidade')
  });


  it(' Login com credenciais inválidas', () => {
   
   cy.get('#Email').type(Login.inválido.email);
   cy.get('#Password').type(Login.inválido.senha);
   cy.get('#btnLogin').click();
   cy.wait(5000);
   cy.get('.alert > p')
      .should('be.visible')
      .and('contain.text', 'Dados incorretos');
    
  });

  it(' Login com campo de email vazio e senha válida', () => {
   
   cy.get('#Email').type(' ');
   cy.get('#Password').type(Login.válido.senha);
   cy.get('#btnLogin').click();
   cy.get('#Email').should('have.css', 'border-color', 'rgb(169, 68, 66)');
   cy.get('.field-validation-error').should('contain.text', 'Informe seu E-mail ou CPF').and('have.css', 'color', 'rgb(169, 68, 66)');
   
    
  });


  it(' Login com campo de senha vazio e email válido', () => {
   
  
   cy.get('#Email').type(Login.válido.email);
   cy.get('#Password').type(' ');
   cy.get('#btnLogin').click();
   cy.get('#Password').should('have.css', 'border-color', 'rgb(169, 68, 66)');
   cy.get('.field-validation-error').should('contain.text', 'Informe sua Senha corretamente').and('have.css', 'color', 'rgb(169, 68, 66)');

  });







});
