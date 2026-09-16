export interface AresData {
  ico: string;
  address: string;
  ceoName?: string;
}

export async function fetchAresData(companyName: string): Promise<AresData | null> {
  try {
    const res = await fetch("https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/vyhledat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        obchodniJmeno: companyName,
        pocet: 1
      })
    });

    if (!res.ok) {
      console.error("ARES API Error:", await res.text());
      return null;
    }

    const data = await res.json();
    
    if (data.ekonomickeSubjekty && data.ekonomickeSubjekty.length > 0) {
      const subject = data.ekonomickeSubjekty[0];
      return {
        ico: subject.ico || "",
        address: subject.sidlo?.textovaAdresa || "",
      };
    }
    
    return null;
  } catch (error) {
    console.error("Chyba při komunikaci s ARES API:", error);
    return null;
  }
}
