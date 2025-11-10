export type Walk = {
  id: string;
  title_ja: string;
  title_en: string;
  thumbnail: string;
  youtubeId: string;
  region:
    | 'Hokkaido'
    | 'Tohoku'
    | 'Kanto'
    | 'Chubu'
    | 'Kinki'
    | 'Chugoku'
    | 'Shikoku'
    | 'Kyushu';
  time: 'Day' | 'Night';
  featured?: boolean;
};

export type Article = {
  id: string;
  title_ja: string;
  title_en: string;
  excerpt_ja: string;
  excerpt_en: string;
  url: string;
  thumbnail?: string;
};

export type Series = {
  id: string;
  title_ja: string;
  title_en: string;
  walkIds: string[];
};

export type Locale = 'ja' | 'en';



