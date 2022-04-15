import React from 'react';
import Card from 'react-bootstrap/Card';
import { useMutation } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import UserTypes from 'enums/UserTypes';
import * as routes from 'constants/routes';
import getUserToken from 'gql/getUserToken';

const Login = (props: RouteComponentProps) => {
  const [userId, setUserId] = React.useState('');
  const [error, setError] = React.useState('');
  const [loginUser] = useMutation(getUserToken);

  const handleUserIdChange = (e: any) => {
    const value = e.target.value;

    setUserId(value);
    setError('');
  };

  const handleLogin = async () => {
    const res = await loginUser({ variables: { userName: userId } });

    const token = res.data.userToken?.userToken;

    if (token) {
      localStorage.setItem('accessToken', token);

      setError('');
      const isAdmin = res.data.userToken.role === UserTypes.ADMIN;

      props.history.replace(isAdmin ? routes.ADMIN_HOME_PAGE : routes.HOME_PAGE);

      return;
    }

    setError('User is not present');
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-green-500 to-green-800	flex p-5">
      <form
        className="align-center mt-10 mx-auto m-96 my-auto w-2/6	h-200"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleLogin();
        }}
      >
        <Card className="flex flex-col items-center	p-5">
          <input
            id="standard-basic"
            value={userId}
            className="p-5 border"
            onChange={handleUserIdChange}
            placeholder="Username"
          />

          {error && <div className="text-red-400">{error}</div>}

          <button
            type="submit"
            className="text-white bg-yellow-400 hover:bg-yellow-500 hover:text-black border-0	rounded-lg 	px-20 py-3 font-black	 -left-4	mt-10 	uppercase"
          >
            <FormattedMessage id="app.login" />
          </button>
        </Card>
      </form>
    </div>
  );
};

export default withRouter(Login);
