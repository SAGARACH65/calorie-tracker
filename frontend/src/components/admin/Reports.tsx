import React from 'react';
import { useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import UserTypes from 'enums/UserTypes';
import getUserData from 'gql/getUserData';
import getAllFoods from 'gql/getAllFoods';
import * as routes from 'constants/routes';
import AdminIntro from './common/AdminIntro';
import LogoutBtn from 'components/common/LogoutBtn';
import { generateReportForAllUsers } from 'services/admin';

const Reports = (props: RouteComponentProps) => {
  const { loading, error, data: userData } = useQuery(getUserData);
  const { loading: isFetchingData, error: err, data: allUserFood } = useQuery(getAllFoods, {
    fetchPolicy: 'network-only',
  });

  if (loading || isFetchingData) {
    // TODO: Add a fancy skeleton preloader
    return <div>Loading....</div>;
  }

  if (error || err) {
    return <div>{error?.message || err?.message}</div>;
  }

  const user = userData.user;

  if (user.role !== UserTypes.ADMIN) {
    return (
      <div>
        <FormattedMessage id="app.notAuthorized" />
      </div>
    );
  }

  const reports = generateReportForAllUsers(allUserFood.allFoodEntries);

  return (
    <div className="w-full h-screen	overflow-y-scroll relative	font-courierPrime p-2 items-center bg-gradient-to-b from-green-500 to-green-800">
      <div className="flex">
        <AdminIntro username={user.username} />

        <Button
          className="rounded-2xl text-xl absolute right-96 mt-5  w-48 h-10 bg-red-500"
          onClick={() => props.history.push(routes.ADMIN_HOME_PAGE)}
        >
          <FormattedMessage id="app.viewAdminPage" />
        </Button>

        <Button
          className="rounded-2xl text-xl absolute right-40 mt-5  w-48 h-10 bg-red-500"
          onClick={() => props.history.push(routes.HOME_PAGE)}
        >
          <FormattedMessage id="app.goToUser" />
        </Button>

        <LogoutBtn />
      </div>
      <div>
        <div>Reports</div>

        <table>
          <tr>
            <th>UserName</th>
            <th>Added Entries in the last 7 days</th>
            <th>Added Entries the week before the last 7 days</th>
            <th>Average no of calories per user for the last 7 days</th>
          </tr>

          {reports.map((userReport) => (
            <tr key={userReport.userName}>
              <td>{userReport.userName}</td>
              <td>{userReport.averageEntriesPast7Days}</td>
              <td>{userReport.averageEntriesPastWeek}</td>
              <td>{userReport.averageCalorieLast7Days}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default withRouter(Reports);
