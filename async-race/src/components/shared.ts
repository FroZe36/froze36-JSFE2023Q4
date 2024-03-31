export const backgroundsImages = ['garage.jpg', 'winner.jpg'];
export const carBrands = [
  'Renault',
  'BMW',
  'Audi',
  'Ford',
  'Tesla',
  'Nissan',
  'Kia',
  'Volkswagen',
  'Peugeot',
  'Toyota'
];
export const carModels = [
  'Kadjar',
  '7er',
  'Q7',
  'Explorer',
  'CyberTruck',
  '350Z',
  'Sport',
  'Pride',
  'Scirocco R',
  '807',
  'Mark 2'
];
export const constants = {
  CARS_PER_PAGE_LIMIT: 7,
  WINNERS_PER_PAGE_LIMIT: 10,
  DEFAULT_ACTIVE_CAR_ID: 0,
  DEFAULT_WINNER_CAR_ID: 0
};

export function createSvg(color: string) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', './assets/carSprite.svg#Car');
  use.setAttribute('y', '10');
  svg.classList.add('icon');
  svg.append(use);
  svg.style.fill = color;
  return svg;
}
