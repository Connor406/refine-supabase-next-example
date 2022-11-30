import { AppProps } from 'next/app';
import { Refine } from '@pankod/refine-core';
import { AuthPage, notificationProvider, ChakraProvider, refineTheme, ReadyPage, ErrorComponent } from '@pankod/refine-chakra-ui';
import Login from '@components/auth/Login';
import routerProvider from '@pankod/refine-nextjs-router';
import { dataProvider } from '@pankod/refine-supabase';
import { authProvider } from 'src/authProvider';
import { supabaseClient } from 'src/services';
import { Title, Sider, Layout, Header } from '@components/layout';
import PostList from '@components/posts/PostList';
import SandwichList from '@components/SandwichList';
import PostEdit from '@components/posts/PostEdit';
import PostCreate from '@components/posts/PostCreate';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(supabaseClient)}
        authProvider={authProvider}
        // LoginPage={() => <AuthPage type="register" providers={[{ name: 'google', label: 'Sign in with Google' }]} />}
        LoginPage={Login}
        notificationProvider={notificationProvider()}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        Title={Title}
        Sider={Sider}
        Layout={Layout}
        Header={Header}
        resources={[
          {
            name: 'posts',
            list: PostList,
            edit: PostEdit,
            create: PostCreate,
          },
          {
            name: 'sandwiches',
            list: SandwichList,
          },
        ]}
      >
        <Component {...pageProps} />
      </Refine>
    </ChakraProvider>
  );
}

export default MyApp;
