import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from 'stripe';
import { enviarEmailPresente } from './email';
import { buscarPet } from './firebase';
import { planos } from '../constants/planos';

// Inicializar Stripe no lado do cliente
export const getStripe = () => {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  return loadStripe(stripePublicKey);
};

// Inicializar Stripe no lado do servidor
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export const criarSessaoCheckout = async (
  planoId: string,
  petId: string,
  emailDestinatario: string
) => {
  try {
    // Para testes, vamos usar preços de teste do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: planos[planoId as keyof typeof planos].nome,
              description: planos[planoId as keyof typeof planos].descricao,
            },
            unit_amount: planos[planoId as keyof typeof planos].preco,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}&pet_id=${petId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancelado`,
      customer_email: emailDestinatario,
      metadata: {
        petId,
        planoId,
      },
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Erro ao criar sessão do Stripe:', error);
    throw error;
  }
};

// Webhook para processar eventos do Stripe
export const handleStripeWebhook = async (
  requestBody: any,
  signature: string
) => {
  try {
    const event = stripe.webhooks.constructEvent(
      requestBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const { petId, planoId } = session.metadata!;
        
        // Buscar informações do pet
        const pet = await buscarPet(petId);
        if (!pet) {
          throw new Error('Pet não encontrado');
        }

        // Gerar URL da página do pet
        const urlPagina = `${process.env.NEXT_PUBLIC_BASE_URL}/pets/${petId}`;

        // Enviar e-mail com QR Code
        await enviarEmailPresente({
          emailDestinatario: session.customer_email!,
          nomePet: pet.nome,
          urlPagina,
          plano: planos[planoId as keyof typeof planos].nome,
        });

        break;
      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error('Erro no webhook:', error);
    throw error;
  }
}; 