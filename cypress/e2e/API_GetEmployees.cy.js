const jsonData = require('../fixtures/getEmployee_valid.json')
const jsonData1 = require('../fixtures/getEmployee_invalid.json')


describe("Get Employee validation",() => {
    let token = 'VGVzdFVzZXI0MTM6Qy9eNDF1VUBpU0pw'
    let invalid_token = 'VGVzdFVzZXI0MTM6Qy9eNDF1VUBpU0p2'
    let id
    
    jsonData.forEach((testData) => {
        it(testData.case, () => {
            let reqBody = {
                "firstName": testData.firstName,
                "lastName": testData.lastName,
                "dependants":testData.dependant
            }    
            cy.request({
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
                id= response.body.id
                cy.request({
                    method: 'GET',
                    url:`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => {
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
                
                cy.request({
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
                }).then((response) => {
                    expect(response.status).to.equal(testData.statusCode)
                    
                })
        })
    })
})
