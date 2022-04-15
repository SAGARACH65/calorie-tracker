import React from 'react';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

interface AddEntryBtnProps {
  useMargin?: boolean;
  setModalShownStatus: (value: boolean) => void;
}

const AddEntryBtn = (props: AddEntryBtnProps) => {
  const { setModalShownStatus, useMargin } = props;

  const buttonClass = classnames(
    'rounded-2xl text-xl absolute right-32 mr-10 w-64 h-10 bg-red-500',
    {
      'mt-5': useMargin,
    }
  );

  return (
    <Button onClick={() => setModalShownStatus(true)} className={buttonClass}>
      <FormattedMessage id="app.addNewEntry" />
    </Button>
  );
};

export default AddEntryBtn;
