import UserFood from 'domains/responses/UserFood';

/**
 * Returns the food entries that lie in the current month
 *
 * @param {UserFood[]} userConsumedData
 * @returns {UserFood[]}
 */
export const getUserConsumedForThisMonth = (userConsumedData: UserFood[]) => {
  return userConsumedData.filter((item) => {
    const itemAddedDate = new Date(item.foodTakenOnDate);
    const itemAddedMonth = itemAddedDate.getMonth() + 1;

    var currentdate = new Date();

    var currentMonth = currentdate.getMonth() + 1;

    return itemAddedMonth === currentMonth;
  });
};
