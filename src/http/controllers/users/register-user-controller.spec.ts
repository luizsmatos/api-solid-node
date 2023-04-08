import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to register a user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Edgar Washington',
      email: 'nedzesa@sip.cr',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})
