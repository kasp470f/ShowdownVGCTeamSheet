import { Stat } from "../types/team-set.type";

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

		if (nature in natureChanges) {
			const changes = natureChanges[nature];
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

type StatChange = Stat | "none";
const natureChanges: {
	[key: string]: { plus: StatChange; minus: StatChange };
} = {
	Adamant: { plus: "atk", minus: "spa" },
	Bashful: { plus: "none", minus: "none" },
	Bold: { plus: "def", minus: "atk" },
	Brave: { plus: "atk", minus: "spe" },
	Calm: { plus: "spd", minus: "atk" },
	Careful: { plus: "spd", minus: "spa" },
	Docile: { plus: "none", minus: "none" },
	Gentle: { plus: "spd", minus: "def" },
	Hardy: { plus: "none", minus: "none" },
	Hasty: { plus: "spe", minus: "def" },
	Impish: { plus: "def", minus: "spa" },
	Jolly: { plus: "spe", minus: "spa" },
	Lax: { plus: "def", minus: "spd" },
	Lonely: { plus: "atk", minus: "def" },
	Mild: { plus: "spa", minus: "def" },
	Modest: { plus: "spa", minus: "atk" },
	Naive: { plus: "spe", minus: "spd" },
	Naughty: { plus: "atk", minus: "spd" },
	Quiet: { plus: "spa", minus: "spe" },
	Quirky: { plus: "none", minus: "none" },
	Rash: { plus: "spa", minus: "spd" },
	Relaxed: { plus: "def", minus: "spe" },
	Sassy: { plus: "spd", minus: "spe" },
	Serious: { plus: "none", minus: "none" },
	Timid: { plus: "spe", minus: "atk" },
};
