import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
}

export default function ImageUpload({ onImagesSelected }: ImageUploadProps) {
  const [fotosPreview, setFotosPreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novasFotos = Array.from(e.target.files);
      onImagesSelected(novasFotos);
      
      // Criar previews
      novasFotos.forEach(foto => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFotosPreview(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(foto);
      });
    }
  };

  const removerFoto = (index: number) => {
    setFotosPreview(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 mb-2">
        Fotos do Pet
      </label>
      <div className="flex flex-wrap gap-4 mb-4">
        {fotosPreview.map((preview, index) => (
          <div key={index} className="relative w-24 h-24 group">
            <Image
              src={preview}
              alt={`Preview ${index + 1}`}
              fill
              className="rounded-lg object-cover"
            />
            <button
              onClick={() => removerFoto(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full px-4 py-2 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
      >
        Adicionar Fotos
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />
    </div>
  );
} 