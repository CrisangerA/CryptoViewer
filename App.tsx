import React, {PropsWithChildren} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationComponentProps} from 'react-native-navigation';
// Contexts
//import dependencyInjection from 'src/config/di';
import {NavigationProvider} from 'src/ui/contexts/NavigationContext';
import {CoinsProvider} from '@contexts/CoinsContext';

// -----------------------------------------------------
//
// If you want implement a custom Wrapper auth here as example <AuthProvider />
const queryClient = new QueryClient();

export default function WrapApp({
  componentId,
  children,
}: PropsWithChildren<NavigationComponentProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider componentId={componentId}>
        <CoinsProvider>{children}</CoinsProvider>
      </NavigationProvider>
    </QueryClientProvider>
  );
}
