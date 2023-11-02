import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const DeleteKategori = () => {
  const [kategoriList, setKategoriList] = useState([]);

  // Fetch kategori list
  //   "http://localhost:9000/api/kategori/show"
  const fetchKategoriList = async () => {
    try {
      const { data } = await axios.get(
        "https://gembulcimotbackend.onrender.com/kategori/show"
      );
      setKategoriList(data.kategori);
    } catch (error) {
      console.error("Error fetching kategori list:", error);
    }
  };

  useEffect(() => {
    fetchKategoriList();
  }, []);

  const deleteKategori = async (kategoriId) => {
    // console.log(id)
    if (window.confirm("Apa anda yakin ingin menghapus kategori ini?")) {
      try {
        const { data } = await axios.delete(
          `https://gembulcimotbackend.onrender.com/delete/kategori/${kategoriId}`
        );
        if (data.success === true) {
          toast.success(data.message);
          fetchKategoriList();
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "No.",
      width: 150,
      valueGetter: (params) => {
        const sequentialNumber =
          kategoriList.findIndex((kategori) => kategori._id === params.value) +
          1;
        return sequentialNumber;
      },
    },
    {
      field: "namakat",
      headerName: "Nama Kategori",
      width: 200,
    },
    {
      field: "Hapus Kategori",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => deleteKategori(params.row._id)}
        >
          Hapus
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Paper sx={{ bgcolor: "white", marginTop: 3 }}>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "black",
              },
              color: "black",
              [`& .${gridClasses.row}`]: {
                bgcolor: "white",
              },
            }}
            rows={kategoriList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DeleteKategori;
