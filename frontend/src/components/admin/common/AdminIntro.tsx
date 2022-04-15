import React from 'react';
import { FormattedMessage } from 'react-intl';

interface AdminIntroProps {
  username: string;
}

const AdminIntro = (props: AdminIntroProps) => (
  <div className="bg-white p-3 m-2 mx-5 text-lg items-center text-blue-400	">
    <div>
      <FormattedMessage id="admin.welcome" values={{ username: props.username }} />
    </div>
    <div>
      <FormattedMessage id="admin.alert" />
    </div>
  </div>
);

export default AdminIntro;
