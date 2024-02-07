// Test Case ID : TC-001
// Related FR : FR-002
// Modules : Auth, Event

// Components
import '../../components/template'

describe('MI-FIK Cases - TC001', () => {
    // Template
    const methodCaseOne = 'post'
    const methodCaseTwo = 'get'
    const page = 1
    const limit = 7
    const ord = 'asc'
    const is_paginate = true

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
            cy.wrap(token).as('token_TC001')
        })

        // View event for test auth
        cy.get('@token_TC001').then(token => {
            cy.request({
                method: methodCaseTwo,
                url: 'api/v1/content/slug/all/order/'+ord+'/date/all/'+limit+'/find/%20?page='+page,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(home => {
                cy.templateGet(home, is_paginate)
            })
        })
    })
})
