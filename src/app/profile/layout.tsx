import { Metadata } from 'next'
import { Header } from '@/components/layout/header'

export const metadata: Metadata = {
  title: 'User Profile | ShipFastStarter',
  description: 'Manage your profile and personal information',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex-1 pt-24">
        {children}
      </div>
    </div>
  )
}
