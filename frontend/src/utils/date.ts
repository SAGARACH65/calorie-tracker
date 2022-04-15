/**
 * Returns the date in ISO string format.
 *
 * @param {Date date
 * @returns {string}
 */
export const getISODate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
