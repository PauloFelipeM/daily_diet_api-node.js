import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { usersRoutes } from './routes/users.routes'
import { mealsRoutes } from './routes/meals.routes'

export const app = fastify()

app.register(cookie)

app.register(usersRoutes, { prefix: 'users' })
app.register(mealsRoutes, { prefix: 'meals' })

if (process.env.NODE_ENV !== 'test') {
  app
    .listen({ port: env.PORT })
    .then(() => {
      console.log('HTTP Server Running!')
    })
}
