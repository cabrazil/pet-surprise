import type { Metadata } from "next";
import "./globals.css";
import Template from "./template";

export const metadata: Metadata = {
  title: "Pet Surprise - Presente Especial para Pets",
  description: "Crie uma página personalizada e exclusiva para celebrar o pet de alguém especial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <Template>{children}</Template>
    </html>
  );
}
