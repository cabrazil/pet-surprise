export interface PetInfo {
  id: string;
  nome: string;
  raca: string;
  idade: number;
  dataVacinacao: string;
  fotos: string[];
  caracteristicasRaca?: RacaCaracteristicas;
}

export interface RacaCaracteristicas {
  id: string;
  nome: string;
  temperamento: string;
  tamanhoMedio: string;
  expectativaVida: string;
  nivelEnergia: number;
  necessidadeExercicio: number;
  facilidadeTreinamento: number;
  caracteristicasEspeciais: string[];
} 