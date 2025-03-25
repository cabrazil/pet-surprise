'use client';

import { FaPaw, FaQrcode, FaCamera, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="text-purple-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">
      {title}
    </h3>
    <p className="text-gray-600">
      {description}
    </p>
  </motion.div>
);

const features = [
  {
    icon: <FaPaw className="w-8 h-8" />,
    title: "Perfil Personalizado",
    description: "Crie um perfil único com todas as informações importantes do pet"
  },
  {
    icon: <FaQrcode className="w-8 h-8" />,
    title: "QR Code Exclusivo",
    description: "Acesso fácil através de um QR Code personalizado"
  },
  {
    icon: <FaCamera className="w-8 h-8" />,
    title: "Galeria de Fotos",
    description: "Compartilhe os momentos mais especiais do pet"
  },
  {
    icon: <FaHeart className="w-8 h-8" />,
    title: "Presente Especial",
    description: "Surpreenda alguém com um presente único e memorável"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Por que escolher nosso serviço?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 