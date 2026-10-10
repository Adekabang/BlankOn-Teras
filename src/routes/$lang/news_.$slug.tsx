import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import type { NewsLang } from '@/lib/news'
import { baseOptions } from '@/lib/layout.shared'
import SiteFooter from '@/components/site-footer'
import { getNewsArticle } from '@/lib/news'

export const Route = createFileRoute('/$lang/news_/$slug')({
  component: NewsArticlePage,
})

const articleContent = {
  id: {
    back: '← Kembali ke Berita',
    copy: 'Salin',
    copied: 'Tersalin',
    notFoundTitle: 'Berita Tidak Ditemukan',
    notFoundDescription: 'Berita yang Anda cari tidak tersedia.',
  },
  en: {
    back: '← Back to News',
    copy: 'Copy',
    copied: 'Copied',
    notFoundTitle: 'News Not Found',
    notFoundDescription:
      'The news article you are looking for is not available.',
  },
}

function formatDate(date: string, lang: string) {
  return new Date(date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function NewsArticlePage() {
  const { lang, slug } = Route.useParams()
  const content = articleContent[lang as keyof typeof articleContent]
  const article = getNewsArticle(slug, lang as NewsLang)
  const bodyRef = useRef<HTMLElement>(null)

  // The article body is plain HTML from Markdown, so each code block gets its
  // copy button attached here.
  useEffect(() => {
    const body = bodyRef.current
    if (!body) return

    const buttons = Array.from(body.querySelectorAll('pre')).map((pre) => {
      pre.classList.add('relative')
      const button = document.createElement('button')
      button.type = 'button'
      button.textContent = content.copy
      button.className =
        'absolute right-2 top-2 rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs text-white hover:bg-white/20'
      button.addEventListener('click', () => {
        void navigator.clipboard.writeText(
          pre.querySelector('code')?.textContent ?? '',
        )
        button.textContent = content.copied
        setTimeout(() => {
          button.textContent = content.copy
        }, 1500)
      })
      pre.appendChild(button)
      return button
    })

    return () => buttons.forEach((button) => button.remove())
  }, [article, content])

  return (
    <HomeLayout {...baseOptions(lang)}>
      <main className="flex flex-1 flex-col">
        <section className="bg-fd-background py-20">
          <div className="container mx-auto max-w-3xl px-6">
            <Link
              to="/$lang/news"
              params={{ lang }}
              className="mb-8 inline-block font-medium text-blue-600 dark:text-blue-400"
            >
              {content.back}
            </Link>

            {article ? (
              <>
                <p className="mb-2 text-sm text-fd-muted-foreground">
                  {formatDate(article.date, lang)}
                </p>
                <article
                  ref={bodyRef}
                  className="prose dark:prose-invert max-w-none prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2"
                  dangerouslySetInnerHTML={{ __html: article.html }}
                />
              </>
            ) : (
              <div className="text-center">
                <h1 className="mb-4 text-3xl font-bold text-fd-foreground">
                  {content.notFoundTitle}
                </h1>
                <p className="text-fd-muted-foreground">
                  {content.notFoundDescription}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </HomeLayout>
  )
}
