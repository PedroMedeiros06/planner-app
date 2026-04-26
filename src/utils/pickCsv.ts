import * as DocumentPicker from "expo-document-picker";
import Papa from "papaparse";

function decodeCSV(buffer: ArrayBuffer) {
  const utf8 = new TextDecoder("utf-8").decode(buffer);

  if (utf8.includes("�") || utf8.includes("ï¿½")) {
    return new TextDecoder("iso-8859-1").decode(buffer);
  }

  return utf8;
}

export async function pickAndParseCSV(bank: string) {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
  });

  
  if (result.canceled) return null;

  const file = result.assets[0];

  const response = await fetch(file.uri);
  const buffer = await response.arrayBuffer();

  let text = decodeCSV(buffer)

  const parsed = Papa.parse<string[]>(text, {
    skipEmptyLines: true,
  });

  return {
    fileName: file.name,
    rows: parsed.data,
  };
}
