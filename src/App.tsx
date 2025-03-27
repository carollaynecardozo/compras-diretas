import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./App.css";
import { useEffect, useState } from "react";

const columns: GridColDef<[number]>[] = [
  {
    field: "id",
    headerName: "identificador",
    width: 150,
  },
  {
    field: "Afastamento",
    headerName: "Afastamento",
    width: 150,
  },
  {
    field: "AnoProcesso",
    headerName: "Ano do Processo",
    width: 150,
  },
  {
    field: "DataAprovacao",
    headerName: "Data de Aprovação",
    width: 150,
  },
  {
    field: "EnquadramentoLegal",
    headerName: "Enquadramento Legal",
    width: 150,
  },
  {
    field: "FornecedorVencedor",
    headerName: "Fornecedor Vencedor",
    width: 150,
  },
  {
    field: "Item",
    headerName: "Item",
    width: 150,
  },
  {
    field: "Objeto",
    headerName: "Objeto",
    width: 150,
  },
  {
    field: "Processo",
    headerName: "Processo",
    width: 150,
  },
  {
    field: "Quantidade",
    headerName: "Quantidade",
    width: 150,
  },
  {
    field: "Unidade",
    headerName: "Unidade",
    width: 150,
  },
  {
    field: "UnidadeMedida",
    headerName: "Unidade Medida",
    width: 150,
  },
  {
    field: "ValorProcesso",
    headerName: "Valor Processo",
    width: 150,
  },
  {
    field: "ValorUnitario",
    headerName: "Valor Unitário",
    width: 150,
  },
];

function App() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/v1/compras_diretas_estado?limite=1000&csv=false&jsonfull=false",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const identifiedData = data.map((item: any, index: number) => {
        return {
          ...item,
          id: index + 1,
        };
      });
      setRows(identifiedData);
    }
    fetchData();
  }, []);
  return (
    <div>
      <Paper elevation={3}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </div>
  );
}

export default App;
