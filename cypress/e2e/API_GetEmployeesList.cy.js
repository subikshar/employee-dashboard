describe("Get Employee validation",() => {
    let token = 'VGVzdFVzZXI0MTM6Qy9eNDF1VUBpU0pw'
    let invalid_token = 'VGVzdFVzZXI0MTM6Qy9eNDF1VUBpU0p2'
    it("with valid token", () => {
        cy.request({
            method: 'GET',
            url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            headers:{
                'Authorization': 'Basic '+token
            }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it("with invalid token", () => {
        cy.request({
            method: 'GET',
            url:"https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Basic '+invalid_token
            }
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
    })

})
