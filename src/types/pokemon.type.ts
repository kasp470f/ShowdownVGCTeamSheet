import { Stats } from "./team-set.type";

export interface PokemonDex {
	num: number;
	name: string;
	baseStats: Stats;
	types: string[];
}