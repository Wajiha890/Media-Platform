import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import ErrorBoundary from './components/common/ErrorBoundary'
import OfflineIndicator from './components/common/OfflineIndicator'
import './styles/globals.css'

// React Query Client Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
              style: {
                background: '#10b981',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ed4956',
                secondary: '#fff',
              },
              style: {
                background: '#ed4956',
              },
            },
            loading: {
              duration: 2000,
              style: {
                background: '#0095f6',
              },
            },
          }}
        />
        <OfflineIndicator />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)