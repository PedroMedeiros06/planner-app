import * as DocumentPicker from "expo-document-picker";
import Papa from "papaparse";

export async function pickCSV() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
  });

  if (result.canceled) return null;

  const file = result.assets[0];

  const response = await fetch(file.uri);
  const text = await response.text();

  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}