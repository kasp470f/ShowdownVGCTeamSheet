import { Dex } from "../types/dex";
import { StatKeys, Stats } from "../types/stats";
import { PokemonSet } from "../types/team-set";
import { VGCSheet, VGCSheetPokemon } from "../types/vgc-sheet";
import { statEvaluator } from "./statEvaluator";

/**
 * Converts a list of Pokémon sets into a VGC (Video Game Championships) team sheet format.
 *
 * @param teamSetList - An array of Pokémon sets to convert
 * @param dex - The Pokédex data source used to retrieve species information
 *
 * @returns A VGCSheet containing formatted data for each Pokémon in the team, or undefined
 */
export function getVGCSheet(teamSetList: PokemonSet[], dex: any): VGCSheet | undefined {
	var teamDexIds = teamSetList.map((set) => set.species);
	if (teamDexIds.length === 0) return;

	var speciesData = teamDexIds.map((id) => dex.get(id) as Dex);
	if (speciesData.length === 0) return;

	if (speciesData.length !== teamSetList.length) {
		console.error("Mismatch between species data and team set list lengths");
		return;
	}

	var vgcSheetData: VGCSheet = [];

	for (var pokemon in teamSetList) {
		var set = teamSetList[pokemon];
		var species = speciesData[pokemon];

		var vgcPokemon = createVGCSheetPokemon(set, species);
		vgcSheetData.push(vgcPokemon);
	}

	return vgcSheetData;
}

/**
 * Converts a PokemonSet into a VGCSheetPokemon format.
 *
 * This function transforms Pokémon data into the format required for VGC team sheets,
 * calculating the final stats based on species base stats, IVs, EVs, level, and nature.
 *
 * @param set - The Pokémon set containing species, moves, ability, item, etc.
 * @param species - The Dex entry containing base stats and types information for the Pokémon
 * @returns A VGCSheetPokemon object with all required fields for a VGC team sheet
 */
function createVGCSheetPokemon(set: PokemonSet, species: Dex): VGCSheetPokemon {
	const vgcPokemon: VGCSheetPokemon = {
		name: set.species,
		tera: set.teraType ?? species.types[0],
		ability: set.ability,
		item: set.item,
		moves: set.moves,
		level: set.level,
		stats: {} as Stats,
	};

	for (const statKey of StatKeys) {
		vgcPokemon.stats[statKey] = statEvaluator(
			statKey,
			species.baseStats[statKey],
			set.ivs[statKey] ?? 0,
			set.evs[statKey] ?? 0,
			set.level,
			set.nature.length > 0 ? set.nature : "Serious",
		);
	}

	return vgcPokemon;
}
