import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ChakraProvider
} from "@chakra-ui/react";
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import router from './routes/index';
import theme from 'themes/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
