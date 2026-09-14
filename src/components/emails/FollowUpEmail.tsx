import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

export default function FollowUpEmail() {
  return (
    <Html>
      <Head />
      <Preview>Design je k ničemu, pokud negeneruje zisk.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Proč weby od Vexx. vydělávají víc.</Heading>
          
          <Text style={text}>Dobrý den,</Text>
          
          <Text style={text}>
            levné weby z WordPressových šablon vypadají možná na první pohled dobře. Skrývají ale pomalé načítání, slabé zabezpečení a mizernou konverzní míru. A každý zákazník, který odejde kvůli pomalému webu, jsou vaše ztracené peníze.
          </Text>
          
          <Text style={highlightText}>Ve Vexx. to děláme jinak.</Text>
          
          <Section style={listContainer}>
            <Text style={listItem}>
              <strong>1. Blesková rychlost (Next.js):</strong> Stavíme na stejné infrastruktuře, jakou používají giganti jako Netflix nebo TikTok. Načtení v řádu milisekund.
            </Text>
            <Text style={listItem}>
              <strong>2. Psychologický copywriting:</strong> Nepíšeme výplňové texty. Píšeme argumenty, které bourají námitky a nutí klienta nakoupit.
            </Text>
            <Text style={listItem}>
              <strong>3. All-in-One infrastruktura:</strong> Od designu přes nasazení až po pokročilou analytiku (Vercel). Vše pod jednou střechou.
            </Text>
          </Section>
          
          <Text style={strongText}>
            Neprodáváme kód. Prodáváme vaši online dominanci.
          </Text>
          
          <Text style={text}>
            Pokud máte chvilku, pojďme probrat, jak tyto principy aplikujeme na váš byznys.
          </Text>
          
          <Section style={btnContainer}>
            <Button style={button} href="https://byvexx.cz/#contact">
              Rezervovat krátký hovor
            </Button>
          </Section>
          
          <Text style={footer}>
            S pozdravem,<br />
            Tým Vexx.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "580px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#111111",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.2",
  margin: "0 0 24px",
  letterSpacing: "-0.5px",
};

const text = {
  color: "#52525b",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const highlightText = {
  color: "#111111",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "1.6",
  margin: "32px 0 24px",
};

const strongText = {
  color: "#111111",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "1.6",
  margin: "24px 0 24px",
};

const listContainer = {
  textAlign: "left" as const,
  backgroundColor: "#f4f4f5",
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
};

const listItem = {
  color: "#52525b",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 12px",
};

const btnContainer = {
  marginTop: "32px",
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#111111",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const footer = {
  color: "#111111",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "1.6",
  marginTop: "32px",
};
