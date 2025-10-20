import { Stats } from "./stats";

export interface PokemonSet {
	name: string;
	species: string;
	item: string;
	ability: string;
	moves: string[];
	nature: string;
	evs: Stats;
	ivs: Stats;
	level: number;
	teraType: string;
}
