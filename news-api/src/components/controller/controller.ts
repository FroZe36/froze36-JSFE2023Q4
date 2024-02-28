import { CallbackFunction, assertIsDefined } from '../../types/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources<T>(callback: CallbackFunction<T>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews<T>(e: Event, callback: CallbackFunction<T>) {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
        assertIsDefined(target);
        assertIsDefined(newsContainer);
        while (target !== newsContainer) {
            if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (sourceId) {
                        if (newsContainer.getAttribute('data-source') !== sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp(
                                {
                                    endpoint: 'everything',
                                    options: {
                                        sources: sourceId,
                                    },
                                },
                                callback
                            );
                        }
                        return;
                    }
                    target = target.parentNode;
                }
            }
        }
    }
}

export default AppController;
