/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  Request, Response, NextFunction,
} from 'express';
import ERRORS from '../errors';

/**
 * Middleware to handle errors in the application.
 *
 * @param {Error} error - The error object thrown in the application.
 * @param {Request} _req - The request object (not used in this middleware).
 * @param {Response} res - The response object used to send the error response.
 */
function error(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error.message in ERRORS) {
    res.status(ERRORS[error.message as keyof typeof ERRORS].code).json({
      error_code: error.message,
      error_description: ERRORS[error.message as keyof typeof ERRORS].message,
    });

    return;
  }

  res.status(ERRORS.INVALID_DATA.code).json({
    error_code: 'INVALID_DATA',
    error_description: error.message,
  });
}

export default error;
