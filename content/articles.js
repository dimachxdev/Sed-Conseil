import { ARTICLES_A } from './articles-a';
import { ARTICLES_B } from './articles-b';
import { ARTICLES_C } from './articles-c';
import { ARTICLES_D } from './articles-d';

export const ARTICLES = [...ARTICLES_D, ...ARTICLES_A, ...ARTICLES_B, ...ARTICLES_C].sort((a, b) => b.date.localeCompare(a.date));
export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);
export const CATEGORIES = [...new Set(ARTICLES.map((a) => a.category))];
export const formatDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
