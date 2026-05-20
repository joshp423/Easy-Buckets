import { type Season } from "./season";

interface Team {
  id: number;
  name: string;
  userId: number;
  seasons: Season[];
}

export type { Team };
