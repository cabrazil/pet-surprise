import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const plans = [
  {
    name: "Básico",
    price: "R$ 49,90",
    features: [
      "Página personalizada",
      "QR Code exclusivo",
      "3 fotos do pet",
      "Informações básicas",
      "Validade de 3 meses"
    ]
  },
  {
    name: "Premium",
    price: "R$ 89,90",
    features: [
      "Página personalizada",
      "QR Code exclusivo",
      "10 fotos do pet",
      "Informações detalhadas",
      "Histórico de vacinas",
      "Validade de 6 meses"
    ],
    popular: true
  },
  {
    name: "Ultimate",
    price: "R$ 149,90",
    features: [
      "Página personalizada",
      "QR Code exclusivo",
      "Fotos ilimitadas",
      "Informações completas",
      "Histórico médico completo",
      "Validade de 12 meses",
      "Suporte prioritário"
    ]
  }
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Escolha seu Plano
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? 'ring-2 ring-purple-600 relative' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-purple-600 mb-6">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <FaCheck className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                plan.popular
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}>
                Escolher Plano
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 