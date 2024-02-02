// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('MI-FIK API Testing - System', () => {
    // Template
    const method = 'get'
    const token = generateAuthToken("hardcode")
    const page = 1
    const limit = 20

    // ================== ARCHIVE MODULE ==================

    // Private API
    it(method.toUpperCase() + ' - My Archive', () => {
        const type = '%20'
        const content_title = 'tugas-akhir'

        cy.request({
            method: method,
            url: 'api/v1/archive/'+content_title+'/type/'+type+'',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllMyArchive')
        cy.get('@' + method + 'AllMyArchive').then(sys => {
            cy.templateGet(sys, false)
        })
    })

})