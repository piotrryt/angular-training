import { Character } from "./Character";

export type CharacterResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Character[];
};
