import { Stats } from "./stats";

/**
 * Interface representing a Pokédex, providing access to Pokémon data.
 *
 * @property species - A function that provides access to Pokémon species data
 */
export interface Dex {
	species: DexSpeciesFunction;
}

/**
 * Interface for accessing Pokémon species data from the Pokédex.
 *
 * @method get - Retrieves a DexSpecies by its identifier.
 * @param id - The identifier of the Pokémon species to retrieve.
 * @returns The DexSpecies object if found, otherwise undefined.
 */
export interface DexSpeciesFunction {
	get(id: string): DexSpecies | undefined;
}

/**
 * Represents a Pokémon entry in the Pokédex with its core attributes.
 *
 * @interface DexSpecies
 * @property {number} num - The Pokédex number of the Pokémon.
 * @property {string} name - The name of the Pokémon.
 * @property {Stats} baseStats - The base statistics of the Pokémon.
 * @property {string[]} types - The elemental types of the Pokémon (e.g., "Fire", "Water").
 */
export interface DexSpecies {
	num: number;
	name: string;
	species: string;
	baseStats: Stats;
	types: string[];
}
