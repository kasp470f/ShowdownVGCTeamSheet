import { NatureChanges } from "../data/stat-changes";
import { Stat } from "../types/stats";

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
export function statEvaluator(
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
		let natureMultiplier = 1.0;

		if (nature in NatureChanges && NatureChanges[nature] !== undefined) {
			const changes = NatureChanges[nature];
			if (changes.plus === stat) {
				natureMultiplier = 1.1;
			} else if (changes.minus === stat) {
				natureMultiplier = 0.9;
			}
		}
		return Math.floor(
			(Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5) * natureMultiplier,
		);
	}
}
