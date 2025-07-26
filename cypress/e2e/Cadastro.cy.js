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
describe('CT007 - Registro de usuário com dados vazios', () => {
  const url = 'https://www.veloxtickets.com/Portal/Cadastre-se?ReturnUrl=%2FPortal%2FIngresso%2FCinema%2FSao-Paulo';

  beforeEach(() => {
    cy.visit(url);
  });

  const preencherCampos = (campos) => {
    if (campos.FullName !== undefined) cy.get('input[name="FullName"]').clear().type(campos.FullName);
    if (campos.CPF !== undefined) cy.get('input[name="CPF"]').clear().type(campos.CPF);
    if (campos.BirthDate !== undefined) cy.get('input[name="BirthDate"]').clear().type(campos.BirthDate);
    if (campos.Email !== undefined) cy.get('input[name="Email"]').clear().type(campos.Email);
    if (campos.ConfirmEmail !== undefined) cy.get('input[name="ConfirmEmail"]').clear().type(campos.ConfirmEmail);
    if (campos.Password !== undefined) cy.get('input[name="Password"]').clear().type(campos.Password);
    if (campos.ConfirmPassword !== undefined) cy.get('input[name="ConfirmPassword"]').clear().type(campos.ConfirmPassword);
    if (campos.Term !== undefined && campos.Term === true) {
      cy.get('input[name="Term"]').check({ force: true }); 
    } else {
      cy.get('input[name="Term"]').uncheck({ force: true });
    }
    cy.get('#btnRegister').click();
  };

  const camposBase = {
    FullName: 'Ana Maria Soares',
    CPF: '069.654.878-01',
    BirthDate: '12/05/1984',
    Email: 'anasoarestester@gmail.com',
    ConfirmEmail: 'anasoarestester@gmail.com',
    Password: 'Tester@$2s345a1',
    ConfirmPassword: 'Tester@$2s345a1',
    Term: true
  };

  const variacoes = [
    { descricao: 'Nenhum campo preenchido', dados: { Term: false } },
    { descricao: 'Campo Nome vazio', dados: { ...camposBase, FullName: '' } },
    { descricao: 'Campo CPF vazio', dados: { ...camposBase, CPF: '' } },
    { descricao: 'Campo Data de Nascimento vazio', dados: { ...camposBase, BirthDate: '' } },
    { descricao: 'Campo Email vazio', dados: { ...camposBase, Email: '' } },
    { descricao: 'Campo Confirmar Email vazio', dados: { ...camposBase, ConfirmEmail: '' } },
    { descricao: 'Campo Senha vazio', dados: { ...camposBase, Password: '' } },
    { descricao: 'Campo Confirmar Senha vazio', dados: { ...camposBase, ConfirmPassword: '' } },
    { descricao: 'Termos não aceitos', dados: { ...camposBase, Term: false } }
  ];

  variacoes.forEach((teste) => {
    it(`Deve validar: ${teste.descricao}`, () => {
      preencherCampos(teste.dados);
      // Validar se alguma mensagem de erro aparece nos spans de validação
      cy.get('span.text-danger').should('be.visible');
    });
  });
});
