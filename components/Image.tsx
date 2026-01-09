import NextImage from 'next/image'
import { useState } from 'react'

interface CustomImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  fallback?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

/**
 * Next.jsのImageコンポーネントのラッパー
 * 画像の最適化とエラーハンドリングを提供
 * 
 * 使用例:
 * <Image src="/images/logo.png" alt="Logo" width={200} height={100} />
 * <Image src="/images/post-hero.jpg" alt="Post hero" width={800} height={400} />
 */
export default function Image({
  src,
  alt,
  width,
  height,
  className,
  style,
  fallback = '/images/placeholder.png',
  priority = false,
  fill = false,
  sizes,
}: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && imgSrc !== fallback) {
      setHasError(true)
      setImgSrc(fallback)
    }
  }

  // 外部URLの場合は最適化を無効化
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return (
      <img
        src={src}
        alt={alt}
        onError={handleError}
        className={className}
        style={style}
        width={width}
        height={height}
      />
    )
  }

  // fillプロップが指定されている場合
  if (fill) {
    return (
      <NextImage
        src={imgSrc}
        alt={alt}
        fill
        onError={handleError}
        className={className}
        style={style}
        priority={priority}
        sizes={sizes}
      />
    )
  }

  // widthとheightが必須
  if (!width || !height) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className={className}
        style={style}
      />
    )
  }

  return (
    <NextImage
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      className={className}
      style={style}
      priority={priority}
      sizes={sizes}
    />
  )
}
