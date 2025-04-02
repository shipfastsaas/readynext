import { Metadata } from 'next'
import { UserList } from '@/components/dashboard/user-list'

export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage your users',
}

export default function UsersPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-text-primary">Users</h1>
          <p className="mt-2 text-sm text-text-secondary">
            A list of all users registered on your platform including their name, email, and status.
          </p>
        </div>
      </div>
      <UserList />
    </div>
  )
}
