import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import App from './App';
import './App.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const queryClient = new QueryClient(); // Create an instance of QueryClient
root.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </AuthProvider>,
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
