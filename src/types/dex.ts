import { Stats } from "./stats";

export interface Dex {
	num: number;
	name: string;
	baseStats: Stats;
	types: string[];
}
