export const throwError = (message) => {
  const error = new Error(message);
  throw error;
};
