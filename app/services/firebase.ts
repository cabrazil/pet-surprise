import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { PetInfo, RacaCaracteristicas } from '../types';
import fs from 'fs/promises';
import path from 'path';

export const uploadFoto = async (file: File, petId: string): Promise<string> => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Criar pasta para o pet se não existir
    const petDir = path.join(process.cwd(), 'public', 'assets', 'pets', petId);
    await fs.mkdir(petDir, { recursive: true });
    
    // Salvar arquivo
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(petDir, fileName);
    await fs.writeFile(filePath, buffer);
    
    // Retornar URL relativa para acesso via web
    return `/assets/pets/${petId}/${fileName}`;
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