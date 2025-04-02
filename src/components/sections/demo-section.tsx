export function DemoSection() {
  return (
    <section className="relative py-24 bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">See it in Action</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Watch how our template can help you build and launch your SaaS product faster than ever.
          </p>
        </div>

        {/* Video container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <video 
              className="w-full h-full object-cover"
              controls
              poster="/thumbnail-video.png"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Decorative elements */}
          <div className="absolute -z-10 -left-4 -top-4 w-72 h-72 bg-primary-rose/30 rounded-full filter blur-3xl opacity-70 animate-pulse" />
          <div className="absolute -z-10 -right-4 -bottom-4 w-72 h-72 bg-primary-orange/30 rounded-full filter blur-3xl opacity-70 animate-pulse delay-75" />
        </div>
      </div>
    </section>
  )
}
