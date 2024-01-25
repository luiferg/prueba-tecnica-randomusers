'use client'
import { useState } from 'react'
// React-query provider implementation for SSR, more info at: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
// Have in account that this Next app is using App Router, NOT Pages Router.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
            refetchInterval: 60 * 1000,
            // Disable automatic refetching on window focus
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
