import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

import { Routes } from './routes';

import { AuthProvider } from './contexts/AuthContext';

import GlobalStyles from './styles/global'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export { App };
