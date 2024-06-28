import { config, getCar, getWinners } from '../../api';
import { Button } from '../../components/button';
import { subscribeEvent } from '../../components/event-bus/event-bus';
import { constants, createSvg } from '../../components/shared';
import { View } from '../../components/view';
import { Car, Winner } from '../../types/types';
import './winner.css';

export class WinnerView extends View {
  winners: Winner[] = [];

  currentPage = 1;

  maxPages = 1;

  winnersCount = 0;

  table: View;

  tbody: View;

  tHead: View;

  titlePage: View;

  counterOnPage: View;

  containerPagination: View;

  sortingParams = {
    sort: config.winnersIdSortQuery,
    order: config.winnersAscSortOrder
  };

  prevButton?: Button;

  nextButton?: Button;

  constructor(parentElement: HTMLElement) {
    super({ tagName: 'section', classes: ['winner'], parentElement });

    this.table = new View({
      parentElement: this.node,
      tagName: 'table',
      classes: ['winner__table', 'table', 'ubuntu-medium']
    });
    this.tbody = new View({ parentElement: this.node, tagName: 'tbody', classes: ['table__body'] });
    this.tHead = new View({ tagName: 'tr', classes: ['table__header'] });
    this.titlePage = new View({
      parentElement: this.node,
      tagName: 'h1',
      classes: ['winner__title', 'title-page', 'ubuntu-bold'],
      content: `Winners (${this.winnersCount})`
    });
    this.counterOnPage = new View({
      parentElement: this.node,
      tagName: 'h3',
      classes: ['winner__counter', 'ubuntu-bold'],
      content: `Page #(${this.currentPage} / ${this.maxPages})`
    });
    this.containerPagination = new View({ parentElement: this.node, classes: ['pagination-wrapper'] });
    subscribeEvent('winners/update', this.updateTable.bind(this));
    this.render();
  }

  async render() {
    this.node.append(this.titlePage.node, this.counterOnPage.node);
    await this.getWinners();
    this.updatePageTitle();
    this.updatePageNumber();
    this.buildTable();
    this.createControlPagination();
  }

  buildTable() {
    this.makeTableHeader();
    this.fillTable();
    this.node.append(this.table.node);
  }

  async updateTable() {
    await this.getWinners();
    this.updatePageTitle();
    this.updatePageNumber();
    this.fillTable();
    this.checkStatePaginationControls();
  }

  makeTableRow(carData: Car, winData: Winner, num: number) {
    const row = new View({ tagName: 'tr', classes: ['ubuntu-medium'] });
    const tdNum = new View({ tagName: 'td' });
    tdNum.node.textContent = `${num}.`;
    const tdCar = new View({ tagName: 'td' });
    const svg = createSvg(carData.color);
    tdCar.node.append(svg);
    const tdName = new View({ tagName: 'td' });
    tdName.node.textContent = carData.name;
    const tdWin = new View({ tagName: 'td' });
    tdWin.node.textContent = String(winData.wins);
    const tdTime = new View({ tagName: 'td' });
    tdTime.node.textContent = `${winData.time}`;
    row.node.append(tdNum.node, tdCar.node, tdName.node, tdWin.node, tdTime.node);
    this.tbody.node.append(row.node);
  }

  makeTableHeader() {
    const thNum = new View({ tagName: 'th' });
    thNum.node.textContent = `Number`;
    const thCar = new View({ tagName: 'th' });
    thCar.node.textContent = 'Car';
    const thName = new View({ tagName: 'th' });
    thName.node.textContent = 'Name';
    const thWin = new View({ tagName: 'th', classes: ['sortable'] });
    thWin.node.textContent = 'Wins';
    thWin.node.onclick = async () => {
      await this.sortByColumn(config.winnersWinsSortQuery, thWin.node);
    };
    const thTime = new View({ tagName: 'th', classes: ['sortable'] });
    thTime.node.textContent = 'Best time (s)';
    thTime.node.onclick = async () => {
      await this.sortByColumn(config.winnersTimeSortQuery, thTime.node);
    };
    this.tHead.node.append(thNum.node, thCar.node, thName.node, thWin.node, thTime.node);
    this.table.node.append(this.tHead.node);
  }

  async getWinners(sort: string = this.sortingParams.sort, order: string = this.sortingParams.order) {
    const { data, count } = await getWinners(this.currentPage, sort, order);
    this.winners = data;
    this.winnersCount = count;
    this.maxPages = this.calcMaxPage();
  }

  async fillTable() {
    this.tbody.node.innerHTML = '';
    const winnerCarsInfo: Promise<Car>[] = [];
    this.winners.forEach((winner) => {
      winnerCarsInfo.push(getCar(winner.id));
    });
    await Promise.all(winnerCarsInfo).then((cars) => {
      cars.forEach((car, i) => {
        this.makeTableRow(car, this.winners[i], 10 * (this.currentPage - 1) + i + 1);
      });
    });
    this.table.node.append(this.tbody.node);
  }

  async sortByColumn(sort: string, colEl: Element) {
    if (this.table.node.classList.contains(constants.SORT_ASC_CLASS)) {
      this.table.node.classList.remove(constants.SORT_ASC_CLASS);
      this.table.node.classList.add(constants.SORT_DESC_CLASS);
      this.sortDesc(sort);
    } else {
      this.table.node.classList.remove(constants.SORT_DESC_CLASS);
      this.table.node.classList.add(constants.SORT_ASC_CLASS);
      this.sortAsc(sort);
    }
    for (let i = 0; i < this.tHead.node.children.length; i += 1) {
      this.tHead.node.children[i].classList.remove('active');
    }
    colEl.classList.add('active');
    await this.updateTable();
  }

  sortDesc(sort: string) {
    this.sortingParams.sort = sort;
    this.sortingParams.order = config.winnersDescSortOrder;
  }

  sortAsc(sort: string) {
    this.sortingParams.sort = sort;
    this.sortingParams.order = config.winnersAscSortOrder;
  }

  calcMaxPage(): number {
    return Math.ceil(this.winnersCount / constants.WINNERS_PER_PAGE_LIMIT);
  }

  updatePageTitle() {
    this.titlePage.node.textContent = `Winners (${this.winnersCount})`;
  }

  updatePageNumber() {
    this.counterOnPage.node.textContent = `Page #(${this.currentPage} / ${this.maxPages})`;
  }

  createControlPagination() {
    this.prevButton = new Button({ parentElement: this.node, classes: ['ubuntu-regular'], content: 'Previous' });
    this.prevButton.node.onclick = () => {
      this.currentPage -= 1;
      this.changePage();
    };
    this.nextButton = new Button({ parentElement: this.node, classes: ['ubuntu-regular'], content: 'Next' });
    this.nextButton.node.onclick = () => {
      this.currentPage += 1;
      this.changePage();
    };

    this.containerPagination.node.append(this.prevButton.button, this.nextButton.button);
    this.checkStatePaginationControls();
    this.node.append(this.containerPagination.node);
  }

  checkStatePaginationControls() {
    this.checkPaginationPrevState();
    this.checkPaginationNextState();
  }

  checkPaginationPrevState() {
    const button = this.prevButton?.button;
    if (button) {
      if (this.currentPage > 1) button.disabled = false;
      else button.disabled = true;
    }
  }

  checkPaginationNextState() {
    const button = this.nextButton?.button;
    if (button) {
      if (this.currentPage < this.maxPages) button.disabled = false;
      else button.disabled = true;
    }
  }

  changePage() {
    this.updateTable();
    this.checkStatePaginationControls();
  }
}
