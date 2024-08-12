import loginPage from "../PageObjects/LoginPage.js";
import dashBoardPage from "../PageObjects/DashBoardPage.js";
const jsonData = require('../fixtures/UI_addEmployee.json')
const jsonData1 = require('../fixtures/UI_addEmployee_invalid.json')

describe('Add Employee validation', () => {
  
  jsonData.forEach((data) => {    
    it(data.case, () => {
      const ln = new loginPage();
      const db = new dashBoardPage();
 

      cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
      ln.clickOnSignin(data.username, data.passWord);
      
      db.validateTitle() // validate title
      db.validateColumnHeading()  //validate table column heading

      //delete if any record present
      db.deleteFirstRecord()
                       
      db.click_addEmployee() //click add employee to add details
      db.enterFirstName(data.firstName)
      db.enterLastName(data.lastName)
      db.enterDependents(data.dependant)
      
      db.clickAdd() //add employee to dashboard
      
      //validate added employee
      db.validateEmployeeAdded(data.firstName,data.lastName,data.dependant.toString(),data.salary.toString()+".00",data.gross.toString()+".00",data.benefitsCost.toString(),data.net.toString() )
      
      
      //delete if any record present
      db.deleteFirstRecord()
      })

    })
  

  jsonData1.forEach((data) => {    
    it(data.case, () => {
      
      const ln = new loginPage();
      const db = new dashBoardPage();

      cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
      ln.clickOnSignin(data.username, data.passWord);
      
      db.validateTitle() // validate title
      db.validateColumnHeading()  //validate table column heading

      //delete if any record present
      db.deleteFirstRecord()
      
      db.click_addEmployee() //Click add employee to add details
      
      if(data.firstName === null || data.firstName === ""){ 
      }else{    
      db.enterFirstName(data.firstName)
      }

      if(data.lastName === null || data.lastName === ""){ 
      }else{
      db.enterLastName(data.lastName)
      }

      if(data.dependant === null || data.dependant === ""){
      }else{
      db.enterDependents(data.dependant)
      }

      db.validateAddDisabled() // Validate add button diabled
      cy.wait(2000)
      
      
      })
      

      


    })

  })     

