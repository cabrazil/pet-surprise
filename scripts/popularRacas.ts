import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Carrega as variáveis de ambiente
config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const racas = [
  {
    nome: "Labrador Retriever",
    nivelEnergia: 5,
    necessidadeExercicio: 4,
    facilidadeTreinamento: 5,
    temperamento: ["Amigável", "Inteligente", "Gentil"],
    tamanho: "Grande",
    expectativaVida: "10-12 anos",
    caracteristicas: {
      pelagemTipo: "Curta e densa",
      pelagemCores: ["Amarelo", "Chocolate", "Preto"],
      peso: {
        minimo: 25,
        maximo: 36
      }
    }
  },
  {
    nome: "Golden Retriever",
    nivelEnergia: 4,
    necessidadeExercicio: 4,
    facilidadeTreinamento: 5,
    temperamento: ["Inteligente", "Confiável", "Amigável"],
    tamanho: "Grande",
    expectativaVida: "10-12 anos",
    caracteristicas: {
      pelagemTipo: "Longa e densa",
      pelagemCores: ["Dourado claro", "Dourado escuro"],
      peso: {
        minimo: 25,
        maximo: 34
      }
    }
  },
  {
    nome: "Poodle",
    nivelEnergia: 4,
    necessidadeExercicio: 3,
    facilidadeTreinamento: 5,
    temperamento: ["Inteligente", "Ativo", "Alerta"],
    tamanho: "Varia (Toy, Miniatura, Standard)",
    expectativaVida: "12-15 anos",
    caracteristicas: {
      pelagemTipo: "Encaracolada",
      pelagemCores: ["Preto", "Branco", "Marrom", "Cinza"],
      peso: {
        minimo: 3,
        maximo: 30
      }
    }
  },
  {
    nome: "Bulldog Francês",
    nivelEnergia: 3,
    necessidadeExercicio: 2,
    facilidadeTreinamento: 3,
    temperamento: ["Brincalhão", "Adaptável", "Sociável"],
    tamanho: "Pequeno",
    expectativaVida: "10-12 anos",
    caracteristicas: {
      pelagemTipo: "Curta e lisa",
      pelagemCores: ["Tigrado", "Fulvo", "Branco com manchas"],
      peso: {
        minimo: 8,
        maximo: 14
      }
    }
  }
];

async function popularRacas() {
  try {
    // Inicializa o Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('Firebase inicializado com sucesso');
    console.log('Configuração:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain
    });

    const racasRef = collection(db, 'racas');
    
    for (const raca of racas) {
      console.log(`\nTentando adicionar: ${raca.nome}`);
      console.log('Dados:', JSON.stringify(raca, null, 2));
      
      try {
        const docRef = await addDoc(racasRef, raca);
        console.log(`Raça ${raca.nome} adicionada com sucesso! ID: ${docRef.id}`);
      } catch (error) {
        console.error(`Erro ao adicionar raça ${raca.nome}:`, error);
        if (error instanceof Error) {
          console.error('Detalhes do erro:', error.message);
        }
      }
    }
    
    console.log('\nProcesso de população concluído!');
  } catch (error) {
    console.error('Erro geral ao popular racas:', error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}

// Executar o script
popularRacas(); 