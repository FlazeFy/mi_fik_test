// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('MI-FIK API Testing - System', () => {
    // Template
    const method = 'get'
    const token = generateAuthToken("hardcode")
    const page = 1
    const limit = 20

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

    // ================== TAG MODULE ==================

    it(method.toUpperCase() + ' - All Tag By Category', () => {
        const cat = 'tag-others'
        cy.request({
            method: method,
            url: 'api/v1/tag/cat/'+cat+'/'+limit+'?page='+page,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllTagByCat')
        cy.get('@' + method + 'AllTagByCat').then(sys => {
            cy.templateGet(sys, true)
        })
    })

    // ================== INFO MODULE ==================

    it(method.toUpperCase() + ' - Info By Location And Page', () => {
        const loc = 'delete_info'
        const page = 'system'
        cy.request({
            method: method,
            url: 'api/v1/info/page/'+page+'/location/'+loc,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'InfoByLocationAndPage')
        cy.get('@' + method + 'InfoByLocationAndPage').then(sys => {
            cy.templateGet(sys, null)
        })
    })
})