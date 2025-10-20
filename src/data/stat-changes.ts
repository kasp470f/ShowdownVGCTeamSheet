import { Stat } from "../types/stats";

type StatChange = Stat | "none";
/**
 * A mapping of Pokémon natures to their corresponding stat changes.
 * 
 * Each nature in Pokémon games affects stats by increasing one stat by 10% 
 * and decreasing another by 10%, or having no effect (neutral natures).
 * 
 * @example
 * // Get the stat changes for Adamant nature
 * const adamantChanges = NatureChanges["Adamant"];
 * // Result: { plus: "atk", minus: "spa" }
 * 
 * @type {Object.<string, {plus: StatChange, minus: StatChange}>}
 * @property {StatChange} plus - The stat that gets a 10% increase
 * @property {StatChange} minus - The stat that gets a 10% decrease
 * 
 * Where StatChange can be one of:
 * - "atk" - Attack
 * - "def" - Defense
 * - "spa" - Special Attack
 * - "spd" - Special Defense
 * - "spe" - Speed
 * - "none" - No stat change (for neutral natures)
 */
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
