// Test Case ID : TC-056
// Related FR : FR-017
// Modules : FAQ

// Components
import { generate } from 'random-words'
import { generateAuthToken, generateRandNumber } from '../../components/generate'
import '../../components/template'

describe('MI-FIK Cases - TC056', () => {
    // Template
    const methodCaseOne = 'get'
    const methodCaseTwo = 'post'
    const dctCode = 'QST-001'
    const token = generateAuthToken("hardcode")

    it(methodCaseOne.toUpperCase() + ' - Create Question', () => {
        const listType = []

        // Get dictionary by type
        cy.request('/api/v1/dictionaries/type/'+dctCode).as(methodCaseOne + 'DictionaryByType')
        cy.get('@' + methodCaseOne + 'DictionaryByType').then(dct => {
            const itemDct = dct.body.data

        itemDct.forEach(el => {
            listType.push(el.slug_name)
        });

        // Post question
        const builder = {
            "question_body": generate({ maxLength: 255, minLength: 7 }),
            "question_type": listType[generateRandNumber(listType.length -1, 0)],
        }

        cy.request({
            method: methodCaseTwo, 
            url: 'api/v1/faq/question', 
            headers: {
                Authorization: `Bearer ${token}`
            },
            form: true,
            body: builder,
            }).as(methodCaseTwo + 'Question').then(faq => {
                cy.templatePost(faq, builder)
            })
        })
    })
})