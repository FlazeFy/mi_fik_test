// Components
import { generateAuthToken, generateUsername } from '../../components/generate'
import '../../components/template'

describe('MI-FIK API Testing - Profile', () => {
    // Template
    const method = 'get'
    const token = generateAuthToken("hardcode")
    const uname = generateUsername('lecturer')

    // =============== MY PROFILE MODULE ===============
    // Private API
    it(method.toUpperCase() + ' - All My History', () => {
        cy.request({
            method: method,
            url: 'api/v1/history/my',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllMyHistory')
        cy.get('@' + method + 'AllMyHistory').then(sys => {
            cy.templateGet(sys, true)
        })
    })

    it(method.toUpperCase() + ' - User Role', () => {
        cy.request({
            method: method,
            url: 'api/v1/user/'+uname+'/role',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'UserRole')
        cy.get('@' + method + 'UserRole').then(sys => {
            cy.templateGet(sys, false)
        })
    })

    it(method.toUpperCase() + ' - My Request Role', () => {        
        cy.request({
            method: method,
            url: 'api/v1/user/request/my',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'MyRequestRole')
        cy.get('@' + method + 'MyRequestRole').then(sys => {
            cy.templateGet(sys, false)
        })
    })
})