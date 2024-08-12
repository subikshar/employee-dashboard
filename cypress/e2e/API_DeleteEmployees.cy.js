const jsonData = require('../fixtures/deleteEmployee_valid.json')
const jsonData1 = require('../fixtures/deleteEmployee_invalid.json')


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
                    method: 'DELETE',
                    url:`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => {
                    expect(response.status).to.equal(200)
                })
                
                cy.request({
                    method: 'GET',
                    url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    response.body.forEach(element => {
                        expect(element.id).to.not.equal(id)
                    })
                })
                
            })
        })
    })

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
                }).then((response) => {
                    expect(response.status).to.equal(testData.statusCode)
                    //test
                })
        })
    })
})
