import { ZodError } from 'zod';

export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: err.errors,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
