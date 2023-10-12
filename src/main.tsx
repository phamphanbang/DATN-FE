import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ChakraProvider
} from "@chakra-ui/react";
import { RouterProvider } from 'react-router-dom';
import QueryProvider from 'api/RequestProvider';
import { RecoilRoot } from 'recoil';
import router from './routes/index';
import theme from 'themes/theme';
import AxiosProvider from 'api/AxiosProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AxiosProvider>
      <QueryProvider>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </RecoilRoot>
      </QueryProvider>
    </AxiosProvider>
  </React.StrictMode>,
)
