import { SourcesItem, assertIsDefined } from '../../../types/types';
import './sources.css';

class Sources {
    draw(data: SourcesItem[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        assertIsDefined(sourceItemTemp);
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
        assertIsDefined(sourcesElement);
        sourcesElement.innerHTML = '';
        sourcesElement.append(fragment);
    }
    drawAlphabet(data: SourcesItem[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const letterItemTemp: HTMLTemplateElement | null = document.querySelector('#letterItem');
        const alphabet = data.reduce((acc: string[], item) => {
            const initial = item.id.charAt(0).toLowerCase();
            if (!acc.includes(initial)) {
                acc.push(initial);
            }
            return acc;
        }, []);

        let filteredData: SourcesItem[] = [];
        assertIsDefined(letterItemTemp);
        alphabet.forEach((letter) => {
            const letterClone = letterItemTemp.content.cloneNode(true);
            if (letterClone instanceof DocumentFragment) {
                const btn = letterClone.querySelector('.letter');
                assertIsDefined(btn);
                btn.textContent = letter;
                btn.addEventListener('click', () => {
                    filteredData = data.filter((item) => item.id.toLowerCase().startsWith(letter));
                    this.draw(filteredData);
                });
            }

            fragment.append(letterClone);
        });

        const alphabetContainer = document.querySelector('.letter-container');
        assertIsDefined(alphabetContainer);
        alphabetContainer.append(fragment);
    }
}

export default Sources;
