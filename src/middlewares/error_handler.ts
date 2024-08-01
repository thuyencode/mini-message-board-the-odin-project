/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpError, InternalServerError, NotFound } from '@/errors'
import type e from 'express'

function error_handler(
  err: unknown,
  req: e.Request,
  res: e.Response,
  next: e.NextFunction
) {
  if (err instanceof NotFound) {
    res.status(err.statusCode).render('404', {
      navigation: {
        href: '/',
        name: 'Home',
        icon_name: 'mdi:home'
      }
    })
    return
  }

  if (err instanceof InternalServerError) {
    console.error(err)
  }

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: {
        statusCode: err.statusCode,
        message: err.message,
        cause: err.cause
      }
    })
  } else {
    console.error(err)
  }
}

export default error_handler
