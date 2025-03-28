import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Compra } from "../types/Compra";
import { fetchCompras } from "../services/apiService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./DataTable.css";

const columns: GridColDef[] = [
  { field: "id", headerName: "Identificador", width: 150 },
  { field: "AnoProcesso", headerName: "Ano do Processo", width: 150 },
  { field: "CPFCNPJFornecedor", headerName: "CPFCNPJ Fornecedor", width: 150 },
  { field: "DataProcesso", headerName: "Data do Processo", width: 150 },
  {
    field: "EnquadramentoLegal",
    headerName: "Enquadramento Legal",
    width: 150,
  },
  { field: "Fornecedor", headerName: "Fornecedor", width: 150 },
  { field: "Fundamentacao", headerName: "Fundamentação", width: 150 },
  { field: "Municipio", headerName: "Município", width: 150 },
  { field: "Objeto", headerName: "Objeto", width: 150 },
  { field: "Processo", headerName: "Processo", width: 150 },
  { field: "TipoFornecedor", headerName: "Tipo Fornecedor", width: 150 },
  { field: "Unidade", headerName: "Unidade", width: 150 },
  { field: "ValorTotalCompra", headerName: "Valor Total Compra", width: 150 },
];

export default function DataTable() {
  const [rows, setRows] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    async function loadCompras() {
      try {
        const data = await fetchCompras();
        setRows(data);
      } catch (err) {
        console.error("Erro ao buscar os Compras:", err);
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    }

    loadCompras();
  }, []);

  return (
    <Paper elevation={3} className="table-card">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
        />
      )}
    </Paper>
  );
}
