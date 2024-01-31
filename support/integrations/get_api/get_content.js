// Components
import { generateAuthToken, generateUsername } from '../../components/generate'
import '../../components/template'

describe('MI-FIK API Testing - Content', () => {
    // Template
    const method = 'get'
    const token = generateAuthToken("hardcode")
    const page = 1
    const ord = "DESC"
    const item = 12
    const date = "2023-06-13"

    // =============== MY PROFILE MODULE ===============
    // Private API
    it(method.toUpperCase() + ' - All My Task', () => {
        cy.request({
            method: method,
            url: 'api/v1/task',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllMyTask')
        cy.get('@' + method + 'AllMyTask').then(sys => {
            cy.templateGet(sys, true)
        })
    })

    it(method.toUpperCase() + ' - All Event', () => {
        cy.request({
            method: method,
            url: 'api/v1/content/slug/all/order/'+ord+'/date/all/'+item+'/find/%20?page='+page,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllEvent')
        cy.get('@' + method + 'AllEvent').then(sys => {
            cy.templateGet(sys, false)
        })
    })

    it(method.toUpperCase() + ' - Specific Date Task & Event', () => {
        cy.request({
            method: method,
            url: 'api/v1/content/date/'+date,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'SpecificDateTasknEvent')
        cy.get('@' + method + 'SpecificDateTasknEvent').then(sys => {
            cy.templateGet(sys, false)
        })
    })

    it(method.toUpperCase() + ' - All My Question', () => {
        cy.request({
            method: method,
            url: 'api/v1/faq/question',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllMyQuestion')
        cy.get('@' + method + 'AllMyQuestion').then(sys => {
            cy.templateGet(sys, false)
        })
    })
})