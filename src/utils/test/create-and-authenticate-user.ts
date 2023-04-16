import { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify/types/instance'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: Role,
) {
  await prisma.user.create({
    data: {
      name: 'Edgar Washington',
      email: 'nedzesa@sip.cr',
      password_hash: await hash('123456', 6),
      role,
    },
  })

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
