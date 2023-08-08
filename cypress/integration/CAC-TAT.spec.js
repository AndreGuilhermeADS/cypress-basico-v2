/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    
    this.beforeEach(function(){
        cy.visit('../src/index.html')
    })
    
    it('verifica o titulo da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const  longtest = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Andre')
        cy.get('#lastName').type('Guilherme')
        cy.get('#email').type('andregui@gmail.com')
        cy.get('#open-text-area').type(longtest, {delay: 0})
        cy.contains('button','enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação', function() {
        cy.get('#firstName').type('Andre')
        cy.get('#lastName').type('Guilherme')
        cy.get('#email').type('andregui@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico',function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Andre')
        cy.get('#lastName').type('Guilherme')
        cy.get('#email').type('andregui@gmail,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button','enviar').click()

        cy.get('.error').should('be.visible')
    })  

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
           .type('Andre')
           .should('have.value', 'Andre')
           .clear()
           .should('have.value','')
        cy.get('#lastName')
           .type('Guilherme')
           .should('have.value', 'Guilherme')
           .clear()
           .should('have.value','')
        cy.get('#email')
           .type('andregui@gmail.com')
           .should('have.value', 'andregui@gmail.com')
           .clear()
           .should('have.value','')
        cy.get('#open-text-area')
           .type('test')
           .should('have.value', 'test')
           .clear()
           .should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button','enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('.success').should('be.visible')
    })
})