import { Stats } from "./team-set.type";

type VGCSheet = VGCSheetPokemon[];

interface VGCSheetPokemon {
	name: string;
	tera: string;
	ability: string;
	item: string;
	stats: Stats;
	level: number;
	moves: string[];
}

export { VGCSheetPokemon, VGCSheet };
