'use client';

import { useState } from 'react';
import QRCodeComponent from '../components/QRCode';

export default function TesteQR() {
  const [petId, setPetId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o e-mail com o QR Code
    console.log('Enviando e-mail com QR Code para o pet:', petId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            Teste do QR Code
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formulário de Teste */}
            <div>
              <h2 className="text-xl font-semibold text-purple-800 mb-4">
                Gerar QR Code
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="petId">
                    ID do Pet
                  </label>
                  <input
                    type="text"
                    id="petId"
                    value={petId}
                    onChange={(e) => setPetId(e.target.value)}
                    placeholder="Digite o ID do pet"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-6 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  Gerar QR Code
                </button>
              </form>
            </div>

            {/* Visualização do QR Code */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">
                QR Code Gerado
              </h2>
              {petId ? (
                <QRCodeComponent
                  url={`${window.location.origin}/pet/${petId}`}
                  size={200}
                />
              ) : (
                <div className="text-center text-gray-500">
                  Digite um ID de pet para gerar o QR Code
                </div>
              )}
            </div>
          </div>

          {/* Instruções */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">
              Como Testar
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Digite o ID de um pet cadastrado no campo acima</li>
              <li>Clique em "Gerar QR Code"</li>
              <li>O QR Code será gerado automaticamente</li>
              <li>Você pode escanear o QR Code com seu celular para testar</li>
              <li>A página do pet será aberta no navegador do celular</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 