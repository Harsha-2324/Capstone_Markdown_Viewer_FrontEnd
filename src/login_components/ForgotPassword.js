import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../config";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export function ForgotPassword() {
  const navigate = useNavigate();
  const userContextData = useContext(UserContext);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: yup.object({
        email: yup.string().required().email(),
      }),
      onSubmit: async (values) => {
        userContextData.setmailid(values.email);
        try {
          let mail = await axios.post(`${config.api}/user/sendmail`, values);
          if (mail.data) {
            toast.success(mail.data.message);
            // navigate("/verification");
          } else {
            alert(mail.data.message);
          }
          // toast.success(mail.data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit} className="forgot-form form">
        <h3>Forgot Your Password?</h3>
        <TextField
          type="email"
          label="Enter Registered Email ID"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email ? true : false}
          helperText={touched.email && errors.email ? errors.email : null}
        />

        <button
          type="submit"
          className="col-lg-12 btn btn-secondary btn-lg btn-block"
          variant="contained"
        >
          VERIFY
        </button>
      </form>
    </>
  );
}
