import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../components/moduleToolbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = yup.object({
  title: yup
    .string("Masukkan nama judul")
    .min(4, "Minimal 4 karakter")
    .required("Nama judul tidak boleh kosong"),
  content: yup
    .string("Masukkan deskripsi")
    .min(10, "Minimal 10 karakter")
    .required("Deskripsi tidak boleh kosong"),
});

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [kategoriList, setKategoriList] = useState([]);

  const navigate = useNavigate();

  // const untuk kategori
  //      "http://localhost:9000/api/kategori/show"
  const KategoriById = async () => {
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
    const fetchData = async () => {
      await KategoriById();
      await singlePostById();
    };

    fetchData();
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
      title,
      content,
      image: "",
    },

    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      updatePost(values);
      actions.resetForm();
    },
  });

  //show post by Id
  const singlePostById = async () => {
    // console.log(id)
    // http://localhost:9000/api/post/${id}
    try {
      const { data } = await axios.get(
        `https://gembulcimotbackend.onrender.com/post/${id}`
      );
      setTitle(data.post.title);
      setSelectedKategori(data.post.kategoriId);
      setContent(data.post.content);
      setImagePreview(data.post.image.url);
      console.log("single post admin", data.post);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    singlePostById();
  }, []);

  const updatePost = async (values) => {
    try {
      console.log("Selected Kategori:", selectedKategori); // Tambahkan baris ini

      values.kategoriId = selectedKategori; // Add the selected category to the values
      console.log("Update Values:", values);
      const { data } = await axios.put(
        `https://gembulcimotbackend.onrender.com/update/post/${id}`,
        values
      );
      console.log("Update Response:", data);

      if (data.success === true) {
        toast.success("Data Berhasil Update");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {" "}
          Ubah Data{" "}
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

          {/* edit kategori */}
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

          {/* tulis deskripsi */}
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

          {/* gambar */}
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
                  <input name="image" {...getInputProps()} />
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
                        Tahan dan tarik gambar di sini
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
                            src={
                              values.image === "" ? imagePreview : values.image
                            }
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
            Simpan Perubahan
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EditPost;
