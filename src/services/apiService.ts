import { Compra } from "../types/Compra";

export async function fetchCompras(): Promise<Compra[]> {
  const response = await fetch(
    "/api/v1/compras_diretas_municipio?ano=2025&inicio=0&limite=0&csv=false&jsonfull=false&municipio=SAO GONCALO",
    { headers: { "Content-Type": "application/json" } }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar os dados");
  }

  const data = await response.json();
  console.log(data)
  return data.Compras.map((item: Compra, index: number) => ({
    ...item,
    id: index + 1, // Garante um ID único
  }));
}
