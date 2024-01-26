// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('MI-FIK API Testing - System', () => {
    // Template
    const method = 'get'
    const token = generateAuthToken("hardcode")

    // =============== DICTIONARY MODULE ===============
    // Public API
    it(method.toUpperCase() + ' - All Dictionary', () => {
        const typeDct = 'TAG-001'

        cy.request('api/v1/dictionaries/type/'+typeDct).as(method + 'AllDictionary')
        cy.get('@' + method + 'AllDictionary').then(sys => {
            cy.templateGet(sys, false)
        })
    })

    // ================== HELP MODULE ==================

    // Public API
    it(method.toUpperCase() + ' - All Help Category By Type', () => {
        cy.request('api/v1/help/event').as(method + 'AllHelpCategoryByType')
        cy.get('@' + method + 'AllHelpCategoryByType').then(sys => {
            cy.templateGet(sys, true)
        })
    })

    // Private API
    it(method.toUpperCase() + ' - All Help Type', () => {
        cy.request({
            method: method,
            url: 'api/v1/help',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllHelpType')
        cy.get('@' + method + 'AllHelpType').then(sys => {
            cy.templateGet(sys, false)
        })
    })
})