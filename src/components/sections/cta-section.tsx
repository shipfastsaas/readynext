export function CtaSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-rose/30 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary-purple/30 rounded-full filter blur-3xl opacity-70 animate-pulse delay-75" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-20 shadow-xl sm:px-12 sm:py-32 md:px-20">
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Call-to-Action{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">Section</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              This is where you should place your final call-to-action. Make it compelling and clear what you want visitors to do next. Focus on the main conversion goal of your website.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <a
                href="#"
                className="rounded-full bg-gradient-to-r from-primary-rose to-primary-purple px-8 py-4 text-base font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
              >
                Primary CTA Button
              </a>
              <a
                href="#"
                className="text-base font-semibold leading-7 text-white hover:text-gray-300 transition-colors"
              >
                Secondary Action <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.15" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#FF8C8C" />
                <stop offset={1} stopColor="#A855F7" />
              </radialGradient>
            </defs>
          </svg>

          {/* Stats */}
          <div className="relative mt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-6 text-center sm:grid-cols-3">
                {[
                  { label: 'Statistic 1', value: 'Value 1' },
                  { label: 'Statistic 2', value: 'Value 2' },
                  { label: 'Statistic 3', value: 'Value 3' },
                ].map((stat) => (
                  <div key={stat.label} className="mx-auto flex flex-col gap-y-2">
                    <dt className="text-base leading-7 text-gray-300">{stat.label}</dt>
                    <dd className="text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
