import { Stats } from "./stats";

/**
 * Represents a complete VGC (Video Game Championships) team sheet as an array of Pokémon.
 * Each element in the array is a {@link VGCSheetPokemon} object containing the details of an individual Pokémon.
 */
export type VGCSheet = VGCSheetPokemon[];

/**
 * Represents a single Pokémon's configuration in a VGC team sheet.
 *
 * @interface VGCSheetPokemon
 * @property {string} name - The name of the Pokémon species.
 * @property {string} tera - The Tera Type of the Pokémon (Scarlet/Violet mechanic).
 * @property {string} ability - The ability the Pokémon has.
 * @property {string} item - The held item for the Pokémon.
 * @property {Stats} stats - The complete set of the Pokémon's statistics.
 * @property {number} level - The level of the Pokémon.
 * @property {string[]} moves - An array of moves the Pokémon knows (up to 4).
 */
export interface VGCSheetPokemon {
	name: string;
	tera: string;
	ability: string;
	item: string;
	stats: Stats;
	level: number;
	moves: string[];
}
