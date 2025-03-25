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
        caracteristicasRaca: caracteristicasRaca || null,
        fotos: [],
        mensagem: formData.get('mensagem') as string
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-purple-800 mb-1">Criar Presente Surpresa</h1>
            <p className="text-gray-600 text-base">
              Preencha os detalhes do seu pet para criar um presente especial
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="nome">
                Nome do Pet
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                placeholder="Digite o nome do seu pet"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="raca">
                  Raça
                </label>
                <input
                  type="text"
                  id="raca"
                  name="raca"
                  required
                  onChange={handleRacaChange}
                  placeholder="Ex: Labrador"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="idade">
                  Idade (anos)
                </label>
                <input
                  type="number"
                  id="idade"
                  name="idade"
                  required
                  min="0"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="dataVacinacao">
                  Última Vacinação
                </label>
                <input
                  type="date"
                  id="dataVacinacao"
                  name="dataVacinacao"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            {caracteristicasRaca && (
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-1">Características da Raça</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong>Temperamento:</strong> {caracteristicasRaca.temperamento}</p>
                  <p><strong>Tamanho:</strong> {caracteristicasRaca.tamanhoMedio}</p>
                  <p><strong>Expectativa:</strong> {caracteristicasRaca.expectativaVida}</p>
                  <p><strong>Energia:</strong> {caracteristicasRaca.nivelEnergia}/5</p>
                  <p><strong>Exercício:</strong> {caracteristicasRaca.necessidadeExercicio}/5</p>
                  <p><strong>Treinamento:</strong> {caracteristicasRaca.facilidadeTreinamento}/5</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="mensagem">
                Mensagem para o Presente
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={3}
                placeholder="Escreva uma mensagem especial que será enviada junto com o presente..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 resize-none"
              />
            </div>

            <ImageUpload onImagesSelected={setFotos} />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-6 rounded-lg font-semibold text-white transition-colors ${
                loading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? 'Criando Presente...' : 'Criar Presente Surpresa'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 