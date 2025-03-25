import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function checkCollections() {
  try {
    console.log('Iniciando verificação das collections...');
    
    // Inicializa o Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('Firebase inicializado com sucesso');
    console.log('Configuração:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain
    });

    // Verifica a collection 'racas'
    console.log('\nVerificando collection "racas":');
    const racasRef = collection(db, 'racas');
    console.log('Referência da collection criada');
    
    try {
      const racasSnapshot = await getDocs(racasRef);
      console.log(`Número de documentos em 'racas': ${racasSnapshot.size}`);
      
      if (racasSnapshot.size > 0) {
        console.log('\nDocumentos em "racas":');
        racasSnapshot.forEach((doc) => {
          console.log(`ID: ${doc.id}`);
          console.log('Dados:', JSON.stringify(doc.data(), null, 2));
          console.log('---');
        });
      } else {
        console.log('Nenhum documento encontrado na collection "racas"');
      }
    } catch (racasError) {
      console.error('Erro específico ao acessar collection "racas":', racasError);
      if (racasError instanceof Error) {
        console.error('Detalhes do erro:', racasError.message);
        console.error('Stack trace:', racasError.stack);
      }
    }

    // Verifica a collection 'pets'
    console.log('\nVerificando collection "pets":');
    const petsRef = collection(db, 'pets');
    console.log('Referência da collection criada');
    
    try {
      const petsSnapshot = await getDocs(petsRef);
      console.log(`Número de documentos em 'pets': ${petsSnapshot.size}`);
      
      if (petsSnapshot.size > 0) {
        console.log('\nDocumentos em "pets":');
        petsSnapshot.forEach((doc) => {
          console.log(`ID: ${doc.id}`);
          console.log('Dados:', JSON.stringify(doc.data(), null, 2));
          console.log('---');
        });
      } else {
        console.log('Nenhum documento encontrado na collection "pets"');
      }
    } catch (petsError) {
      console.error('Erro específico ao acessar collection "pets":', petsError);
      if (petsError instanceof Error) {
        console.error('Detalhes do erro:', petsError.message);
        console.error('Stack trace:', petsError.stack);
      }
    }

  } catch (error) {
    console.error('Erro geral ao verificar collections:', error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}

// Executar o script
checkCollections(); 