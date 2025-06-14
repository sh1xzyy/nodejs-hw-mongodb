export const errorHandler = (error, _, res, __) => {
  const { status = 500, message = 'Something went wrong' } = error;
  res.status(status).json({
    status,
    message,
  });
};
