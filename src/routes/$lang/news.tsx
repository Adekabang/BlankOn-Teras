import { Link, createFileRoute } from '@tanstack/react-router'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import type { NewsLang } from '@/lib/news'
import { baseOptions } from '@/lib/layout.shared'
import SiteFooter from '@/components/site-footer'
import { getNewsList } from '@/lib/news'

export const Route = createFileRoute('/$lang/news')({
  component: News,
})

const newsContent = {
  id: {
    empty: 'Belum ada berita. Nantikan kabar terbaru dari kami.',
    readMore: 'Baca Selengkapnya',
  },
  en: {
    empty: 'No news yet. Stay tuned for updates.',
    readMore: 'Read More',
  },
}

function formatDate(date: string, lang: string) {
  return new Date(date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function News() {
  const { lang } = Route.useParams()
  const content = newsContent[lang as keyof typeof newsContent]
  const articles = getNewsList(lang as NewsLang)

  return (
    <HomeLayout {...baseOptions(lang)}>
      <main className="flex flex-1 flex-col">
        {/* News list */}
        <section className="bg-fd-background py-20">
          <div className="container mx-auto max-w-5xl px-6">
            {articles.length === 0 ? (
              <p className="text-center text-lg text-fd-muted-foreground">
                {content.empty}
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    to="/$lang/news/$slug"
                    params={{ lang, slug: article.slug }}
                    className="flex flex-col rounded-2xl border border-fd-border bg-fd-card p-6 transition-colors hover:border-blue-400"
                  >
                    <span className="mb-2 text-sm text-fd-muted-foreground">
                      {formatDate(article.date, lang)}
                    </span>
                    <h2 className="mb-3 text-xl font-bold text-fd-foreground">
                      {article.title}
                    </h2>
                    <p className="mb-4 flex-1 text-fd-muted-foreground">
                      {article.excerpt}
                    </p>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {content.readMore} →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </HomeLayout>
  )
}
