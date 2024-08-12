class loginPage{
    elements={
        txt_userName : () => cy.get("input#Username"),
        txt_passWord : () => cy.get("input#Password"),
        btn_logIn : () => cy.xpath("//button[text()='Log In']")

    }

    clickOnSignin(userName, passWord){
        this.elements.txt_userName().type(userName)
        this.elements.txt_passWord().type(passWord)
        this.elements.btn_logIn().click()
    }

    
}

export default loginPage;
require('cypress-xpath')