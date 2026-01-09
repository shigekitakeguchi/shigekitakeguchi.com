/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // 既存のURL形式 /YYYY/MM/DD/1 を新しいURL形式 /ja/blog/YYYY/MM/DD/1 にリダイレクト
      // SEOを考慮して301リダイレクト（恒久的なリダイレクト）を使用
      {
        source: '/:year(\\d{4})/:month(\\d{1,2})/:day(\\d{1,2})/:slug',
        destination: '/ja/blog/:year/:month/:day/:slug',
        permanent: true, // 301リダイレクト（SEOに最適）
      },
    ]
  },
}

module.exports = nextConfig
