import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { handleStripeWebhook } from '../../services/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Assinatura não encontrada' },
        { status: 400 }
      );
    }

    const result = await handleStripeWebhook(body, signature);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 400 }
    );
  }
} 