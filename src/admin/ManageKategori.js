import React from "react";
import { Box, Typography } from "@mui/material";
import CreateKategori from "./CreateKategori"; // Import your CreateKategori component
import DeleteKategori from "./DeleteKategori"; // Import your DeleteKategori component

const ManageKategori = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
        Kelola Kategori
      </Typography>

      {/* Tambah Kategori Section */}
      <CreateKategori />

      {/* Delete Kategori Section */}
      <DeleteKategori />
    </Box>
  );
};

export default ManageKategori;
