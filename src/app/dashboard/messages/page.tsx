import { Metadata } from 'next'
import { ContactList } from '@/components/dashboard/contact-list'

export const metadata: Metadata = {
  title: 'Messages - Dashboard',
  description: 'Gérez vos messages de contact',
}

export default function MessagesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Messages de contact</h1>
        <p className="text-text-secondary mt-2">
          Gérez et répondez à vos messages de contact
        </p>
      </div>

      <ContactList />
    </div>
  )
}
