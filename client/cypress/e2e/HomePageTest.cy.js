///<reference types="Cypress"/>

describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('背景圖片存在', () => {
    cy.get("[class='home-image-welcome']").should("exist");
  })

  it('背景圖片失效時alt為get out', () => {
    cy.get("[class='home-image-welcome']").should("have.attr","alt","get out");
  })

  describe('layout in home page', () => {
    it('main layout點擊留言頁面轉入', () => {
      cy.get("[class='container_main_link']").click().url().should('include', '/visitor');
      cy.url().then(url => cy.log('Current URL is', url));
    })
  })
})