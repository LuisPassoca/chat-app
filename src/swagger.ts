import type { Express } from 'express'

import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.OAS3Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chat App',
            version: '1.0.0'
        },
        tags: [ { name: 'auth', description: 'Public route for auth' } ]
    },
    apis: ['./src/routes/**/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

export function swaggerInit(app: Express) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))
}