import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider } from 'react-query'

import { Routes } from './routes';

import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

import { queryClient } from './services/queryClient';

import GlobalStyles from './styles/global'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <Routes />

            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                error: {
                  iconTheme: {
                    primary: 'var(--red)',
                    secondary: 'var(--white)',
                  },
                  style: {
                    color: 'var(--black)',
                  }
                }
              }}
            />
            <GlobalStyles />
          </NotificationProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export { App };
