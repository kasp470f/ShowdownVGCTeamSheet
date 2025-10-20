import { Stats } from "./stats";

/**
 * Represents a complete configuration for a Pokémon in a team.
 * This includes all battle-relevant attributes like moves, stats, and items.
 *
 * @interface PokemonSet
 * @property {string} name - The nickname of the Pokémon
 * @property {string} species - The actual Pokémon species (e.g., "Pikachu", "Charizard")
 * @property {string} item - The held item for the Pokémon
 * @property {string} ability - The ability the Pokémon has
 * @property {string[]} moves - An array of moves the Pokémon knows (up to 4)
 * @property {string} nature - The nature of the Pokémon, which affects stat growth
 * @property {Stats} evs - The Effort Value stats distribution
 * @property {Stats} ivs - The Individual Value stats distribution
 * @property {number} level - The level of the Pokémon
 * @property {string} teraType - The Tera Type of the Pokémon (Scarlet/Violet mechanic)
 */
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
