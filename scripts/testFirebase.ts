import { db } from '../src/app/firebase.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

async function testFirebaseConnection() {
  try {
    console.log('Iniciando teste de conexão com Firebase...');
    
    if (!db) {
      throw new Error('Firebase não está inicializado corretamente');
    }

    console.log('Firebase está inicializado');

    // Tenta adicionar um documento simples
    const testCollection = collection(db, 'test');
    const testDoc = {
      test: 'teste'
    };
    
    console.log('Tentando adicionar documento de teste:', JSON.stringify(testDoc, null, 2));
    
    // Verifica se a coleção existe
    const snapshot = await getDocs(testCollection);
    console.log('Coleção existe, número de documentos:', snapshot.size);
    
    // Tenta adicionar o documento
    const docRef = await addDoc(testCollection, testDoc);
    console.log('Documento adicionado com ID:', docRef.id);

    // Verifica se o documento foi adicionado
    const newSnapshot = await getDocs(testCollection);
    console.log('Número de documentos após adição:', newSnapshot.size);
    
    // Mostra os documentos
    newSnapshot.forEach((doc) => {
      console.log('Documento:', doc.id, doc.data());
    });
    
  } catch (error) {
    console.error('Erro ao testar conexão com Firebase:', error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}

// Executar o teste
testFirebaseConnection(); 