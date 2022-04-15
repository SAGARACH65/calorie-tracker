import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import UserAlerts from './UserAlerts';
import getUserData from 'gql/getUserData';
import Filters from 'components/common/Filters';
import AddEntryBtn from '../common/AddEntryBtn';
import FoodCard from 'components/common/FoodCard';
import UserFood from 'domains/responses/UserFood';
import LogoutBtn from 'components/common/LogoutBtn';
import createFoodEntryGql from 'gql/createFoodEntry';
import UserFoodForm from 'domains/misc/UserFoodForm';
import getUserConsumedFood from 'gql/getUserConsumedFoods';
import FoodEntryModal from 'components/common/FoodEntryModal';

const Home = () => {
  const { loading, error, data: userData } = useQuery(getUserData);
  const {
    loading: isFetchingData,
    error: err,
    data: userConsumedData,
    refetch: refetchUserConsumedData,
  } = useQuery(getUserConsumedFood, { fetchPolicy: 'network-only' });

  const [addFoodEntry] = useMutation(createFoodEntryGql);

  const [filterStartDate, setFilterStartDate] = React.useState('');
  const [filterEndDate, setFilterEndDate] = React.useState('');
  const [showModal, setModalShownStatus] = React.useState<boolean>(false);

  const handleSubmit = async (data: UserFoodForm) => {
    await addFoodEntry({ variables: data });

    refetchUserConsumedData();
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

  const foodEntries: UserFood[] = userConsumedData.foodEntries;

  const isUserEntriesEmpty = !userConsumedData || !foodEntries.length;

  const user = userData.user;
  const areFiltersSet = filterStartDate && filterEndDate;

  // If the filters are set, filter the data based on that else use the original data.
  const filteredData = areFiltersSet
    ? foodEntries.filter(
        (entry) =>
          entry.foodTakenOnDate >= filterStartDate && entry.foodTakenOnDate <= filterEndDate
      )
    : foodEntries;

  return (
    <div className="w-full h-screen	overflow-y-scroll  relative	font-courierPrime p-2 items-center bg-gradient-to-b from-green-500 to-green-800">
      <div className="flex">
        <div className="bg-white p-3 m-2 mx-5 text-lg items-center text-blue-400	">
          <div>Welcome {user.username}</div>
          <div>Your daily calorie limit: {user.calorieLimit}</div>
          <div>Your monthly budget limit: {user.budgetLimit}$</div>
        </div>
        <AddEntryBtn setModalShownStatus={setModalShownStatus} useMargin={true} />
        <LogoutBtn />
      </div>

      <UserAlerts userConsumedData={userConsumedData.foodEntries} userData={userData.user} />

      <div className="mt-5">
        <Filters
          setFilterStartDate={setFilterStartDate}
          filterStartDate={filterStartDate}
          setFilterEndDate={setFilterEndDate}
          filterEndDate={filterEndDate}
        />
        <>
          {isUserEntriesEmpty ? (
            <div className="p-5">
              You have entered no data. Start tracking your calories by adding a entry.
            </div>
          ) : (
            filteredData.map((entry: UserFood) => (
              <FoodCard
                foodEntry={entry}
                key={entry.id}
                refetchUserConsumedData={refetchUserConsumedData}
              />
            ))
          )}
        </>
      </div>

      {showModal && (
        <FoodEntryModal
          showModal={showModal}
          handleSubmit={handleSubmit}
          handleClose={() => closeModal()}
        />
      )}
    </div>
  );
};

export default Home;
