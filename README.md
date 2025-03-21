# Pet Surprise - Presente Personalizado para Pets

Uma plataforma para criar presentes personalizados para donos de pets, gerando páginas exclusivas com QR Code.

## Tecnologias Utilizadas

- Next.js 13
- TypeScript
- Tailwind CSS
- Firebase
- Stripe
- AWS SES
- Framer Motion

## Pré-requisitos

- Node.js 18.x ou superior
- NPM ou Yarn
- Conta no Firebase
- Conta no Stripe
- Conta na AWS

## Configuração

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd pet-surprise
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.local.example` para `.env.local`
- Preencha as variáveis com suas credenciais:
  - Firebase
  - Stripe
  - AWS SES

4. Configure o Firebase:
- Crie um novo projeto no Firebase Console
- Ative o Firestore Database
- Ative o Storage
- Copie as credenciais para o arquivo `.env.local`

5. Configure o Stripe:
- Crie uma conta no Stripe
- Obtenha as chaves de API
- Adicione as chaves ao arquivo `.env.local`

6. Configure o AWS SES:
- Configure sua conta AWS
- Verifique os domínios de e-mail
- Adicione as credenciais ao arquivo `.env.local`

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

```
pet-surprise/
├── app/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   └── PricingSection.tsx
│   ├── firebase.ts
│   └── page.tsx
├── public/
├── styles/
└── ...
```

## Deploy

O projeto está configurado para deploy na Vercel. Para fazer o deploy:

1. Crie uma conta na Vercel
2. Conecte seu repositório
3. Configure as variáveis de ambiente na Vercel
4. Deploy!

## Contribuição

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
