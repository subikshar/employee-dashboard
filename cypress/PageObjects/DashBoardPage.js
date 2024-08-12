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
        dbg_delete_cancelbtn: () => cy.xpath("//main/div[3]/div/div/div[3]/button[2]"),
        emp_table_firstCell: () => cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]"),
        emp_table_idHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[1]"),
        emp_table_FNHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[2]"),
        emp_table_LNHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[3]"),
        emp_table_depHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[4]"),
        emp_table_salHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[5]"),
        emp_table_grossHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[6]"),
        emp_table_benHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[7]"),
        emp_table_netHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[8]"),
        emp_table_actionsHeading: () => cy.xpath("//table[@id='employeesTable']/thead/tr[1]/th[9]"),
        link_logOut: () => cy.xpath("//a[text()='Log Out']")
    }

    //validate employee dash board title
    validateTitle(){
        this.elements.title_dashBoard().then((x) =>{
            expect(x.text()).to.equal("Paylocity Benefits Dashboard")
        })
    }

    //validate employee dashboard table column heading
    validateColumnHeading(){
        this.elements.emp_table_idHeading().should('be.visible')
        this.elements.emp_table_FNHeading().should('be.visible')
        this.elements.emp_table_LNHeading().should('be.visible')
        this.elements.emp_table_depHeading().should('be.visible')
        this.elements.emp_table_salHeading().should('be.visible')
        this.elements.emp_table_grossHeading().should('be.visible')
        this.elements.emp_table_benHeading().should('be.visible')
        this.elements.emp_table_netHeading().should('be.visible')
        this.elements.emp_table_actionsHeading().should('be.visible')
    }

    validateLogOut(){

    }


    //validate employee added details
    validateEmployeeAdded(firstName, lastName, dependant, salary, grossPay, benefitsCost, netPay){
        
       
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[2]").contains(firstName) // Validate first name added
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[3]").contains(lastName)  // Validate last name added
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[4]").contains(dependant)  // Validate dependent added
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[5]").contains(salary)  // Validate salary added
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[6]").contains(grossPay)  // Validate gross pay added
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[7]").contains(benefitsCost)  // Validate benefit cost added
       cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[8]").contains(netPay)  // Validate net pay added
              
    }

    //delete first record in the employee dahboard table
    deleteEmployeeAdded()
    {
        cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[9]/i[2]").should('be.visible')
        cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[9]/i[2]").click({force: true})  // click delete button in the employee dashboard record list 
        cy.wait(2000)
        this.elements.dbg_button_delete().click() // clcik delete button in the delete dialog
        cy.wait(2000)
        
    }

    // clcik add employee button in employee dash board
    click_addEmployee(){
        this.elements.btn_addEmployee().scrollIntoView({duration:2000}).click()
    }

    //enter first name in add employee dialog
    enterFirstName(firstName){
        this.elements.dgb_txt_firstName().clear()
        this.elements.dgb_txt_firstName().type(firstName)
        
    }

    //enter last name in add employee dialog
    enterLastName(lastName){
        this.elements.dgb_txt_lastName().clear()
        this.elements.dgb_txt_lastName().type(lastName)
          
    }

    //enter dependent in add employee dialog
    enterDependents(dependents){
        this.elements.dgb_txt_dependents().clear()
        this.elements.dgb_txt_dependents().type(dependents)
        
    }

    //clcik add button in add employee dialog
    clickAdd(){

        this.elements.dgb_button_add().click()
        cy.wait(2000)
        
    }

    //clcik edit button in employee dashboard
    clickEdit(){
        this.elements.btn_edit().click()
    }

    //clcik delete button in employee dashboard
    clickDelete(){
        this.elements.btn_delete().click()
    }

    //clcik update button in update dialog box
    clickUpdate(){
        this.elements.dbg_button_update().click()
        cy.wait(2000)

    }

    //validate update button is disabled
    validateUpdateDisabled(){
        this.elements.dbg_button_update().should('be.disabled')
    }

    //validate Add button is disabled
    validateAddDisabled(){
        this.elements.dgb_button_add().should('be.disabled')
    }

    //clear first name field in update dialog box
    clearfirstName(){
        this.elements.dgb_txt_firstName().clear()
    }

    //clear last name field in update dialog box
    clearLastName(){
        this.elements.dgb_txt_lastName().clear()
    }

    //clear dependent field in update dialog box
    clearDependent(){
        this.elements.dgb_txt_dependents().clear()
    }

    //Validate elements in delete dialog box
    validateDeleteDialog(){
        this.elements.dbg_delete_title().contains('Delete Employee')
        this.elements.dbg_delte_msg().contains('Delete employee record for')
        this.elements.dbg_delete_deletebtn().should('be.visible')
        this.elements.dbg_delete_cancelbtn().should('be.visible')

    }

    //Clcik delete button in delete dialog box
    clickDBGDelete(){
        this.elements.dbg_delete_deletebtn().click()
        cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").then(($ele) => {
            expect($ele.text().length).to.equal(16) // validate record is deleted(No  Records Presnet)
        }) 
    }

    //Clcik Cancel button in delete dialog box
    clickDBGDeleteCancel(){
        this.elements.dbg_delete_cancelbtn().click()
        cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").then(($ele) => {
            expect($ele.text().length).greaterThan(16) // validate record is present
        })       
    }

    //called for cleaning up record once validation is complete
    deleteFirstRecord(){
        this.elements.emp_table_firstCell().then(($ele) => {
            if($ele.text().includes('No employees found.')){
              
            }
            else{
              this.deleteEmployeeAdded()
              this.deleteFirstRecord()
            }
          })
    }
}


export default dashBoardPage;
require('cypress-xpath')