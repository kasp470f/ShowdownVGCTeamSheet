import { Dex } from "./dex";

/**
 * Represents a Pokémon team configuration.
 * 
 * @interface Team
 * @property {string} name - The name of the team.
 * @property {string} format - The battle format specification (e.g., "VGC2023", "Singles").
 * @property {number} gen - The Pokémon generation number.
 * @property {string} team - The serialized team data.
 * @property {number} capacity - The maximum number of Pokémon allowed in the team.
 * @property {Dex} dex - The Pokédex reference containing Pokémon data.
 */
export interface Team {
	name: string;
	format: string;
	gen: number;
	team: string;
	capacity: number;
	dex: Dex;
}
