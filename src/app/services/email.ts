import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import QRCode from 'qrcode';

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface EnviarEmailPresenteParams {
  emailDestinatario: string;
  nomePet: string;
  urlPagina: string;
  plano: string;
}

export async function enviarEmailPresente({
  emailDestinatario,
  nomePet,
  urlPagina,
  plano
}: EnviarEmailPresenteParams) {
  try {
    // Gerar QR Code como Data URL
    const qrCodeDataUrl = await QRCode.toDataURL(urlPagina);

    // Template do e-mail em HTML
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Seu Presente Pet Especial!</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #6B46C1; text-align: center;">🎁 Você Recebeu um Presente Especial! 🐾</h1>
            
            <p style="font-size: 16px; margin: 20px 0;">
              Olá! Você recebeu uma página especial dedicada ao pet ${nomePet}!
            </p>

            <p style="font-size: 16px; margin: 20px 0;">
              Seu plano <strong>${plano}</strong> foi ativado com sucesso.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <p style="font-weight: bold; margin-bottom: 15px;">
                Escaneie o QR Code abaixo para acessar a página especial:
              </p>
              <img src="${qrCodeDataUrl}" alt="QR Code" style="max-width: 200px;">
            </div>

            <p style="font-size: 16px; margin: 20px 0;">
              Ou acesse diretamente através deste link:
              <a href="${urlPagina}" style="color: #6B46C1; text-decoration: none;">
                ${urlPagina}
              </a>
            </p>

            <div style="background-color: #F3F4F6; padding: 15px; border-radius: 8px; margin-top: 30px;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                Esta é uma mensagem automática. Por favor, não responda a este e-mail.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [emailDestinatario],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `🎁 Seu Presente Pet Especial - ${nomePet}`,
        },
      },
      Source: process.env.AWS_SES_FROM_EMAIL!, // E-mail verificado no SES
    });

    await sesClient.send(command);
    console.log(`E-mail enviado com sucesso para ${emailDestinatario}`);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
} 