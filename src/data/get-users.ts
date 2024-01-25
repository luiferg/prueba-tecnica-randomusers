import { getUsers } from '@/server/actions'
import { useQuery } from '@tanstack/react-query'

export function useGetUsers() {
  return useQuery({
    queryFn: async () => getUsers(),
    queryKey: ['users'],
  })
}
