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

      //delete if any record present
      cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").then(($ele) => {
        if($ele.text().includes('No employees found.')){

        }
        else
          db.deleteEmployeeAdded()
      })

      db.click_addEmployee() // clcik add employee to enter details
      db.enterFirstName(data.firstName)
      db.enterLastName(data.lastName)
      db.enterDependents(data.dependant)
      db.clickAdd()

      db.clickDelete() // click delete button
      db.validateDeleteDialog() // valiadate delete dialog box
      db.clickDBGDeleteCancel() //clcik cancel button and check record is not deleted
      db.deleteEmployeeAdded() // clcik delete button to delete record

    })
  })

  })
      

