import React from 'react';
import Page from '@components/layout/Page';
import AuthBackground from '@components/auth/Background';
import ListView from '@components/coin/ListView';

export default function LandingScreen() {
  return (
    <Page>
      <AuthBackground />
      <ListView />
    </Page>
  );
}
