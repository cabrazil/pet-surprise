'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  url: string;
  size?: number;
}

export default function QRCodeComponent({ url, size = 200 }: QRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    async function generateQRCode() {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
          width: size,
          margin: 2,
          color: {
            dark: '#7C3AED',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(qrCodeDataUrl);
      } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
      }
    }

    generateQRCode();
  }, [url, size]);

  if (!qrCodeUrl) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-lg" style={{ width: size, height: size }} />
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
      <p className="text-center text-sm text-gray-600 mt-2">
        Escaneie para acessar a página do pet
      </p>
    </div>
  );
} 