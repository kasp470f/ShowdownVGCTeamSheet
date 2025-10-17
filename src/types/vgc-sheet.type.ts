import { Stats } from "./team-set.type";

type VGCSheet = VGCSheetPokemon[];

interface VGCSheetPokemon {
    name: string;
    tera: string;
    item: string;
    ability: string;
    moves: string[];
    level: number;
    stats: Stats;
}


export { VGCSheetPokemon, VGCSheet };