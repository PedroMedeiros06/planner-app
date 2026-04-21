import * as DocumentPicker from "expo-document-picker";
import Papa from "papaparse";

export async function pickAndParseCSV() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
  });

  if (result.canceled) return null;

  const file = result.assets[0];

  const response = await fetch(file.uri);
  const buffer = await response.arrayBuffer();

  let text;

  if (file.name.includes("NU_")) {
    text = new TextDecoder("utf-8").decode(buffer);
  } else {
    text = new TextDecoder("iso-8859-1").decode(buffer);
  }

  const parsed = Papa.parse<string[]>(text, {
    skipEmptyLines: true,
  });

  return {
    fileName: file.name,
    rows: parsed.data,
  };
}
