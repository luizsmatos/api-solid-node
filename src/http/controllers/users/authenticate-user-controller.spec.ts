import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Edgar Washington',
      email: 'nedzesa@sip.cr',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'nedzesa@sip.cr',
      password: '123456',
    })

    console.log(response)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
