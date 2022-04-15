import React from 'react';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';

const LogoutBtn = () => (
  <Button
    className="absolute right-0 mt-5 mr-10"
    onClick={() => {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }}
  >
    <FormattedMessage id="app.logout" />
  </Button>
);

export default LogoutBtn;
