import loginPage from "../PageObjects/LoginPage.js";
import dashBoardPage from "../PageObjects/DashBoardPage.js";
const jsonData = require('../fixtures/UI_deleteEmployee.json')

describe('Delete Employee validation', () => {
  
  jsonData.forEach((data) => {    
    it(data.case, () => {
      
      const ln = new loginPage();
      const db = new dashBoardPage();

      cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
      ln.clickOnSignin(data.username, data.passWord);
      
      
      db.validateTitle() // Validate dashboard title
      db.validateColumnHeading()  //validate table column heading

      db.deleteFirstRecord() //delete if record present

      db.click_addEmployee() // clcik add employee to enter details
      db.enterFirstName(data.firstName) //enter first name
      db.enterLastName(data.lastName)//enter last name
      db.enterDependents(data.dependant)//enter dependent
      db.clickAdd()  // clcik add button to add details to the dash board

      db.clickDelete() // click delete button
      db.validateDeleteDialog() // valiadate delete dialog box
      db.clickDBGDeleteCancel() //clcik cancel button and check record is not deleted
      db.deleteEmployeeAdded() // clcik delete button to delete record

    })
  })

  })
      

