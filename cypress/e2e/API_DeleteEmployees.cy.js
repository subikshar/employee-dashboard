const jsonData = require('../fixtures/deleteEmployee_valid.json')
const jsonData1 = require('../fixtures/deleteEmployee_invalid.json')


describe("Delete Employee validation",() => {
    let token = 'VGVzdFVzZXI0MTM6Qy9eNDF1VUBpU0pw'
    let id
    //Positive scenario testing
    jsonData.forEach((testData) => {
        it(testData.case, () => {
            let reqBody = {
                "firstName": testData.firstName,
                "lastName": testData.lastName,
                "dependants":testData.dependant
            }    
            cy.request({    // add employee details
                method: 'POST',
                url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+token
                },
                body: reqBody
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).has.property('id')
                id= response.body.id           // parse the id in the response json object
                cy.request({                   //delete call to delete the record created
                    method: 'DELETE',
                    url:`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => {
                    expect(response.status).to.equal(200)
                })
                
                cy.request({                    // Get all employee record
                    method: 'GET',
                    url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => {        // validate deleted id is not present in the list
                    expect(response.status).to.equal(200)
                    response.body.forEach(element => {
                        expect(element.id).to.not.equal(id)
                    })
                })
                
            })
        })
    })


    //DELETE request for negative scenarios
    jsonData1.forEach((testData) => {
        it(testData.case, () => {
                    id=testData.id
                    cy.request({
                    method: 'DELETE',
                    url:`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
                    failOnStatusCode: false,
                    headers:{
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => {       // Validate the response json status code
                    expect(response.status).to.equal(testData.statusCode)
                    //test
                })
        })
    })
})
