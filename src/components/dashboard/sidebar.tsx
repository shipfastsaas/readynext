'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  NewspaperIcon, 
  CreditCardIcon, 
  HomeIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon 
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import clsx from 'clsx'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/dashboard/users', icon: UsersIcon },
  { name: 'Blog Posts', href: '/dashboard/posts', icon: NewspaperIcon },
  { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCardIcon },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6">
        <div className="flex h-16 shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="nextready Logo"
            width={170}
            height={80}
            className="dark:invert"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={clsx(
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          {
                            'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white': isActive,
                            'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white':
                              !isActive,
                          }
                        )}
                      >
                        <item.icon
                          className={clsx('h-6 w-6 shrink-0', {
                            'text-gray-900 dark:text-white': isActive,
                            'text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white':
                              !isActive,
                          })}
                        />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
