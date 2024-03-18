///<reference types="Cypress"/>

describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/visitor');
  })

  // it('背景圖片存在', () => {
  //   cy.get("[class='home-image-welcome']").should("exist");
  // })

  describe('layout in visitor message page', () => {
    it('top layout點擊留言頁面轉入', () => {
      cy.get("[class='container_top_link']").click().url().should('eq', 'http://localhost:3000/#/');
      cy.url().then(url => cy.log('Current URL is', url));
    })
  })
})