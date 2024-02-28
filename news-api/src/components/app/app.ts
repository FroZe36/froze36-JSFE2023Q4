import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsItemAPI, SourceItemAPI } from '../../types/types';
class App {
    public controller: AppController;
    public view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: Element | null = document.querySelector('.sources');
        if (sources)
            sources.addEventListener('click', (e) =>
                this.controller.getNews<NewsItemAPI>(e, (data) => this.view.drawNews(data))
            );
        this.controller.getSources<SourceItemAPI>((data) => this.view.drawSources(data));
    }
}

export default App;
