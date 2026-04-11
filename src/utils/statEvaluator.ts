import { NatureChanges } from "../data/stat-changes";
import { Stat } from "../types/stats";

function natureMultiplier(stat: Stat, nature: string): number {
	if (nature in NatureChanges && NatureChanges[nature] !== undefined) {
		const changes = NatureChanges[nature];
		if (changes.plus === stat) {
			return 1.1;
		} else if (changes.minus === stat) {
			return 0.9;
		}
	}
	return 1.0;
}

/**
 * Calculates the final value of a Pokémon's stat based on its base stat, IVs, EVs, level, and nature.
 *
 * @param stat - The stat type being calculated ("hp", "atk", "def", "spa", "spd", "spe")
 * @param baseStat - The Pokémon's base stat value
 * @param iv - The Individual Value for the stat (0-31)
 * @param ev - The Effort Value for the stat (0-252)
 * @param level - The Pokémon's level (1-100)
 * @param nature - The Pokémon's nature, which may affect stats
 *
 * @returns The calculated final stat value
 */
export function statEvaluatorOriginal(
	stat: Stat,
	baseStat: number,
	iv: number,
	ev: number,
	level: number,
	nature: string,
): number {
	if (stat === "hp") {
		if (baseStat === 1) return 1;

		return Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
	} else {
		let natureMultiplierValue = natureMultiplier(stat, nature);
		return Math.floor(
			(Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5) * natureMultiplierValue,
		);
	}
}

/**
 * Calculates the final value of a Pokémon's stat using the Champions formula, which is a simplified version of the original stat calculation.
 *
 * This function is used for generating VGC team sheets where the exact IV and EV values are not specified, and instead a standard value (SP) is used for all stats.
 *
 * @param stat - The stat type being calculated ("hp", "atk", "def", "spa", "spd", "spe")
 * @param baseStat - The Pokémon's base stat value
 * @param sp - The stat point value used in Champions format (typically 32 for maxed stats)
 * @param nature - The Pokémon's nature, which may affect stats
 *
 * @returns The calculated final stat value using the Champions formula
 */
export function statEvaluatorChampions(stat: Stat, baseStat: number, sp: number, nature: string): number {
	if (stat === "hp") {
		if (baseStat === 1) return 1;

		return baseStat + sp + 75;
	} else {
		let natureMultiplierValue = natureMultiplier(stat, nature);

		return Math.floor(natureMultiplierValue * (baseStat + sp + 20));
	}
}
