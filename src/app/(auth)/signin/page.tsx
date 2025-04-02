import { SignInForm } from '@/components/auth/signin-form'

export default function SignInPage() {
  return (
    <main className="relative overflow-hidden bg-background min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-light/30 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-dark/30 rounded-full filter blur-3xl opacity-70 animate-pulse delay-75" />
        <div className="absolute -z-10 inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8 lg:py-32">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary-light">Welcome Back</span>
            </h1>
            <p className="text-text-secondary">Sign in to your account to continue</p>
          </div>
          <SignInForm />
        </div>
      </div>
    </main>
  )
}
