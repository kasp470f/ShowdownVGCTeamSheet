import { NatureChanges } from "../data/stat-changes";
import { Stat } from "../types/stats";

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

		if (nature in NatureChanges) {
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
