import React from 'react';
import Alert from 'react-bootstrap/Alert';

import { getISODate } from 'utils/date';
import User from 'domains/responses/User';
import UserFood from 'domains/responses/UserFood';
import { getUserConsumedForThisMonth } from 'services/user';

interface UserAlertsProps {
  userData: User;
  userConsumedData: UserFood[];
}

const UserAlerts = (props: UserAlertsProps) => {
  const { userConsumedData, userData } = props;

  const foodEntriesForToday = userConsumedData.filter(
    (item) => item.foodTakenOnDate === getISODate(new Date())
  );

  const caloricIntakeForToday = foodEntriesForToday.reduce(
    (acc: number, item) => acc + item.calorieCount,
    0
  );

  const foodEntriesForThisMonth = getUserConsumedForThisMonth(userConsumedData);

  const foodCostForThisMonth = foodEntriesForThisMonth.reduce(
    (acc: number, item) => acc + (item.price || 0),
    0
  );

  const budgetLimit = userData.budgetLimit;
  const userCaloricLimit = userData.calorieLimit;

  const hasMonthlyBudgetExceeded = foodCostForThisMonth > budgetLimit;

  const isDailyIntakeExceeded = caloricIntakeForToday > userCaloricLimit;

  return (
    <>
      {isDailyIntakeExceeded && (
        <Alert variant="danger" className="mx-5">
          You have exceeded your daily caloric limit. Your limit is{' '}
          <strong>{userCaloricLimit}</strong> but your intake for today is{' '}
          <strong>{caloricIntakeForToday}</strong>.
        </Alert>
      )}

      {hasMonthlyBudgetExceeded && (
        <Alert variant="warning" className="mx-5">
          You have exceeded your monthly budget. Your limit is <strong>{budgetLimit}$</strong> but
          your expenditure for this month is <strong>{foodCostForThisMonth}$</strong>
        </Alert>
      )}
    </>
  );
};

export default UserAlerts;
