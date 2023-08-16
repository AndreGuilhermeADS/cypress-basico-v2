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
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação', function() {
        cy.get('#firstName').type('Andre')
        cy.get('#lastName').type('Guilherme')
        cy.get('#email').type('andregui@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()

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
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()

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
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('.success').should('be.visible')
    })

    it("selects a random option from a select dropdown", function(){

        cy.get('select option')
        .its('length',{log: false}).then(n=> {
            cy.get('select').select(Cypress._.random(n-1))
        })

    })

    it('seleciona um produto (youtube) por seu texto' , function(){
        
        cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
    })

    it('seleciona um produto (mentoria) por seu valor', function(){

        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function(){
        
        cy.get("#product")
        .select(1)
        .should("have.value",'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
       
        cy.get('input[type="radio"][value="ajuda"')
        .check()
        .should('be.checked')
        cy.get('input[type="radio"][value="elogio"')
        .check()
        .should('be.checked')
        cy.get('input[type="radio"][value="feedback"')
        .check()
        .should('be.checked')
    })

    it('marca cada tipo de atendimento',function(){

        cy.get('input[type="radio"')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois marca o ultimo', function(){

        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('select a file for upload', function(){

       cy.get('input[type="file"')
       .selectFile("cypress/fixtures/example.json")
       .then(input =>{
         expect(input[0].files[0].name).to.equal("example.json")
       })
        
    })
   
    it('select a file for upload', function(){ 
        
        cy.get('input[type="file"')
        .selectFile("cypress/fixtures/example.json", { action: 'drag-drop'})
        .then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })

    })

    it('selects a file for upload using an aliased fixture (workaround)', function(){
        cy.fixture('example.json', {encoding: null}).as('examplefile')
        cy.get('input[type="file"]')
        .selectFile({
            contents:'@examplefile',
            filename: 'example.json'
        })
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })

    })


    it('select multiple files for upload', function(){
        

        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile([
            'cypress/fixtures/example.json',
            'cypress/fixtures/example.txt'           
        ])
        .then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
            expect(input[0].files[1].name).to.equal('example.txt')
        })
    })


    it('seleciona um arquivo da pasta fixtures', function(){

        cy.get('input[type="file"]')
        .should("not.have.value")
        .selectFile("cypress/fixtures/example.json")
        .then(input =>{
            expect(input[0].files[0].name).to.equal("example.json")
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){

        cy.get('input[type="file"')
        .should("not.have.value")
        .selectFile('cypress/fixtures/example.json', {action:  'drag-drop'})
        .then(input=>{
            expect(input[0].files[0].name).to.equal("example.json")
        })
    })

    it("seleciona um arquivo da pasta fixtures usando should com um callback", function(){

        cy.get("input[type='file']")
        .should("not.have.value")
        .selectFile("cypress/fixtures/example.json")
        .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })


    it("seleciona um arquivo utilizando uma fixture para qual foi dada um alias", function(){

        cy.fixture('example.json', {encoding: null}).as('exemplo')
        cy.get("input[type='file']")
        .should('not.have.value')
        .selectFile({
            contents: '@exemplo',
            filename:'example.json'
        })
        .then(input=>{
            expect(input[0].files[0].name).to.equal("example.json")
        })
    })

    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){

        cy.get('#privacy a')
        .should('have.attr', 'target' , '_blank')
    })

    it('acessa a pagina de politica de privacidade removendo o target e então clicando no link', function(){

        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should("be.visible")
    })

   

 
})

