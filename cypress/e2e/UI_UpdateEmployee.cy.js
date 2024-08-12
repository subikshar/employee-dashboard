import loginPage from "../PageObjects/LoginPage.js";
import dashBoardPage from "../PageObjects/DashBoardPage.js";
const jsonData = require('../fixtures/UI_updateEmployee.json')
const jsonData1 = require('../fixtures/UI_updateEmployee_invalid.json')

describe('Update Employee validation', () => {
  
  jsonData.forEach((data) => {    
    it(data.case, () => {
      
      const ln = new loginPage();
      const db = new dashBoardPage();

      cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
      ln.clickOnSignin(data.username, data.passWord);
      
      
      db.validateTitle()

      cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").then(($ele) => {
        if($ele.text().includes('No employees found.')){

        }
        else
          db.deleteEmployeeAdded()
      })

      db.click_addEmployee()
      db.enterFirstName(data.firstName)
      db.enterLastName(data.lastName)
      db.enterDependents(data.dependant)
      db.clickAdd()

      db.clickEdit()
      db.enterFirstName(data.newFN)
      db.enterLastName(data.newLN)
      db.enterDependents(data.newDependant)
      db.clickUpdate()

      db.validateEmployeeAdded(data.newFN,data.newLN,data.newDependant.toString(),data.salary.toString()+".00",data.gross.toString()+".00",data.newBenefitsCost.toString(),data.newNet.toString() )

      cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").then(($ele) => {
        if($ele.text().includes('No employees found.')){

        }
        else
          db.deleteEmployeeAdded()
      })

    })
  })

  jsonData1.forEach((data) => {    
    it.only(data.case, () => {
      
      const ln = new loginPage();
      const db = new dashBoardPage();

      cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
      ln.clickOnSignin(data.username, data.passWord);
      
      
      db.validateTitle()
      cy.xpath("//table[@id='employeesTable']/tbody/tr[1]/td[1]").then(($ele) => {
        if($ele.text().includes('No employees found.')){

        }
        else
          db.deleteEmployeeAdded()
      })
      
      db.click_addEmployee()
      
        
      db.enterFirstName(data.firstName)
      db.enterLastName(data.lastName)
      db.enterDependents(data.dependant)
      db.clickAdd()

      //update with invalid scenario
      db.clickEdit()
      if(data.newFN === null || data.newFN === ""){ 
        db.clearfirstName()
      }else{
      db.enterFirstName(data.newFN)
      }
      if(data.newLN === null || data.newLN === ""){
        db.clearLastName() 
      }else{
      db.enterLastName(data.newLN)
      }
      if(data.newDependant === null || data.newDependant === ""){
        db.clearDependent()
      }else{
      db.enterDependents(data.newDependant)
      }
      db.validateUpdateDisabled() 
      
      })
      

      


    })
  })
      

