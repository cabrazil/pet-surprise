import { db } from '../src/app/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Raca {
  nome: string;
  temperamento: string;
  tamanhoMedio: string;
  expectativaVida: string;
  nivelEnergia: number;
  necessidadeExercicio: number;
  facilidadeTreinamento: number;
  caracteristicasEspeciais: string[];
}

interface RacasData {
  racas: Raca[];
}

async function loadRacas() {
  try {
    console.log('Iniciando carregamento de raças...');
    
    if (!db) {
      throw new Error('Firebase não está inicializado corretamente');
    }

    // Lê o arquivo JSON
    const filePath = join(__dirname, '../files/racas.json');
    const fileContent = await readFile(filePath, 'utf-8');
    const data: RacasData = JSON.parse(fileContent);

    console.log(`Encontradas ${data.racas.length} raças para carregar`);

    const racasRef = collection(db, 'racas');
    
    for (const raca of data.racas) {
      console.log(`Tentando adicionar raça: ${raca.nome}`);
      
      // Garante que os valores numéricos são números
      const racaData = {
        ...raca,
        nivelEnergia: Number(raca.nivelEnergia),
        necessidadeExercicio: Number(raca.necessidadeExercicio),
        facilidadeTreinamento: Number(raca.facilidadeTreinamento)
      };
      
      await addDoc(racasRef, racaData);
      console.log(`Raça ${raca.nome} adicionada com sucesso!`);
    }
    
    console.log('Todas as raças foram adicionadas com sucesso!');
  } catch (error) {
    console.error('Erro ao carregar raças:', error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}

// Executar o script
loadRacas(); 