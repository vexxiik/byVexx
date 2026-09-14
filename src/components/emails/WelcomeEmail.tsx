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

interface WelcomeEmailProps {
  name?: string;
  message?: string;
  isUrgent?: boolean;
}

export default function WelcomeEmail({ name, message, isUrgent }: WelcomeEmailProps = {}) {
  return (
    <Html>
      <Head />
      <Preview>Do 24 hodin se vám ozveme s konkrétním plánem.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Vaše poptávka dorazila v pořádku.</Heading>
          
          <Text style={text}>Dobrý den,</Text>
          <Text style={text}>
            vaše poptávka úspěšně dorazila k nám do Vexx.
          </Text>
          <Text style={text}>
            Víme, že váš čas je drahý. Proto nebudeme zdržovat. Náš tým se nyní
            seznamuje s detaily vašeho projektu a do 24 hodin se vám ozveme s konkrétním
            návrhem dalšího postupu.
          </Text>
          <Text style={text}>
            Nestavíme weby jako na běžícím pásu. Navrhujeme řešení, která přesně
            odpovídají fázi vašeho byznysu a generují zisk.
          </Text>
          <Text style={text}>
            Zatímco čekáte, můžete si prohlédnout naše případové studie a výsledky.
          </Text>
          
          {(name || message) && (
            <Section style={summarySection}>
              <Text style={summaryTitle}>Shrnutí vaší poptávky:</Text>
              {name && <Text style={summaryText}><strong>Jméno:</strong> {name}</Text>}
              {message && <Text style={summaryText}><strong>Zpráva:</strong> {message}</Text>}
              <Text style={summaryText}>
                <strong>Projekt spěchá:</strong> {isUrgent ? 'Ano' : 'Ne'}
              </Text>
            </Section>
          )}
          
          <Section style={btnContainer}>
            <Button style={button} href="https://byvexx.cz/#work">
              Prohlédnout výsledky
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

const summarySection = {
  marginTop: "32px",
  padding: "24px",
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  textAlign: "left" as const,
};

const summaryTitle = {
  color: "#111111",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const summaryText = {
  color: "#52525b",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};
