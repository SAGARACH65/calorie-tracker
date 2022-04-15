import { uniq } from 'lodash';

import { getISODate } from 'utils/date';
import UserReport from 'domains/misc/Report';
import UserFood from 'domains/responses/UserFood';

/**
 * Generates reports based on the food entries.
 *
 * @param {UserFood[]} allFoodEntries
 * @returns {UserFood[]}
 */
export const generateReportForAllUsers = (allFoodEntries: UserFood[]): UserReport[] => {
  const allUserNames = allFoodEntries.map((item) => item.username);

  const uniqueUserNames: string[] = uniq(allUserNames);

  const reports: UserReport[] = uniqueUserNames.map((user) => {
    let today = new Date();
    today.setDate(today.getDate() - 6);

    let pastWeek = new Date();
    pastWeek.setDate(pastWeek.getDate() - 13);

    const thisDay = getISODate(new Date());
    const lastDay = getISODate(today);
    const pastWeekDay = getISODate(pastWeek);

    const past7DaysEntries = allFoodEntries.filter(({ foodTakenOnDate, username }: UserFood) => {
      return foodTakenOnDate <= thisDay && foodTakenOnDate >= lastDay && username === user;
    });

    const pastWeekEntries = allFoodEntries.filter(({ foodTakenOnDate, username }) => {
      return foodTakenOnDate <= lastDay && foodTakenOnDate >= pastWeekDay && username === user;
    });

    return {
      userName: user,
      averageCalorieLast7Days: (
        past7DaysEntries.reduce((acc: number, item: UserFood) => acc + item.calorieCount, 0) / 7
      ).toFixed(2),
      averageEntriesPastWeek: pastWeekEntries.length,
      averageEntriesPast7Days: past7DaysEntries.length,
    };
  });

  return reports;
};
