// Test Case ID : FR-011
// Related FR : FR-011
// Modules : Task

// Components
import { generate } from 'random-words'
import { generateAuthToken, generateDatetimeStr, generateRandNumber } from '../../components/generate'
import '../../components/template'

describe('MI-FIK Cases - TC039', () => {
    // Template
    const methodCaseOne = 'get'
    const methodCaseTwo = 'post'
    const dctCode = 'SLC-001'
    const token = generateAuthToken("hardcode")

    it(methodCaseOne.toUpperCase() + ' - Create Task', () => {
        const listReminder = []

        // Get dictionary by type
        cy.request('/api/v1/dictionaries/type/'+dctCode).as(methodCaseOne + 'DictionaryByType')
        cy.get('@' + methodCaseOne + 'DictionaryByType').then(dct => {
            const itemDct = dct.body.data

        itemDct.forEach(el => {
            listReminder.push(el.slug_name)
        });

        // Post task
        const ds = generateDatetimeStr(null)

        const builder = {
            "task_title": generate({ maxLength: 75, minLength: 7 }),
            "task_desc": generate({ maxLength: 255, minLength: 3 }),
            "task_date_start": ds,
            "task_date_end": generateDatetimeStr(ds),
            "task_reminder": listReminder[generateRandNumber(listReminder.length -1, 0)],
        }

        cy.request({
            method: methodCaseTwo, 
            url: 'api/v1/task/create', 
            headers: {
                Authorization: `Bearer ${token}`
            },
            form: true,
            body: builder,
            }).as(methodCaseTwo + 'Task').then(task => {
                cy.templatePost(task, builder)
            })
        })
    })
})