import styled from "@emotion/styled";
import { FormHelperText, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "components/ui/Button";
import Paper from "components/ui/Paper";
import { useFormik } from "formik";
import { useTracking } from "hooks/useTracking";

const Wrapper = styled(Paper)`
  padding: 20px;
  width: 100%;
  max-width: 500px;

  h4 {
    font-size: 1.8rem;
    margin: 0;
    padding-bottom: 10px;
  }

  form {
    width: 100%;
  }

  .control {
    width: 100%;
  }
`;

interface Values {
  email: string;
}

export default function Subscribe() {
  const tracking = useTracking();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values: Values, helpers) => {
      if (!values.email) {
        return;
      }
      tracking.subscribe();

      const data = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const json = await data.json();
      if (!json.success) {
        alert("Something went wrong");
      }

      alert("Thank you for joining! We'll be in touch soon!");
      helpers.resetForm();
    },
  });

  return (
    <Wrapper>
      <h4>Join with email!</h4>

      <form onSubmit={formik.handleSubmit}>
        <FormControl className="control">
          <TextField
            placeholder="Your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            name="email"
          />
          <FormHelperText id="my-helper-text">Well never share your email.</FormHelperText>
          <br />
          <Button text="Subscribe" type="submit" />
        </FormControl>
      </form>
    </Wrapper>
  );
}
