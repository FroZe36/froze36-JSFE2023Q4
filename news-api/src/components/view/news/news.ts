import { NewsItem, assertIsDefined } from '../../../types/types';
import './news.css';
class News {
    draw(data: NewsItem[]): void {
        const news: NewsItem[] = data.length >= 10 ? data.filter((_item: NewsItem, idx: number) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        assertIsDefined(newsItemTemp);
        news.forEach((item: NewsItem, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true);
            if (newsClone instanceof DocumentFragment) {
                if (idx % 2) {
                    const newsItem = newsClone.querySelector('.news__item');
                    assertIsDefined(newsItem);
                    newsItem.classList.add('alt');
                }
                const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
                if (newsMetaPhoto instanceof HTMLElement) {
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }
                const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                if (newsMetaAuthor instanceof HTMLElement) {
                    newsMetaAuthor.textContent = item.author || item.source.name;
                }
                const newsMetaDate = newsClone.querySelector('.news__meta-date');
                if (newsMetaDate instanceof HTMLElement) {
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }
                const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
                if (newsDescriptionTitle instanceof HTMLElement) {
                    newsDescriptionTitle.textContent = item.title;
                }

                const newsDescriptionSource = newsClone.querySelector('.news__description-source');
                if (newsDescriptionSource instanceof HTMLElement) {
                    newsDescriptionSource.textContent = item.source.name;
                }

                const newsDescriptionContent = newsClone.querySelector('.news__description-content');
                if (newsDescriptionContent instanceof HTMLElement) {
                    newsDescriptionContent.textContent = item.description;
                }

                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if (newsReadMore instanceof HTMLAnchorElement) {
                    newsReadMore.setAttribute('href', item.url);
                }
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        assertIsDefined(newsContainer);
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
