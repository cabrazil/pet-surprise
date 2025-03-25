import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

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

async function atualizarCaracteristicasRaca() {
  try {
    // Inicializa o Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('Firebase inicializado com sucesso');

    // Busca todas as raças
    const racasRef = collection(db, 'racas');
    const racasSnapshot = await getDocs(racasRef);
    const racas = new Map();
    
    racasSnapshot.forEach((doc) => {
      racas.set(doc.data().nome, doc.data());
    });

    console.log(`Encontradas ${racas.size} raças no banco de dados`);

    // Busca todos os pets
    const petsRef = collection(db, 'pets');
    const petsSnapshot = await getDocs(petsRef);
    
    console.log(`\nEncontrados ${petsSnapshot.size} pets para atualizar`);

    // Atualiza cada pet
    for (const petDoc of petsSnapshot.docs) {
      const petData = petDoc.data();
      const racaNome = petData.raca;
      const racaData = racas.get(racaNome);

      if (racaData) {
        console.log(`\nAtualizando pet ${petData.nome} (${racaNome})`);
        console.log('Dados da raça encontrados:', JSON.stringify(racaData, null, 2));

        try {
          await updateDoc(doc(db, 'pets', petDoc.id), {
            caracteristicasRaca: racaData
          });
          console.log(`Pet ${petData.nome} atualizado com sucesso!`);
        } catch (error) {
          console.error(`Erro ao atualizar pet ${petData.nome}:`, error);
          if (error instanceof Error) {
            console.error('Detalhes do erro:', error.message);
          }
        }
      } else {
        console.error(`Raça ${racaNome} não encontrada para o pet ${petData.nome}`);
      }
    }

    console.log('\nProcesso de atualização concluído!');
  } catch (error) {
    console.error('Erro geral ao atualizar características das raças:', error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}

// Executar o script
atualizarCaracteristicasRaca(); 