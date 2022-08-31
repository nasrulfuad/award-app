function catchError(error: { code?: number; message?: string }) {
  const message = error?.message || "Internal Server Error";
  const statusCode = +error?.code || 500;

  if (statusCode === 500) {
    console.log(error);
    // TODO log app here if there is something wrong with the app
  }

  return {
    message,
    statusCode,
  };
}

export { catchError };
