import { rest } from 'msw'
import { mockCars } from './mock-cars'

const api: any = [
  rest.get('/cars', (req, res, ctx) => {
    return res(ctx.json({ data: mockCars }))
  })
]

export default api
