import React from 'react';
import { FormattedMessage } from 'react-intl';

interface FilterProps {
  filterEndDate: string;
  filterStartDate: string;
  setFilterStartDate: (value: string) => void;
  setFilterEndDate: (value: string) => void;
}

const Filters = (props: FilterProps) => {
  const { setFilterStartDate, filterStartDate, setFilterEndDate, filterEndDate } = props;

  return (
    <div className="mt-5">
      <div className="flex bg-white m-5 items-center">
        <div className="text-xl ml-5 text-green-700">
          <FormattedMessage id="app.filter" />
        </div>
        <div className="ml-10">From</div>
        <input
          className="m-2 border-1 p-2"
          type="date"
          onChange={(e) => {
            setFilterStartDate(e.target.value);
          }}
          value={filterStartDate}
        />

        <div>To</div>

        <input
          className="m-2 border-1 p-2"
          type="date"
          onChange={(e) => {
            setFilterEndDate(e.target.value);
          }}
          value={filterEndDate}
        />
      </div>
    </div>
  );
};

export default Filters;
