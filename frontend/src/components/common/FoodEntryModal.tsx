import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

import UserFoodForm from 'domains/misc/UserFoodForm';
import {getISODate} from 'utils/date'

interface FoodEntryModalProps {
  id?: string;
  showModal: boolean;
  initialValues?: any;
  handleClose: () => void;
  allUsers?: { username: string; id: string }[];
  handleSubmit: (data: UserFoodForm) => void;
}

const FoodEntryModal = (props: FoodEntryModalProps) => {
  const { showModal, id, allUsers, handleClose } = props;

  const { register, handleSubmit } = useForm({
    defaultValues: props.initialValues ? props.initialValues : {},
  });

  //  If there is a id then its in edit mode
  const isEdit = !!id;

  const onSubmit = (data: UserFoodForm) => {
    props.handleSubmit({
      ...data,
      ...(isEdit ? { id } : {}),
      calories: +data.calories,
      price: +data.price,
    });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit food entry' : 'Add food entry'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex items-center justify-between	">
            <div>Food Name*:</div>
            <input
              className="m-2 border-1 p-2"
              type="text"
              maxLength={100}
              placeholder="Enter Food Name"
              {...register('foodName', { required: true, max: 100, min: 1 })}
            />
          </div>
          <div className="flex items-center justify-between	">
            <div>Calories*:</div>
            <input
              className="m-2 border-1 p-2"
              type="number"
              min={'0'}
              placeholder="Food Calories"
              {...register('calories', { required: true, max: 20000, min: 0 })}
            />
          </div>
          <div className="flex items-center justify-between	">
            <div>Food Price ($):</div>
            <input
              className="m-2 border-1 p-2"
              type="number"
              min={'0'}
              placeholder="Enter Food Price in ($)"
              {...register('price', { min: 0 })}
            />
          </div>
          <div className="flex items-center justify-between	">
            <div>Food Consumed Date*:</div>
            <input
              className="m-2 border-1 p-2"
              type="date"
              max={getISODate(new Date())}
              placeholder="Add the date food was consumed at*"
              {...register('foodTakeOnDate', { required: true })}
            />
          </div>
          <div className="flex items-center justify-between	">
            <div>Food Consumed Time:</div>
            <input
              className="m-2 border-1 p-2"
              type="time"
              placeholder="Add the time food was consumed at"
              {...register('foodTakeOnTime', { required: false })}
            />
          </div>

          {allUsers && !!allUsers.length && (
            <div className="flex items-center justify-between	">
              <div>Select User:</div>
              <select {...register('assignee')} className="w-32 h-12 border bg-white">
                {allUsers.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.username}
                  </option>
                ))}
              </select>
            </div>
          )}

          <input className="rounded-2xl text-xl bg-red-500 text-white h-10 m-3" type="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FoodEntryModal;
