export interface PokemonSet {
    name: string
    species: string
    item: string
    ability: string
    moves: string[]
    nature: string
    evs: Stats
    ivs: Stats
    level: number
    hpType: string
    pokeball: string
    gigantamax: boolean
    dynamaxLevel: number
    teraType: string
}

export type Stat = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';

export type Stats = {
    [K in Stat]: number;
};