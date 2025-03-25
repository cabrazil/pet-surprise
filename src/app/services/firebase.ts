import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PetInfo, RacaCaracteristicas } from '../types';

const storage = getStorage();

export const uploadFoto = async (file: File, petId: string): Promise<string> => {
  try {
    // Criar referência para o arquivo no Storage
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `pets/${petId}/${fileName}`);
    
    // Upload do arquivo com metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    
    await uploadBytes(storageRef, file, metadata);
    
    // Obter URL de download
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao salvar foto:', error);
    throw error;
  }
};

export const cadastrarPet = async (petInfo: Omit<PetInfo, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'pets'), petInfo);
  return docRef.id;
};

export const buscarCaracteristicasRaca = async (raca: string): Promise<RacaCaracteristicas | null> => {
  const racasRef = collection(db, 'racas');
  const q = query(racasRef, where('nome', '==', raca));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  const racaDoc = querySnapshot.docs[0];
  return { id: racaDoc.id, ...racaDoc.data() } as RacaCaracteristicas;
};

export const buscarPet = async (id: string): Promise<PetInfo | null> => {
  const petRef = doc(db, 'pets', id);
  const petDoc = await getDoc(petRef);
  
  if (!petDoc.exists()) {
    return null;
  }

  return { id: petDoc.id, ...petDoc.data() } as PetInfo;
}; 