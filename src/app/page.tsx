import UsersTable from '@/components/users-table'
import { ThemeSwitcher } from '@/components/theme-switcher'
import Title from '@/components/ui/title'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getUsers } from '@/server/actions'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  return (
    <main className='flex min-h-screen max-w-[1280px] flex-col gap-2 items-center mx-auto px-4 py-12 relative'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ThemeSwitcher />
        <Title>Prueba técnica</Title>
        <UsersTable />
      </HydrationBoundary>
    </main>
  )
}
