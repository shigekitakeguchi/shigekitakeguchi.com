import { useEffect, useRef } from 'react'

interface DisqusProps {
  shortname?: string
  identifier: string
  title: string
  url: string
}

export default function Disqus({ shortname = 'shigekitakeguchilog', identifier, title, url }: DisqusProps) {
  const disqusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !disqusRef.current) return

    // Disqusスクリプトが既に読み込まれているかチェック
    if ((window as any).DISQUS) {
      ;(window as any).DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = identifier
          this.page.url = url
          this.page.title = title
        },
      })
    } else {
      // Disqusスクリプトを読み込む
      const script = document.createElement('script')
      script.src = `https://${shortname}.disqus.com/embed.js`
      script.setAttribute('data-timestamp', String(+new Date()))
      script.async = true
      document.body.appendChild(script)
    }
  }, [shortname, identifier, title, url])

  return <div ref={disqusRef} id="disqus_thread" />
}

// TypeScript用の型定義
declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean
        config: () => void
      }) => void
    }
  }
}
