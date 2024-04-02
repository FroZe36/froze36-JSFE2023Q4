import { constants } from './components/shared';

export const config = {
  baseUrl: 'http://127.0.0.1:3000',
  garagePath: '/garage',
  engine: '/engine',
  winners: '/winners',
  startEngine: 'started',
  stopEngine: 'stopped',
  driveStatus: 'drive',
  carsLimit: constants.CARS_PER_PAGE_LIMIT,
  winnersLimit: constants.WINNERS_PER_PAGE_LIMIT,
  winnersIdSortQuery: 'id',
  winnersWinsSortQuery: 'wins',
  winnersTimeSortQuery: 'time',
  winnersAscSortOrder: 'ASC',
  winnersDescSortOrder: 'DESC'
};

export const getCars = async (page: number) => {
  const response = await fetch(`${config.baseUrl}${config.garagePath}?_page=${page}&_limit=${config.carsLimit}`);
  const data = await response.json();

  const count = Number(response.headers.get('X-Total-Count'));
  return { data, count };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${config.baseUrl}${config.garagePath}/${id}`);
  const data = await response.json();
  return data;
};

export const createCar = async (car: string) => {
  const response = await fetch(`${config.baseUrl}${config.garagePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: car
  });
  return response;
};

export const deleteCar = async (id: number) => {
  await fetch(`${config.baseUrl}${config.garagePath}/${id}`, {
    method: 'DELETE'
  });
};

export const updateCar = async (id: number, data: string) => {
  const res = await fetch(`${config.baseUrl}${config.garagePath}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });
  return res;
};

export const startEngine = async (id: number) => {
  const res = await fetch(`${config.baseUrl}${config.engine}?id=${id}&status=${config.startEngine}`, {
    method: 'PATCH'
  });
  const data = await res.json();
  return data;
};

export const stopEngine = async (id: number) => {
  const res = await fetch(`${config.baseUrl}${config.engine}?id=${id}&status=${config.stopEngine}`, {
    method: 'PATCH'
  });
  return res;
};

export const driveCar = async (id: number) => {
  const res = await fetch(`${config.baseUrl}${config.engine}?id=${id}&status=${config.driveStatus}`, {
    method: 'PATCH'
  });
  return res;
};

export const getWinners = async (
  page: number,
  sort: string = config.winnersIdSortQuery,
  order: string = config.winnersAscSortOrder
) => {
  const response = await fetch(
    `${config.baseUrl}${config.winners}?_page=${page}&_limit=${config.winnersLimit}&_sort=${sort}&_order=${order}`
  );
  const data = await response.json();
  const count = Number(response.headers.get('X-Total-Count'));
  return { data, count };
};

export const getAllWinners = async () => {
  const response = await fetch(`${config.baseUrl}${config.winners}`);
  const data = await response.json();
  return data;
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${config.baseUrl}${config.winners}/${id}`);
  const data = await response.json();
  return data;
};

export const createWinner = async (winner: string) => {
  const res = await fetch(`${config.baseUrl}${config.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: winner
  });
  return res;
};

export const updateWinner = async (id: number, newData: string) => {
  const res = await fetch(`${config.baseUrl}${config.winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  });
  return res;
};

export const deleteWinner = async (id: number) => {
  const res = fetch(`${config.baseUrl}${config.winners}/${id}`, {
    method: 'DELETE'
  });

  return res;
};
