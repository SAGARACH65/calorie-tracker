import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from 'App';
import { DEFAULT_LANGUAGE } from 'constants/common';
import ConnectedIntlProvider from 'components/ConnectedIntlProvider';

import client from './apolloConfig';

const startApp = async () => {
  const token = localStorage.getItem('accessToken');

  const isLoginPage = window.location.href.includes('login');

  if (!token && !isLoginPage) {
    window.location.href = '/login';
  }

  ReactDOM.render(
    <ApolloProvider client={client}>
      <ConnectedIntlProvider locale={DEFAULT_LANGUAGE}>
        <App />
      </ConnectedIntlProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );

  return;
};

startApp();
