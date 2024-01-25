import { UserProps } from '@/types'

export async function getUsers(): Promise<UserProps[]> {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=100&seed=foobar`
    )
    const { results } = await response.json()
    return results
  } catch (error) {
    console.error(error)
    return []
  }
}
