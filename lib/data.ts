import { Walk, Article, Series } from '@/types';

export const mockWalks: Walk[] = [
  {
    id: '1',
    title_ja: '東京・渋谷の夜歩き',
    title_en: 'Night Walk in Shibuya, Tokyo',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    region: 'Kanto',
    time: 'Night',
    featured: true,
  },
  {
    id: '2',
    title_ja: '京都・祇園の昼歩き',
    title_en: 'Day Walk in Gion, Kyoto',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    region: 'Kinki',
    time: 'Day',
    featured: true,
  },
  {
    id: '3',
    title_ja: '札幌・すすきのの夜歩き',
    title_en: 'Night Walk in Susukino, Sapporo',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    region: 'Hokkaido',
    time: 'Night',
    featured: true,
  },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title_ja: '街歩き動画の魅力',
    title_en: 'The Appeal of Walking Videos',
    excerpt_ja: '静かな街歩き動画がなぜ人気なのか、その理由を探ります。',
    excerpt_en: 'Exploring why quiet walking videos have become so popular.',
    url: 'https://medium.com/@example/walking-videos',
    thumbnail: 'https://via.placeholder.com/400x225',
  },
  {
    id: '2',
    title_ja: '日本の日常を記録する',
    title_en: 'Documenting Everyday Japan',
    excerpt_ja: '4Kカメラで捉えた日本の日常風景の記録について。',
    excerpt_en: 'About documenting everyday Japanese scenes with 4K cameras.',
    url: 'https://medium.com/@example/documenting-japan',
    thumbnail: 'https://via.placeholder.com/400x225',
  },
];

export const mockSeries: Series[] = [
  {
    id: '1',
    title_ja: '北海道の夜歩き',
    title_en: 'Hokkaido Night Walks',
    walkIds: ['3'],
  },
  {
    id: '2',
    title_ja: '東北の夜歩き',
    title_en: 'Tohoku Night Walks',
    walkIds: [],
  },
  {
    id: '3',
    title_ja: 'ローカル東京',
    title_en: 'Local Tokyo',
    walkIds: ['1'],
  },
];



