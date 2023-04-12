import { FastifyInstance } from 'fastify/types/instance'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Edgar Washington',
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}