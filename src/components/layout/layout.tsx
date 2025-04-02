import { Header } from './header'
import { Footer } from './footer'
import { LiveChat } from '../chat/live-chat'
import { RecentPurchases } from '../notifications/recent-purchases'


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <LiveChat />
      <RecentPurchases />

    </div>
  )
}
