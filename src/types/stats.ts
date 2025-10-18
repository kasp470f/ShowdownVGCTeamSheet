export type Stat = "hp" | "atk" | "def" | "spa" | "spd" | "spe";

export type Stats = {
	[K in Stat]: number;
};
