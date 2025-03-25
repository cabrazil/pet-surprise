'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import type { PetInfo } from '../../types';
import Image from 'next/image';

export default function PetPage({ params }: { params: { id: string } }) {
  const [pet, setPet] = useState<PetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function carregarPet() {
      try {
        const petDoc = await getDoc(doc(db, 'pets', params.id));
        if (petDoc.exists()) {
          setPet(petDoc.data() as PetInfo);
        }
      } catch (error) {
        console.error('Erro ao carregar pet:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarPet();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-2">Pet não encontrado</h1>
          <p className="text-gray-600">O pet que você está procurando não existe ou foi removido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Galeria de Fotos */}
          <div className="relative h-64 bg-gray-100">
            {pet.fotos.length > 0 ? (
              <>
                <Image
                  src={pet.fotos[currentImageIndex]}
                  alt={`Foto ${currentImageIndex + 1} do ${pet.nome}`}
                  fill
                  className="object-cover"
                />
                {pet.fotos.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {pet.fotos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Nenhuma foto disponível
              </div>
            )}
          </div>

          {/* Informações do Pet */}
          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-purple-800 mb-2">{pet.nome}</h1>
              <p className="text-gray-600 text-lg">{pet.raca}</p>
            </div>

            {/* Características Básicas */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Idade</p>
                <p className="font-semibold text-purple-800">{pet.idade} anos</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Última Vacinação</p>
                <p className="font-semibold text-purple-800">
                  {new Date(pet.dataVacinacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Características da Raça */}
            {pet.caracteristicasRaca && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-purple-800 mb-3">Características da Raça</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Temperamento</p>
                    <p className="font-semibold text-purple-800">{pet.caracteristicasRaca.temperamento}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tamanho</p>
                    <p className="font-semibold text-purple-800">{pet.caracteristicasRaca.tamanhoMedio}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Expectativa de Vida</p>
                    <p className="font-semibold text-purple-800">{pet.caracteristicasRaca.expectativaVida}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Nível de Energia</p>
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${(pet.caracteristicasRaca.nivelEnergia / 5) * 100}%` }}
                        />
                      </div>
                      <span className="font-semibold text-purple-800">{pet.caracteristicasRaca.nivelEnergia}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem */}
            {pet.mensagem && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-purple-800 mb-2">Mensagem Especial</h2>
                <p className="text-gray-700 italic">{pet.mensagem}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 