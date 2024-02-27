export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error(`${value} is not defined`);
    }
}
export function isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || value === undefined;
}
export function assertIsElement(element: Element | null): asserts element is Element {
    if (!element || !(element instanceof Element)) {
        throw new Error('Expected element to be a valid DOM element.');
    }
}
enum Category {
    business = 'business',
    entertainment = 'entertainment',
    general = 'general',
    health = 'health',
    science = 'science',
    sports = 'sports',
    technology = 'technology',
}
enum Languages {
    ar = 'ar',
    de = 'de',
    en = 'en',
    es = 'es',
    fr = 'fr',
    he = 'he',
    it = 'it',
    nl = 'nl',
    no = 'no',
    pt = 'pt',
    ru = 'ru',
    sv = 'sv',
    ud = 'ud',
    zh = 'zh',
}

export interface SourcesItem {
    id: string;
    name: string;
    desription: string;
    url: string;
    category: Category;
    language: Languages;
    country: string;
}

type sourceNews = Pick<SourcesItem, 'id' | 'name'>;
export interface NewsItem {
    source: sourceNews;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
