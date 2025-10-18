export const StatKeys = ["hp", "atk", "def", "spa", "spd", "spe"] as const;
export type Stat = (typeof StatKeys)[number];

export type Stats = {
	[K in Stat]: number;
};
