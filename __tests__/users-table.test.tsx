import { render, screen, waitFor } from '@testing-library/react'
import { useGetUsers } from '@/data/get-users'
import UsersTable from '@/components/users-table'

// Mock the useGetUsers hook to return a known value
jest.mock('../src/data/get-users', () => ({
  useGetUsers: jest.fn(),
}))

describe('UsersTable', () => {
  beforeEach(() => {
    // Mock implementation of useGetUsers
    ;(useGetUsers as jest.Mock).mockImplementation(() => ({
      data: [],
      error: null,
      isLoading: false,
      refetch: jest.fn(),
    }))
  })

  it('renders correctly', () => {
    render(<UsersTable />)
    expect(screen.getByText('País')).toBeInTheDocument
  })

  it('calls useGetUsers on mount', () => {
    render(<UsersTable />)
    expect(useGetUsers).toHaveBeenCalled
  })

  it('renders the users', async () => {
    const users = [
      {
        name: {
          first: 'Test',
          last: 'User',
        },
        email: 'jj@jj.com',
        picture: {
          medium: 'src.com',
        },
        location: {
          country: 'Test Country',
        },
      },
    ]
    ;(useGetUsers as jest.Mock).mockImplementation(() => ({
      data: users,
      error: null,
      isLoading: false,
      refetch: jest.fn(),
    }))
    render(<UsersTable />)
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument
    })
  })
})
