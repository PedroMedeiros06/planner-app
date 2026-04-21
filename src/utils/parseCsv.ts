export function processCSV(fileName: string, rows: string[][]) {
  const resultados: any[] = [];

  const limpar = (texto: string) => {
    if (!texto) return "";
    return texto.replace(/"/g, "").replace(/,$/, "").trim();
  };

  function parseAmount(value: any) {
    if (!value) return 0;

    return Number(String(value).replace(/\./g, "").replace(",", "."));
  }

  rows.forEach((row) => {
    let data, identificador, transacao, detalhes, valor, tipo, banco;

    if (fileName.startsWith("NU_")) {
      banco = "nubank";
      data = limpar(row[0]);
      identificador = limpar(row[2]);
      valor = (parseAmount(limpar(row[1])) / 1000);
      transacao = "Pix/Transferência";
      detalhes = limpar(row[3]);
      tipo = valor < 0 ? "Saída" : "Entrada";
    } else {
      banco = "bb";
      data = limpar(row[0]);
      identificador = Math.random()*100
      transacao = limpar(row[1]);
      detalhes = limpar(row[2]);
      valor = parseAmount(limpar(row[4]));
      tipo = limpar(row[5]);
    }

    const ehCabecalho = data?.toLowerCase().includes("data");
    const ehSaldo = transacao?.toLowerCase().includes("saldo anterior");

    if ( data && data.includes("/") && !ehCabecalho && !ehSaldo && transacao !== "Saldo do dia" && transacao !== "S A L D O") {
      resultados.push({
        banco: banco,
        data: data,
        transacao: transacao,
        detalhes: detalhes,
        valor: valor,
        tipo: tipo,
        id: identificador,
      });
    }
  });

  return resultados;
}
