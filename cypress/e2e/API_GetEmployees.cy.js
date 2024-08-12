const jsonData = require('../fixtures/getEmployee_valid.json')
const jsonData1 = require('../fixtures/getEmployee_invalid.json')


describe("Get Employee validation",() => {
    let token = 'VGVzdFVzZXI0MTM6Qy9eNDF1VUBpU0pw'
    let id
    
    jsonData.forEach((testData) => {
        it(testData.case, () => {
            let reqBody = {
                "firstName": testData.firstName,
                "lastName": testData.lastName,
                "dependants":testData.dependant
            }    
            cy.request({  //Request to add employee details
                method: 'POST',
                url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+token
                },
                body: reqBody
            }).then((response) => {
                expect(response.status).to.eq(200)// validate the response code
                expect(response.body).has.property('id')  
                id= response.body.id               // get the id of record created to pass it as query parameter for Get employee call
                cy.request({
                    method: 'GET',
                    url:`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => {               // Validate the response json object of get employee
                    expect(response.status).to.equal(200)
                    expect(response.body).has.property('partitionKey', testData.username)
                    expect(response.body).has.property('sortKey')
                    expect(response.body).has.property('username', testData.username)
                    expect(response.body).has.property('id', id);
                    expect(response.body).has.property('firstName', testData.firstName)
                    expect(response.body).has.property('lastName', testData.lastName)
                    expect(response.body).has.property('dependants', testData.dependant)
                    expect(response.body).has.property('salary', testData.salary)
                    expect(response.body).has.property('gross', testData.gross)
                    expect(response.body).has.property('benefitsCost')
                    expect(parseFloat(response.body.benefitsCost).toFixed(2)*1).to.equal(testData.benefitsCost)
                    expect(response.body).has.property('net')
                    expect(parseFloat(response.body.net).toFixed(2)*1).to.equal(testData.net)
                })
                
                cy.request({                       // delete the record created
                    method: 'DELETE',
                    url:`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => {
                    expect(response.status).to.equal(200)
                })
                
            })
        })
    })
//Get Employee negative scenario tetsing
    jsonData1.forEach((testData) => {
        it(testData.case, () => {
                    id=testData.id
                    cy.request({
                    method: 'GET',
                    url:`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
                    failOnStatusCode: false,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => { // validate the error response code for negative scenario tetsing
                    expect(response.status).to.equal(testData.statusCode)
                    
                })
        })
    })
})
