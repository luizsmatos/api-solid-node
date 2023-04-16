import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Edgar Washington',
      email: 'nedzesa@sip.cr',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'nedzesa@sip.cr',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
