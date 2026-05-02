const MODAL_URL = import.meta.env.VITE_API_URL as string;

export interface PlantResult {
  commonName: string;
  familyName: string;
  scientificName: string;
  description: string;
}

function parseResult(raw: string): PlantResult {
  const get = (key: string): string => {
    const regex = new RegExp(`${key}:\\s*(.+?)(?=\\n[A-Z]|$)`, "si");
    return raw.match(regex)?.[1]?.trim() ?? "Unknown";
  };
  return {
    commonName:    get("Common name"),
    familyName:    get("Family name"),
    scientificName: get("Scientific name"),
    description:   get("Description"),
  };
}

export async function identifyPlant(file: File): Promise<PlantResult> {
  // Convert file to base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // strip data:image/...;base64,
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const response = await fetch(MODAL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64 }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  return parseResult(data.result);
}