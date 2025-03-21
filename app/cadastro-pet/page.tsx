'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { uploadFoto, cadastrarPet, buscarCaracteristicasRaca } from '../services/firebase';
import type { PetInfo, RacaCaracteristicas } from '../types';
import ImageUpload from '../components/ImageUpload';

export default function CadastroPet() {
  const [fotos, setFotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [caracteristicasRaca, setCaracteristicasRaca] = useState<RacaCaracteristicas | null>(null);

  const handleRacaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raca = e.target.value;
    if (raca.length > 2) {
      const caracteristicas = await buscarCaracteristicasRaca(raca);
      setCaracteristicasRaca(caracteristicas);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const petInfo: Partial<PetInfo> = {
        nome: formData.get('nome') as string,
        raca: formData.get('raca') as string,
        idade: Number(formData.get('idade')),
        dataVacinacao: formData.get('dataVacinacao') as string,
        caracteristicasRaca: caracteristicasRaca || undefined,
        fotos: []
      };

      // Cadastrar pet e obter ID
      const petId = await cadastrarPet(petInfo as Omit<PetInfo, 'id'>);

      // Upload das fotos
      const urlsFotos = await Promise.all(
        fotos.map(foto => uploadFoto(foto, petId))
      );

      // Atualizar pet com URLs das fotos
      petInfo.fotos = urlsFotos;
      await cadastrarPet({ ...petInfo, id: petId } as PetInfo);

      alert('Pet cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      alert('Erro ao cadastrar pet. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Cadastro do Pet</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="nome">
                Nome do Pet
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="raca">
                Raça
              </label>
              <input
                type="text"
                id="raca"
                name="raca"
                required
                onChange={handleRacaChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {caracteristicasRaca && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Características da Raça</h3>
                <p><strong>Temperamento:</strong> {caracteristicasRaca.temperamento}</p>
                <p><strong>Tamanho Médio:</strong> {caracteristicasRaca.tamanhoMedio}</p>
                <p><strong>Expectativa de Vida:</strong> {caracteristicasRaca.expectativaVida}</p>
                <p><strong>Nível de Energia:</strong> {caracteristicasRaca.nivelEnergia}/5</p>
                <p><strong>Necessidade de Exercício:</strong> {caracteristicasRaca.necessidadeExercicio}/5</p>
                <p><strong>Facilidade de Treinamento:</strong> {caracteristicasRaca.facilidadeTreinamento}/5</p>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="idade">
                Idade (anos)
              </label>
              <input
                type="number"
                id="idade"
                name="idade"
                required
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="dataVacinacao">
                Data da Última Vacinação
              </label>
              <input
                type="date"
                id="dataVacinacao"
                name="dataVacinacao"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <ImageUpload onImagesSelected={setFotos} />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                loading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Pet'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 