import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppPluginMeta, AppRootProps, PluginMetaInfo, PluginType } from '@grafana/data';

const THREE_HOURS = 1000 * 60 * 60 * 3;

export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      retryOnMount: false,
      staleTime: THREE_HOURS,
      suspense: true,
    },
  },
});

type AppPluginSettings = { baseUrl: string; instance: number };

export const testPluginMeta = {
  id: 'id',
  name: 'name',
  type: PluginType.app,
  enabled: true,
  jsonData: { baseUrl: 'http://localhost', instance: 1 } as AppPluginSettings,
  info: {
    logos: {
      large: 'logo.png',
      small: 'logo.png',
    },
  } as PluginMetaInfo,
} as AppPluginMeta<AppPluginSettings>;

export const appProps: AppRootProps = {
  meta: testPluginMeta,
} as unknown as AppRootProps;

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <TestWrapperWithCustomQueryClient queryClient={testQueryClient}>{children}</TestWrapperWithCustomQueryClient>;
};

export const TestWrapperWithCustomQueryClient = ({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};
