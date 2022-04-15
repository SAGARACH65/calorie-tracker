import React from 'react';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import UserTypes from 'enums/UserTypes';
import getUserData from 'gql/getUserData';
import getAllUsers from 'gql/getAllUsers';
import getAllFoods from 'gql/getAllFoods';
import * as routes from 'constants/routes';
import AdminIntro from './common/AdminIntro';
import Filters from 'components/common/Filters';
import UserFood from 'domains/responses/UserFood';
import FoodCard from 'components/common/FoodCard';
import LogoutBtn from 'components/common/LogoutBtn';
import UserFoodForm from 'domains/misc/UserFoodForm';
import AddEntryBtn from 'components/common/AddEntryBtn';
import FoodEntryModal from 'components/common/FoodEntryModal';
import adminCreateFoodEntryGQL from 'gql/adminCreateFoodEntry';

const Admin = (props: RouteComponentProps) => {
  const { loading, error, data: userData } = useQuery(getUserData);
  const { data: allUsers } = useQuery(getAllUsers);
  const {
    loading: isFetchingData,
    error: err,
    data: allUserFood,
    refetch: refetchAllFoodData,
  } = useQuery(getAllFoods);

  const [addFoodEntry] = useMutation(adminCreateFoodEntryGQL);

  const [filterStartDate, setFilterStartDate] = React.useState('');
  const [filterEndDate, setFilterEndDate] = React.useState('');

  const [showModal, setModalShownStatus] = React.useState<boolean>(false);

  const handleSubmit = async (data: UserFoodForm) => {
    await addFoodEntry({ variables: data });
    refetchAllFoodData();
    closeModal();
  };

  const closeModal = () => {
    setModalShownStatus(false);
  };

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

  const filteredData =
    filterStartDate && filterEndDate
      ? allUserFood.allFoodEntries.filter(
          (entry: UserFood) =>
            entry.foodTakenOnDate >= filterStartDate && entry.foodTakenOnDate <= filterEndDate
        )
      : allUserFood.allFoodEntries;

  return (
    <div className="w-full h-screen	overflow-y-scroll relative font-courierPrime p-2 items-center bg-gradient-to-b from-green-500 to-green-800">
      <div className="flex">
        <AdminIntro username={user.username} />
        <Button
          className="rounded-2xl text-xl absolute right-24 mt-5 mr-10 w-64 h-10 bg-red-500"
          onClick={() => {
            props.history.push(routes.ADMIN_REPORTS);
          }}
        >
          <FormattedMessage id="app.viewReports" />
        </Button>

        <Button
          className="rounded-2xl text-xl absolute right-96 mt-5 mr-10 w-64 h-10 bg-red-500"
          onClick={() => {
            props.history.push(routes.HOME_PAGE);
          }}
        >
          <FormattedMessage id="app.goToHome" />
        </Button>

        <LogoutBtn />
      </div>

      <AddEntryBtn setModalShownStatus={setModalShownStatus} />

      <Filters
        setFilterStartDate={setFilterStartDate}
        filterStartDate={filterStartDate}
        setFilterEndDate={setFilterEndDate}
        filterEndDate={filterEndDate}
      />
      <>
        {filteredData.map((entry: UserFood) => (
          <FoodCard foodEntry={entry} key={entry.id} refetchUserConsumedData={refetchAllFoodData} />
        ))}
      </>

      {showModal && (
        <FoodEntryModal
          showModal={showModal}
          handleSubmit={handleSubmit}
          allUsers={allUsers.allUsers}
          handleClose={() => closeModal()}
        />
      )}
    </div>
  );
};

export default withRouter(Admin);
