import { useState } from 'react';
import { AuthPage } from '@pankod/refine-chakra-ui';
import { useRouter } from 'next/router';

export default function Login() {
  const { query } = useRouter();

  const queryRouter = {
    '/register': <AuthPage type="register" />,
    '/forgot-password': <AuthPage type="forgotPassword" />,
    '/update-password': <AuthPage type="updatePassword" />,
  };

  if (!query.to) {
    return <AuthPage type="login" />;
  }

  // @ts-ignore
  return queryRouter[query.to];
}
