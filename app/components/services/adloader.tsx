"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function AdComponent({ type, zoneId }: { type: string, zoneId:string }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true); // Garante que o código só execute no cliente

    // Remove scripts antigos para evitar conflito
    document.querySelectorAll("script[data-ad-script]").forEach((script) => {
      script.remove();
    });

    // Adiciona o script do Jads
    const jadsScript = document.createElement("script");
    jadsScript.setAttribute("data-ad-script", "true");
    jadsScript.type = "text/javascript";
    jadsScript.setAttribute("data-cfasync", "false");
    jadsScript.async = true;
    jadsScript.src = "https://poweredby.jads.co/js/jads.js";
    document.body.appendChild(jadsScript);

    // Adiciona o script customizado
    const customScript = document.createElement("script");
    customScript.setAttribute("data-ad-script", "true");
    customScript.type = "text/javascript";
    customScript.setAttribute("data-cfasync", "false");
    customScript.async = true;
    customScript.src = `/scripts/${type}.js`;
    document.body.appendChild(customScript);
  }, [pathname]); // Executa sempre que a rota mudar

  if (!isClient) return null; // Evita renderizar no servidor

  return (
    <ins id={zoneId} data-width="908" data-height="258"></ins>
  );
}
