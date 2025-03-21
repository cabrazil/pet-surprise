import { NextResponse } from 'next/server';
import { criarSessaoCheckout } from '@/app/services/stripe';

export async function POST(request: Request) {
  try {
    const { planoId, petId, emailDestinatario } = await request.json();

    if (!planoId || !petId || !emailDestinatario) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    const { sessionId } = await criarSessaoCheckout(
      planoId,
      petId,
      emailDestinatario
    );

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
} 