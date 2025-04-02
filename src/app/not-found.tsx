export default function NotFound() {
  return (
    <section className="relative py-24 bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-rose/30 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary-purple/30 rounded-full filter blur-3xl opacity-70 animate-pulse delay-75" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative px-6 mx-auto max-w-4xl lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">
              404
            </span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Désolé, nous n&apos;avons pas trouvé la page que vous cherchez.
          </p>
          <a
            href="/"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-primary-rose to-primary-purple hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </section>
  )
}
