export interface ElementParam {
  tagName: keyof HTMLElementTagNameMap;
  classNames: string[];
  text?: string;
  callback?: (e: null | MouseEvent | KeyboardEvent | Event) => void;
}

export interface User {
  name: string;
  surname: string;
}

export interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface WordItem {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface WordCollection {
  rounds: {
    levelData: LevelData;
    words: WordItem[];
  }[];
  roundsCount: number;
}
