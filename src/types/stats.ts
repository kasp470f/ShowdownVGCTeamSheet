export const StatKeys = ["hp", "atk", "def", "spa", "spd", "spe"] as const;
export type Stat = (typeof StatKeys)[number];

/**
 * Represents a complete set of Pokémon statistics.
 * Maps each stat type to its numerical value.
 */
export type Stats = {
	[K in Stat]: number;
};
