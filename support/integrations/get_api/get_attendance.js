// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('MI-FIK API Testing - Attendance', () => {
    // Template
    const method = 'get'
    const token = generateAuthToken("hardcode")
    const limit = 10

    // ================== ATTENDANCE MODULE ==================

    // Private API
    it(method.toUpperCase() + ' - All Attendance', () => {
        cy.request({
            method: method,
            url: 'api/v1/attendance/my/'+limit,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllAttendance')
        cy.get('@' + method + 'AllAttendance').then(sys => {
            cy.templateGet(sys, false)
        })
    })
})