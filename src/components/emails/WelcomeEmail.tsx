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
  phone?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  isUrgent?: boolean;
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  'novy-web': 'Zbrusu nový web',
  'redesign': 'Redesign stávajícího webu',
  'sprava': 'Měsíční péče (Správa webu)',
};

const BUDGET_LABELS: Record<string, string> = {
  'do-15000': 'do 15 000 Kč',
  '15000-25000': '15 000 – 25 000 Kč',
  'nad-25000': 'nad 25 000 Kč',
};

export default function WelcomeEmail({ name, phone, website, projectType, budget, message, isUrgent }: WelcomeEmailProps = {}) {
  return (
    <Html>
      <Head />
      <Preview>Do 24 hodin se vám ozveme s konkrétním plánem.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Vexx<span style={{ color: "#3B82F6" }}>.</span>
          </Text>

          <Heading style={h1}>Vaše poptávka dorazila v pořádku.</Heading>
          
          <Text style={text}>Dobrý den,</Text>
          <Text style={text}>
            vaše poptávka úspěšně dorazila k nám do Vexx.
          </Text>
          <Text style={text}>
            Víme, že váš čas je drahý. Proto nebudeme zdržovat. Náš tým se nyní
            seznamuje s detaily vašeho projektu a do <strong style={{ color: "#3B82F6" }}>24 hodin</strong> se vám ozveme s konkrétním
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
              {phone && <Text style={summaryText}><strong>Telefon:</strong> {phone}</Text>}
              {website && <Text style={summaryText}><strong>Současný web:</strong> {website}</Text>}
              {projectType && <Text style={summaryText}><strong>Typ projektu:</strong> {PROJECT_TYPE_LABELS[projectType] || projectType}</Text>}
              {budget && <Text style={summaryText}><strong>Rozpočet:</strong> {BUDGET_LABELS[budget] || budget}</Text>}
              {message && <Text style={summaryText}><strong>Představa:</strong> {message}</Text>}
              <Text style={summaryText}>
                <strong>Projekt spěchá:</strong> {isUrgent ? 'Ano' : 'Ne'}
              </Text>
            </Section>
          )}
          
          <Section style={btnContainer}>
            <Button style={button} href="https://vexx.cz/#work">
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

const summarySection = {
  marginTop: "32px",
  padding: "24px",
  backgroundColor: "#eff6ff", // blue-50
  borderRadius: "12px",
  textAlign: "left" as const,
  borderLeft: "4px solid #3B82F6",
};

const summaryTitle = {
  color: "#111111",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const summaryText = {
  color: "#3f3f46",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};
