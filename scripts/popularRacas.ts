import { db } from '../app/firebase';
import { collection, addDoc } from 'firebase/firestore';
import type { RacaCaracteristicas } from '../app/types';

const racas: Omit<RacaCaracteristicas, 'id'>[] = [
  {
    nome: "Labrador Retriever",
    temperamento: "Amigável, Brincalhão, Leal",
    tamanhoMedio: "Grande (25-36kg)",
    expectativaVida: "10-12 anos",
    nivelEnergia: 5,
    necessidadeExercicio: 4,
    facilidadeTreinamento: 5,
    caracteristicasEspeciais: [
      "Ótimo com crianças",
      "Precisa de exercício regular",
      "Adora nadar",
      "Excelente cão-guia"
    ]
  },
  {
    nome: "Golden Retriever",
    temperamento: "Inteligente, Gentil, Confiável",
    tamanhoMedio: "Grande (25-34kg)",
    expectativaVida: "10-12 anos",
    nivelEnergia: 4,
    necessidadeExercicio: 4,
    facilidadeTreinamento: 5,
    caracteristicasEspeciais: [
      "Excelente com famílias",
      "Ótimo para terapia",
      "Pelagem dupla que requer escovação regular",
      "Muito sociável"
    ]
  },
  {
    nome: "Poodle",
    temperamento: "Inteligente, Ativo, Elegante",
    tamanhoMedio: "Varia (Toy: 2-4kg, Miniatura: 5-8kg, Standard: 20-32kg)",
    expectativaVida: "12-15 anos",
    nivelEnergia: 4,
    necessidadeExercicio: 3,
    facilidadeTreinamento: 5,
    caracteristicasEspeciais: [
      "Não solta pelo",
      "Muito inteligente",
      "Requer tosa regular",
      "Ótimo para pessoas alérgicas"
    ]
  }
];

async function popularRacas() {
  try {
    const racasRef = collection(db, 'racas');
    
    for (const raca of racas) {
      await addDoc(racasRef, raca);
      console.log(`Raça ${raca.nome} adicionada com sucesso!`);
    }
    
    console.log('Todas as raças foram adicionadas com sucesso!');
  } catch (error) {
    console.error('Erro ao popular raças:', error);
  }
}

// Executar o script
popularRacas(); 