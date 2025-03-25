export const planos = {
  basico: {
    id: 'price_basico',
    preco: 4990, // R$ 49,90
    nome: 'Básico',
    descricao: 'Plano básico para presentear um pet',
    recursos: [
      'Página personalizada',
      'QR Code exclusivo',
      '3 fotos do pet',
      'Informações básicas',
      'Validade de 3 meses'
    ]
  },
  premium: {
    id: 'price_premium',
    preco: 8990, // R$ 89,90
    nome: 'Premium',
    descricao: 'Plano premium com mais recursos',
    recursos: [
      'Página personalizada',
      'QR Code exclusivo',
      '10 fotos do pet',
      'Informações detalhadas',
      'Histórico de vacinas',
      'Validade de 6 meses'
    ]
  },
  ultimate: {
    id: 'price_ultimate',
    preco: 14990, // R$ 149,90
    nome: 'Ultimate',
    descricao: 'Plano completo com todos os recursos',
    recursos: [
      'Página personalizada',
      'QR Code exclusivo',
      'Fotos ilimitadas',
      'Informações completas',
      'Histórico médico completo',
      'Validade de 12 meses',
      'Suporte prioritário'
    ]
  }
}; 