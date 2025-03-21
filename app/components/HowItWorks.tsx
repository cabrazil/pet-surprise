import { motion } from 'framer-motion';

const steps = [
  {
    number: "1",
    title: "Escolha o Plano",
    description: "Selecione o plano que melhor se adequa às suas necessidades"
  },
  {
    number: "2",
    title: "Personalize",
    description: "Adicione fotos e informações sobre o pet"
  },
  {
    number: "3",
    title: "Pagamento",
    description: "Realize o pagamento de forma segura"
  },
  {
    number: "4",
    title: "Entrega",
    description: "O presenteado receberá um e-mail com o QR Code exclusivo"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Como Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg text-center relative z-10">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-2 transform translate-x-1/2">
                  <div className="h-1 w-full bg-purple-200 relative">
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 