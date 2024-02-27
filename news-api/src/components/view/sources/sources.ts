import { SourcesItem } from '../../../types/types';
import './sources.css';

class Sources {
    draw(data: SourcesItem[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (!sourceItemTemp) throw new Error('No item');
        data.forEach((item: SourcesItem) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (sourceClone instanceof DocumentFragment) {
                const itemNameElement = sourceClone.querySelector('.source__item-name');
                const itemElement = sourceClone.querySelector('.source__item');
                if (itemNameElement && itemElement) {
                    itemNameElement.textContent = item.name;
                    itemElement.setAttribute('data-source-id', item.id);
                }
            }

            fragment.append(sourceClone);
        });

        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.append(fragment);
        }
    }
}

export default Sources;
