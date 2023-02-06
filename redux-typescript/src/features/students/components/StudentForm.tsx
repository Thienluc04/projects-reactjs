import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { InputField, RadioGroupField, SelectField } from "components/FormFields";
import { selectCityOptions } from "features/city/citySlice";
import { Student } from "models";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}
const schema = yup
  .object({
    name: yup
      .string()
      .test("two-words", "Please enter at least two words", (value) => {
        if (!value) return true;
        return value.split(" ").filter((x) => Boolean(x)).length >= 2;
      })
      .required("Please enter name"),
    age: yup
      .number()
      .positive("Please enter a positive number")
      .min(18, "Min is 18")
      .max(60, "Max is 60")
      .integer("Please enter an integer")
      .required("Please enter age")
      .typeError("Please enter a valid number"),
    mark: yup
      .number()
      .min(0, "Mark must be greater than 0")
      .max(10, "Mark must be less than or equal to 10")
      .required("Please enter mark")
      .typeError("Please enter a valid number"),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Please select either male or female")
      .required("Please select gender"),
    city: yup.string().required("Please select city"),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const hanldeFormSubmit = async (formValues: Student) => {
    try {
      setError("");
      await onSubmit?.(formValues);
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <div>
      <Box maxWidth={400}>
        <form onSubmit={handleSubmit(hanldeFormSubmit)}>
          <InputField name="name" control={control} label="Full Name"></InputField>
          <InputField name="age" control={control} label="Age" type="number"></InputField>
          <InputField name="mark" control={control} label="Mark" type="number"></InputField>
          <RadioGroupField
            name="gender"
            control={control}
            label="Gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />

          {Array.isArray(cityOptions) && cityOptions.length > 0 && (
            <SelectField name="city" control={control} label="City" options={cityOptions} />
          )}

          {error && <Alert severity="error">{error}</Alert>}

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting && <CircularProgress size={16} />}
              &nbsp;Save
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
}
