import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../components/moduleToolbar";

const validationSchema = yup.object({
  title: yup
    .string("Masukkan nama judul")
    .min(4, "Minimal 4 karakter ")
    .required("Nama judul tidak boleh kosong"),
  content: yup
    .string("Masukkan deskripsi")
    .min(10, "minimal 10 karakter ")
    .required("Deskripsi tidak boleh kosong"),
});

// untuk select kategori pada saat ingin menambah post
//    "http://localhost:9000/api/kategori/show"
const CreatePost = () => {
  const [selectedKategori, setSelectedKategori] = useState("");
  const [kategoriList, setKategoriList] = useState([]);

  const fetchKategoriList = async () => {
    try {
      const { data } = await axios.get(
        "https://gembulcimotbackend.onrender.com/kategori/show"
      );
      setKategoriList(data.kategori);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKategoriList();
  }, []);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: null,
    },

    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      values.kategoriId = selectedKategori;
      try {
        const { data } = await axios.post(
          "https://gembulcimotbackend.onrender.com/post/create",
          values
        );
        console.log("Post creation response:", data);
        toast.success("Data berhasil disimpan");
      } catch (error) {
        console.log("Post creation response:", error);
        toast.error(error);
      }
      actions.resetForm();
    },
  });

  useEffect(() => {
    console.log("Selected Kategori:", selectedKategori); // Log the selected kategori
    console.log("Kategori List:", kategoriList); // Log the fetched kategori list
  }, [selectedKategori, kategoriList]);

  return (
    <>
      <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {" "}
          Tambah Data{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="title"
            label="Nama Judul"
            name="title"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Nama Judul"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />

          <Select
            sx={{ mb: 3 }}
            fullWidth
            id="kategori"
            label="Pilih Kategori"
            name="kategori"
            placeholder="Pilih Kategori"
            value={selectedKategori}
            onChange={(e) => setSelectedKategori(e.target.value)}
          >
            <MenuItem value="" disabled>
              Pilih Kategori
            </MenuItem>
            {kategoriList.map((kategori) => (
              <MenuItem key={kategori._id} value={kategori._id}>
                {kategori.namakat}
              </MenuItem>
            ))}
          </Select>

          <Box sx={{ mb: 3 }}>
            <ReactQuill
              theme="snow"
              placeholder={"Tulis deskripsi"}
              modules={modules}
              value={values.content}
              onChange={(e) => setFieldValue("content", e)}
            />
            <Box
              component="span"
              sx={{ color: "#d32f2f", fontSize: "12px", pl: 2 }}
            >
              {touched.content && errors.content}
            </Box>
          </Box>

          <Box border="2px dashed blue" sx={{ p: 1 }}>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              //maxFiles={3}
              onDrop={(acceptedFiles) =>
                acceptedFiles.map((file, index) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setFieldValue("image", reader.result);
                  };
                })
              }
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <Box
                  {...getRootProps()}
                  p="1rem"
                  sx={{
                    "&:hover": { cursor: "pointer" },
                    bgcolor: isDragActive ? "#cceffc" : "#fafafa",
                  }}
                >
                  <input name="banner" {...getInputProps()} />
                  {isDragActive ? (
                    <>
                      <p style={{ textAlign: "center" }}>
                        <CloudUploadIcon
                          sx={{ color: "primary.main", mr: 2 }}
                        />
                      </p>
                      <p style={{ textAlign: "center", fontSize: "12px" }}>
                        {" "}
                        Tarik ke sini
                      </p>
                    </>
                  ) : values.image === null ? (
                    <>
                      <p style={{ textAlign: "center" }}>
                        <CloudUploadIcon
                          sx={{ color: "primary.main", mr: 2 }}
                        />
                      </p>
                      <p style={{ textAlign: "center", fontSize: "12px" }}>
                        Tahan dan tarik di sini
                      </p>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <img
                            style={{ maxWidth: "100px" }}
                            src={values.image}
                            alt=""
                          />
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            elevation={0}
            sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
            // disabled={loading}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
