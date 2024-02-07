// Test Case ID : TC-005
// Related FR : FR-003
// Modules : Auth

// Components
import '../../components/template'

describe('MI-FIK Cases - TC005', () => {
    // Template
    const methodCaseOne = 'post'
    const methodCaseTwo = 'get'

    it(methodCaseOne.toUpperCase() + ' - Logout', () => {
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
            cy.wrap(token).as('token_TC005')
        })

        // Get logout
        cy.get('@token_TC005').then(token => {
            cy.request({
                method: methodCaseTwo,
                url: 'api/v1/logout/mobile',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(auth2 => {
                expect(auth2.status).to.equal(200)
            })
        })
    })
})
