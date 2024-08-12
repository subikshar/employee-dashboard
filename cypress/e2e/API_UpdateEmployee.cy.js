const jsonData1 = require('../fixtures/updateEmployee_valid.json')
const jsonData2 = require('../fixtures/updateEmployee_invalid.json')
const jsonData3 = require('../fixtures/updateEmployee_invalidId.json')

describe("Update Employee",() => {
    let token = 'VGVzdFVzZXI0MTM6Qy9eNDF1VUBpU0pw'
    let id;
    let updateReqBody;
    jsonData1.forEach((data) => {
        it(data.case, () => {
            let addReqBody = {
                "firstName": data.firstName,
                "lastName": data.lastName,  
                "dependants":data.dependant
            }

            cy.request({
                method: 'POST',
                url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+token
                },
                body: addReqBody
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).has.property('id')
                id= response.body.id
                return id
               
            }).then((id) => {
                cy.request({
                    method: 'PUT',
                    url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                    body: {
                        "id": id,
                        "firstName": data.newFN,
                        "lastName": data.newLN,
                        "dependants": data.newDependant
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).has.property('partitionKey', data.username)
                    expect(response.body).has.property('sortKey')
                    expect(response.body).has.property('username', data.username)
                    expect(response.body).has.property('id', id);
                    expect(response.body).has.property('firstName', data.newFN)
                    expect(response.body).has.property('lastName', data.newLN)
                    expect(response.body).has.property('dependants', data.newDependant)
                    expect(response.body).has.property('salary', data.salary)
                    expect(response.body).has.property('gross', data.gross)
                    expect(response.body).has.property('benefitsCost')
                    expect(parseFloat(response.body.benefitsCost).toFixed(2)*1).to.equal(data.newBenefitsCost)
                    expect(response.body).has.property('net')
                    expect(parseFloat(response.body.net).toFixed(2)*1).to.equal(data.newNet)
                    
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


    })

    jsonData2.forEach((data) => {
        it.only(data.case, () => {
            let reqBody = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "dependants":data.dependant
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
                return id
            }).then((id) => {
                cy.request({
                    method: 'PUT',
                    url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                    failOnStatusCode: false,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                    body: {
                        "id": id,
                        "firstName": data.newFN,
                        "lastName": data.newLN,
                        "dependants": data.newDependant
                    }
                }).then((response) => {
                    expect(response.status).to.eq(data.statusCode)
                    expect(response.body[0]).has.property('memberNames')
                    expect(response.body[0].memberNames[0]).to.equal(data.memberNames)
                    expect(response.body[0]).has.property('errorMessage', data.errorMessage)
                                                            
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
    })



    jsonData3.forEach((data) => {
        it(data.case, () => {
            let reqBody = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "dependants":data.dependant
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
                return id
            }).then((id) => {
                cy.request({
                    method: 'PUT',
                    url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
                    failOnStatusCode: false,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic '+token
                    },
                    body: {
                        "id": data.id,
                        "firstName": data.newFN,
                        "lastName": data.newLN,
                        "dependants": data.newDependant
                    }
                }).then((response) => {
                    expect(response.status).to.eq(data.statusCode)
                    expect(response.body[0]).has.property('memberNames')
                    expect(response.body[0].memberNames[0]).to.equal(data.memberNames)
                    expect(response.body[0]).has.property('errorMessage', data.errorMessage)
                                                            
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
    })
})
