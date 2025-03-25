import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';

interface Raca {
  nome: string;
  nivelEnergia: number;
  necessidadeExercicio: number;
  facilidadeTreinamento: number;
  temperamento: string[];
  tamanho: string;
  expectativaVida: string;
  caracteristicas: {
    pelagemTipo: string;
    pelagemCores: string[];
    peso: {
      minimo: number;
      maximo: number;
    };
  };
}

interface Pet {
  nome: string;
  raca: string;
  idade: number;
  dataVacinacao: string;
  fotos: string[];
  caracteristicasRaca?: Raca;
}

export async function adicionarPet(pet: Omit<Pet, 'caracteristicasRaca'>): Promise<string> {
  try {
    // Busca a raça correspondente
    const racasRef = collection(db, 'racas');
    const q = query(racasRef, where('nome', '==', pet.raca));
    const racasSnapshot = await getDocs(q);

    if (racasSnapshot.empty) {
      throw new Error(`Raça ${pet.raca} não encontrada`);
    }

    const racaData = racasSnapshot.docs[0].data() as Raca;

    // Cria o documento do pet com as características da raça
    const petsRef = collection(db, 'pets');
    const docRef = await addDoc(petsRef, {
      ...pet,
      caracteristicasRaca: racaData
    });

    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar pet:', error);
    throw error;
  }
}

export async function atualizarPet(petId: string, pet: Partial<Pet>): Promise<void> {
  try {
    const petRef = doc(db, 'pets', petId);
    
    // Se a raça foi alterada, atualiza as características
    if (pet.raca) {
      const racasRef = collection(db, 'racas');
      const q = query(racasRef, where('nome', '==', pet.raca));
      const racasSnapshot = await getDocs(q);

      if (racasSnapshot.empty) {
        throw new Error(`Raça ${pet.raca} não encontrada`);
      }

      const racaData = racasSnapshot.docs[0].data() as Raca;
      await updateDoc(petRef, {
        ...pet,
        caracteristicasRaca: racaData
      });
    } else {
      await updateDoc(petRef, pet);
    }
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    throw error;
  }
} 