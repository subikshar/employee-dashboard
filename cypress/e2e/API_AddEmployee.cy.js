const jsonData = require('../fixtures/addEmployee_valid.json')
const jsonData1 = require('../fixtures/addEmployee_invalid.json')

describe("Add Employee",() => {
    let token = 'VGVzdFVzZXI0MTM6Qy9eNDF1VUBpU0pw'
    let id;
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
                expect(response.body).has.property('partitionKey', testData.username)
                expect(response.body).has.property('sortKey')
                expect(response.body).has.property('username', testData.username)
                expect(response.body).has.property('id')
                id = response.body.id
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
                method: 'GET',
                url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                headers:{
                    'Authorization': 'Basic '+token
                }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    response.body.forEach(element  => {
                        if(element.id == id) {
                            expect(element).has.property('partitionKey', testData.username)
                            expect(element).has.property('sortKey')
                            expect(element).has.property('username', testData.username)
                            expect(element).has.property('firstName', testData.firstName)
                            expect(element).has.property('lastName', testData.lastName)
                            expect(element).has.property('dependants', testData.dependant)
                            expect(element).has.property('salary', testData.salary)
                            expect(element).has.property('gross', testData.gross)
                            expect(element).has.property('benefitsCost')
                            expect(parseFloat(element.benefitsCost).toFixed(2)*1).to.equal(testData.benefitsCost)
                            expect(element).has.property('net')
                            expect(parseFloat(element.net).toFixed(2)*1).to.equal(testData.net)
                        }
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
        it.only(testData.case, () => {
            let reqBody = {
                "firstName": testData.firstName,
                "lastName": testData.lastName,
                "dependants":testData.dependant
            }    
            cy.request({
                method: 'POST',
                url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                failOnStatusCode: false,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+token
                },
                body: reqBody
            }).then((response) => {
                expect(response.status).to.eq(testData.statusCode)
                expect(response.body[0]).has.property('memberNames')
                expect(response.body[0].memberNames[0]).to.equal(testData.memberNames)
                expect(response.body[0]).has.property('errorMessage', testData.errorMessage)

    
            })
        })
    })
})
