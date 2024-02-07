// Test Case ID : TC-015
// Related FR : FR-016
// Modules : Auth, Profile

// Components
import '../../components/template'

describe('MI-FIK Cases - TC015', () => {
    // Template
    const methodCaseOne = 'post'
    const methodCaseTwo = 'get'
    const is_paginate = false

    it(methodCaseOne.toUpperCase() + ' - Login', () => {
        // Post login
        const builder = {
            "username": 'testerlecturer',
            "password": 'tester123',
        }

        cy.request({
            method: methodCaseOne, 
            url: 'api/v1/login/mobile',
            form: true,
            body: builder,
        }).then(auth => {
            expect(auth.status).to.equal(200)
            const token = auth.body.token
            cy.wrap(token).as('token_TC015')
        })

        // View event for test auth
        cy.get('@token_TC015').then(token => {
            cy.request({
                method: methodCaseTwo,
                url: '/api/v1/user/testerlecturer/role',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(role => {
                cy.templateGet(role, is_paginate)
            })
        })
    })
})
