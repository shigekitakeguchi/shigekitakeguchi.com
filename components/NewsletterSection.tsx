'use client';

import { useState } from 'react';
import { Locale } from '@/types';

interface NewsletterSectionProps {
  locale: Locale;
  dict: Record<string, string>;
}

export default function NewsletterSection({ locale, dict }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Subscribe:', email);
  };

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto bg-neutral-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-4">
          {dict['newsletter.title']}
        </h2>
        <p className="text-base leading-relaxed text-neutral-700 mb-6">
          {dict['newsletter.sub']}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict['newsletter.placeholder']}
            required
            className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400"
          >
            {dict['newsletter.submit']}
          </button>
        </form>
      </div>
    </section>
  );
}



