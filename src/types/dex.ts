import { Stats } from "./stats";

/**
 * Represents a Pokémon entry in the Pokédex with its core attributes.
 *
 * @interface Dex
 * @property {number} num - The Pokédex number of the Pokémon.
 * @property {string} name - The name of the Pokémon.
 * @property {Stats} baseStats - The base statistics of the Pokémon.
 * @property {string[]} types - The elemental types of the Pokémon (e.g., "Fire", "Water").
 */
export interface Dex {
	num: number;
	name: string;
	baseStats: Stats;
	types: string[];
}
