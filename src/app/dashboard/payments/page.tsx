import { PaymentsList } from '@/components/dashboard/payments-list'

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments</h1>
      <PaymentsList />
    </div>
  )
}
