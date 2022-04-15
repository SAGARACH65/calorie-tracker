import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation, ApolloQueryResult } from '@apollo/client';

import { getISODate } from 'utils/date';
import FoodEntryModal from './FoodEntryModal';
import editFoodEntryGQL from 'gql/editFoodEntry';
import UserFood from 'domains/responses/UserFood';
import deleteFoodEntryGQL from 'gql/removeFoodEntry';
import UserFoodForm from 'domains/misc/UserFoodForm';

interface FoodCardProps {
  foodEntry: UserFood;
  refetchUserConsumedData: () => Promise<ApolloQueryResult<any>>;
}

const FoodCard = (props: FoodCardProps) => {
  const { foodEntry, refetchUserConsumedData } = props;
  const {
    id,
    name,
    price,
    username,
    createdAt,
    calorieCount,
    foodTakenOnTime,
    foodTakenOnDate,
  } = foodEntry;
  const [showModal, setModalShownStatus] = React.useState<boolean>(false);

  const [removeFoodEntry] = useMutation(deleteFoodEntryGQL);
  const [editFoodEntry] = useMutation(editFoodEntryGQL);

  const deleteFood = async () => {
    await removeFoodEntry({ variables: { entryId: id } });
    refetchUserConsumedData();
  };

  const handleEdit = async (data: UserFoodForm) => {
    await editFoodEntry({ variables: data });
    refetchUserConsumedData();
    closeModal();
  };

  const closeModal = () => {
    setModalShownStatus(false);
  };

  return (
    <div className="rounded-lg border border-green-700 p-5 m-5 bg-white shadow-zinc-50	flex justify-between">
      <div>
        <div className="text-5xl text-green-700">{name}</div>
        {username && <div className="text-4xl text-green-700">User:{username}</div>}
        <div className="text-2xl text-green-500">{calorieCount} Calories</div>
        <div className="text-2xl text-green-400">Price: {price || 'N/A'}$</div>
        <div className="text-xl">
          You had this food at: {`${foodTakenOnDate} (${foodTakenOnTime})`}
        </div>
        <div>Created At:{getISODate(new Date(+createdAt))}</div>
      </div>

      <div className="flex ">
        <button
          className="rounded-lg bg-green-300 text-white items-center flex m-2	justify-center h-10 w-20"
          onClick={() => setModalShownStatus(true)}
        >
          <FormattedMessage id="app.edit" />
        </button>

        <button
          className="rounded-lg bg-red-300 text-white items-center flex m-2 justify-center	h-10 w-20"
          onClick={() => deleteFood()}
        >
          <FormattedMessage id="app.delete" />
        </button>
      </div>

      {showModal && (
        <FoodEntryModal
          showModal={showModal}
          id={id}
          initialValues={{
            foodName: name,
            calories: calorieCount,
            price: price,
            foodTakeOnDate: foodTakenOnDate,
            foodTakeOnTime: foodTakenOnTime,
          }}
          handleSubmit={handleEdit}
          handleClose={closeModal}
        />
      )}
    </div>
  );
};
export default FoodCard;
