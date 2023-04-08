import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able get user profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({ email: 'nedzesa@sip.cr' }),
    )
  })
})
