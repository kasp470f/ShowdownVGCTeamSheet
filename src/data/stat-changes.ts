import { Stat } from "../types/stats";

type StatChange = Stat | "none";
export const NatureChanges: {
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
