import { GetServerSideProps } from 'next'
import { defaultLocale } from '@/i18n'

export default function Home() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/${defaultLocale}`,
      permanent: false,
    },
  }
}


