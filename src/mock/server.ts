import { setupWorker } from 'msw'
import handlers from './api'

export const worker: any = setupWorker(...handlers)
