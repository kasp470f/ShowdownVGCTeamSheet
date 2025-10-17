export interface PokemonDex {
  num: number
  name: string
  baseStats: BaseStats
  types: string[]
}

export interface BaseStats {
  hp: number
  atk: number
  def: number
  spa: number
  spd: number
  spe: number
}