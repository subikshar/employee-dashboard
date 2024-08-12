class dashBoardPage{
    elements={
        title_dashBoard : () => cy.xpath("//a[text()='Paylocity Benefits Dashboard']"),
        btn_logIn : () => cy.xpath("//button[text()='Log In']"),
        btn_addEmployee : () => cy.xpath("//button[@id='add']"),
        dgb_title_addEmpTitle : () => cy.xpath("//div[@id='employeeModal']/div/div/div[1]/h5"),
        dgb_txt_firstName :() => cy.xpath("//div[@id='employeeModal']/div/div/div[2]/form/div[1]/div/input[@id = 'firstName']"),
        dgb_txt_lastName : () => cy.xpath("//div[@id='employeeModal']/div/div/div[2]/form/div[2]/div/input[@id = 'lastName']"),
        dgb_txt_dependents : () => cy.xpath("//div[@id='employeeModal']/div/div/div[2]/form/div[3]/div/input[@id = 'dependants']"),
        dgb_button_add : () => cy.get("button#addEmployee.btn.btn-primary"),
        dbg_button_update : () => cy.get("button#updateEmployee.btn.btn-primary"),
        dgb_button_close : () => cy.xpath("//main/div[2]/div/div[@class='modal-content']/div/button[@class='close']"),
        dgb_button_updateClose : () => cy.xpath("//main/div[2]/div/div[@class='modal-content']/div/button[@class='close']/span"),
        dbg_button_delete: () => cy.xpath("//main/div[3]/div/div/div[3]/button[1]"),
        btn_edit: () => cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[9]/i[1]"),
        btn_delete: () => cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[9]/i[2]"),
        dbg_delete_title: () => cy.xpath("//main/div[3]/div/div/div/h5"),
        dbg_delte_msg: () => cy.xpath("//main/div[3]/div/div/div[2]/div/div"),
        dbg_delete_deletebtn: () => cy.xpath("//main/div[3]/div/div/div[3]/button[1]"),
        dbg_delete_cancelbtn: () => cy.xpath("//main/div[3]/div/div/div[3]/button[2]")
    }

    validateTitle(){
        this.elements.title_dashBoard().then((x) =>{
            expect(x.text()).to.equal("Paylocity Benefits Dashboard")
        })
    }

    validateEmployeeAdded(firstName, lastName, dependant, salary, grossPay, benefitsCost, netPay){
        
       
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[2]").contains(firstName)
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[3]").contains(lastName)
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[4]").contains(dependant)
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[5]").contains(salary)
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[6]").contains(grossPay)
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[7]").contains(benefitsCost)
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[8]").contains(netPay)
              
    }

    deleteEmployeeAdded()
    {
        cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[9]/i[2]").click()
        cy.wait(1000)
        this.elements.dbg_button_delete().click()
        
    }

    click_addEmployee(){
        this.elements.btn_addEmployee().scrollIntoView({duration:2000}).click()
    }

    enterFirstName(firstName){
        this.elements.dgb_txt_firstName().clear()
        this.elements.dgb_txt_firstName().type(firstName)
        
    }

    enterLastName(lastName){
        this.elements.dgb_txt_lastName().clear()
        this.elements.dgb_txt_lastName().type(lastName)
          
    }

    enterDependents(dependents){
        this.elements.dgb_txt_dependents().clear()
        this.elements.dgb_txt_dependents().type(dependents)
        
    }

    clickAdd(){

        this.elements.dgb_button_add().click()
        cy.wait(2000)
        /*this.elements.dgb_button_add().should('be.visible')
        this.elements.dgb_button_add().trigger("click")

        //invalid scenarios where it will close the dialog box
        this.elements.dgb_title_addEmpTitle().then(($ele) => {
            if($ele.text().includes('Add Employee')){
                this.elements.dgb_button_close().click()
                cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").contains('No employees found.')
            }
            
        })*/
    }

    clickEdit(){
        this.elements.btn_edit().click()
    }

    clickDelete(){
        this.elements.btn_delete().click()
    }

    clickUpdate(){
        this.elements.dbg_button_update().click()
        cy.wait(2000)

    }

    validateUpdateDisabled(){
        this.elements.dbg_button_update().should('be.disabled')
    }

    validateAddDisabled(){
        this.elements.dgb_button_add().should('be.disabled')
    }

    clearfirstName(){
        this.elements.dgb_txt_firstName().clear()
    }
    clearLastName(){
        this.elements.dgb_txt_lastName().clear()
    }
    clearDependent(){
        this.elements.dgb_txt_dependents().clear()
    }
    validateDeleteDialog(){
        this.elements.dbg_delete_title().contains('Delete Employee')
        this.elements.dbg_delte_msg().contains('Delete employee record for')
        this.elements.dbg_delete_deletebtn().should('be.visible')
        this.elements.dbg_delete_cancelbtn().should('be.visible')

    }

    clickDBGDelete(){
        this.elements.dbg_delete_deletebtn().click()
        cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").then(($ele) => {
            expect($ele.text().length).to.equal(16)
        }) 
    }

    clickDBGDeleteCancel(){
        this.elements.dbg_delete_cancelbtn().click()
        cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").then(($ele) => {
            expect($ele.text().length).greaterThan(16)
        })       
    }
}


export default dashBoardPage;
require('cypress-xpath')