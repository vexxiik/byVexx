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
          <Text style={logo}>
            Vexx<span style={{ color: "#3B82F6" }}>.</span>
          </Text>
          
          <Heading style={h1}>
            Proč weby od Vexx. <span style={{ color: "#3B82F6" }}>vydělávají víc.</span>
          </Heading>
          
          <Text style={text}>Dobrý den,</Text>
          
          <Text style={text}>
            levné weby z WordPressových šablon vypadají možná na první pohled dobře. Skrývají ale pomalé načítání, slabé zabezpečení a mizernou konverzní míru. A každý zákazník, který odejde kvůli pomalému webu, jsou vaše ztracené peníze.
          </Text>
          
          <Text style={highlightText}>Ve Vexx. to děláme jinak.</Text>
          
          <Section style={listContainer}>
            <Text style={listItem}>
              <strong style={{ color: "#3B82F6" }}>1. Blesková rychlost (Next.js):</strong> Stavíme na stejné infrastruktuře, jakou používají giganti jako Netflix nebo TikTok. Načtení v řádu milisekund.
            </Text>
            <Text style={listItem}>
              <strong style={{ color: "#3B82F6" }}>2. Psychologický copywriting:</strong> Nepíšeme výplňové texty. Píšeme argumenty, které bourají námitky a nutí klienta nakoupit.
            </Text>
            <Text style={listItem}>
              <strong style={{ color: "#3B82F6" }}>3. All-in-One infrastruktura:</strong> Od designu přes nasazení až po pokročilou analytiku (Vercel). Vše pod jednou střechou.
            </Text>
          </Section>
          
          <Text style={strongText}>
            Neprodáváme kód. Prodáváme vaši online dominanci.
          </Text>
          
          <Text style={text}>
            Pokud máte chvilku, pojďme probrat, jak tyto principy aplikujeme na váš byznys.
          </Text>
          
          <Section style={btnContainer}>
            <Button style={button} href="https://vexx.cz/#contact">
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
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "40px auto",
  padding: "40px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
  maxWidth: "600px",
  textAlign: "left" as const,
};

const logo = {
  fontSize: "24px",
  fontWeight: "800",
  letterSpacing: "-1px",
  color: "#111111",
  margin: "0 0 32px 0",
};

const h1 = {
  color: "#111111",
  fontSize: "28px",
  fontWeight: "800",
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
  fontWeight: "700",
  lineHeight: "1.6",
  margin: "32px 0 24px",
};

const strongText = {
  color: "#111111",
  fontSize: "18px",
  fontWeight: "700",
  lineHeight: "1.6",
  margin: "32px 0 24px",
  borderLeft: "4px solid #3B82F6",
  paddingLeft: "16px",
};

const listContainer = {
  textAlign: "left" as const,
  backgroundColor: "#eff6ff", // blue-50
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
};

const listItem = {
  color: "#3f3f46",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const btnContainer = {
  marginTop: "40px",
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#3B82F6",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
};

const footer = {
  color: "#71717a",
  fontSize: "15px",
  lineHeight: "1.6",
  marginTop: "40px",
  borderTop: "1px solid #e4e4e7",
  paddingTop: "24px",
};
