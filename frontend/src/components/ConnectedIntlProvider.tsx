import { IntlProvider } from 'react-intl';

import translationsForUsersLocale from 'i18n/en-us/app.json';

interface ComponentProps {
  locale: string;
  children: React.ReactNode;
}

type ConnectedIntlProviderProps = ComponentProps;

const ConnectedIntlProvider = (props: ConnectedIntlProviderProps) => {
  const { locale, children } = props;

  const handleError = (err: any) => {
    // eslint-disable-next-line no-console
    console.error({ err });

    // Can be configured to have sentry later on
  };

  return (
    <IntlProvider locale={locale} messages={translationsForUsersLocale} onError={handleError}>
      {children}
    </IntlProvider>
  );
};

export default ConnectedIntlProvider;
