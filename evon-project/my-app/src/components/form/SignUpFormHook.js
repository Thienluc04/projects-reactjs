import React, { useEffect } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object({
  firstName: Yup.string()
    .required("Please enter your first name")
    .max(10, "Must be 10 characters or less"),
});

const SignUpFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty, dirtyFields },
    watch,
    reset,
    setFocus,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const watchShowAge = watch("showAge", false);
  // console.log(dirtyFields);
  const onSubmit = async (values) => {
    if (isValid) {
      console.log(values);
      console.log("send data to backend");
      reset({
        firstName: "",
        lastName: "",
        email: "",
      });
    }
  };
  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);
  const handleSetDemoData = () => {
    setValue("firstName", "Thien");
    setValue("lastName", "Luc");
    setValue("email", "thienluc@gmail.com");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 w-full max-w-[500px] mx-auto"
      autoComplete="off"
    >
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="firstName">FirstName</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          className="p-4 rounded-md border border-gray-100"
          {...register("firstName")}
        />
        {errors?.firstName && (
          <div className="text-red-500 text-sm">{errors.firstName.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="lastName">LastName</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your first name"
          className="p-4 rounded-md border border-gray-100"
          {...register("lastName")}
        />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="email">Email address</label>
        <MyInput
          name="email"
          placeholder="Enter your email address"
          id="email"
          control={control}
        ></MyInput>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <input type="checkbox" {...register("showAge")} />
        {watchShowAge && (
          <input
            type="number"
            name=""
            id=""
            placeholder="Please enter your age"
          />
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg"
        >
          {isSubmitting ? (
            <div
              className="mx-auto w-5 h-5 border-2 border-white border-t-2 border-t-transparent
           rounded-full animate-spin"
            ></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <div>
        <button
          className="p-3 bg-green-400 text-white "
          onClick={handleSetDemoData}
        >
          Demo data
        </button>
      </div>
    </form>
  );
};

const MyInput = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      className="p-4 rounded-md border border-gray-100"
      {...field}
      {...props}
    />
  );
};

// const MyInput = ({ control, ...props }) => {
//   return (
//     <Controller
//       name={props.name}
//       control={control}
//       defaultValue=""
//       render={({ field }) => {
//         return (
//           <input
//             className="p-4 rounded-md border border-gray-100"
//             {...field}
//             {...props}
//           />
//         );
//       }}
//     ></Controller>
//   );
// };

export default SignUpFormHook;
