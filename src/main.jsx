import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routing/routeTree.js'
import store from './store/store.js'
import { Provider } from 'react-redux'

export const queryClient = new QueryClient()
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store
  }
})

const rootElement = document.getElementById('root')
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  )
}
