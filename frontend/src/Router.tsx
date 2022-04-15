import { Route, BrowserRouter, Switch } from 'react-router-dom';

import * as routes from 'constants/routes';
import HomePage from 'components/home/Home';
import LoginPage from 'components/login/Login';
import AdminPage from 'components/admin/Admin';
import ReportsPage from 'components/admin/Reports';

const RouterView = () => (
  <BrowserRouter>
    <Switch>
      <Route path={routes.LOGIN_PAGE} component={LoginPage} />
      <Route path={routes.HOME_PAGE} component={HomePage} />
      <Route path={routes.ADMIN_HOME_PAGE} component={AdminPage} />
      <Route path={routes.ADMIN_REPORTS} component={ReportsPage} />
    </Switch>
  </BrowserRouter>
);

export default RouterView;
