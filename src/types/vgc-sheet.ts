import { Stats } from "./stats";

export type VGCSheet = VGCSheetPokemon[];

export interface VGCSheetPokemon {
	name: string;
	tera: string;
	ability: string;
	item: string;
	stats: Stats;
	level: number;
	moves: string[];
}
