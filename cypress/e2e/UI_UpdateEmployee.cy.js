import loginPage from "../PageObjects/LoginPage.js";
import dashBoardPage from "../PageObjects/DashBoardPage.js";
const jsonData = require('../fixtures/UI_updateEmployee.json')
const jsonData1 = require('../fixtures/UI_updateEmployee_invalid.json')

describe('Update Employee validation', () => {
  // Update positive scenario validation
  jsonData.forEach((data) => {    
    it(data.case, () => {
      
      const ln = new loginPage();
      const db = new dashBoardPage();

      cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
      ln.clickOnSignin(data.username, data.passWord);
      
      
      db.validateTitle() // Validate employee dashboard title
      
      db.deleteFirstRecord() //delete if record present

      db.click_addEmployee()  // Click add employee button in the dashboard
      db.enterFirstName(data.firstName)  // Enter employee first Name
      db.enterLastName(data.lastName)  // Enter employee last Name
      db.enterDependents(data.dependant) // Enter employee dependent
      db.clickAdd() // clcik add button to add record

      db.clickEdit()  // Click edit button in the added employee record
      db.enterFirstName(data.newFN) // enter new first name
      db.enterLastName(data.newLN)  // enter new last name
      db.enterDependents(data.newDependant)  // enter new dependent
      db.clickUpdate()  // clcik add button to update the record

      //validate record details changed as per the update
      db.validateEmployeeAdded(data.newFN,data.newLN,data.newDependant.toString(),data.salary.toString()+".00",data.gross.toString()+".00",data.newBenefitsCost.toString(),data.newNet.toString() )

      //Clean up - delete if record present
      db.deleteFirstRecord()
      })

    })

// update negative scenario validation
  jsonData1.forEach((data) => {    
    it(data.case, () => {
      
      const ln = new loginPage();
      const db = new dashBoardPage();

      cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
      ln.clickOnSignin(data.username, data.passWord);
      
      
      db.validateTitle()  // Validate employee dashboard title
      
      db.deleteFirstRecord() //delete if record present
      
      db.click_addEmployee()  // Click add employee button in the dashboard
      
        
      db.enterFirstName(data.firstName)  // Enter employee first Name
      db.enterLastName(data.lastName)  // Enter employee last Name
      db.enterDependents(data.dependant)  // Enter employee dependent
      db.clickAdd()  // clcik add button to add record

      
      db.clickEdit()  //click edit button to update record

      if(data.newFN === null || data.newFN === ""){ 
        db.clearfirstName() // clear first Name field is input is null or empty
      }else{
      db.enterFirstName(data.newFN)  // enter new first name
      }

      if(data.newLN === null || data.newLN === ""){
        db.clearLastName()  // clear last Name field is input is null or empty
      }else{
      db.enterLastName(data.newLN)  // enter new last name
      }

      if(data.newDependant === null || data.newDependant === ""){
        db.clearDependent()  // clear dependent field is input is null or empty
      }else{
      db.enterDependents(data.newDependant)  // enter new dependent
      }

      db.validateUpdateDisabled() // validate update button is disabled
      
    })
  })

})     

