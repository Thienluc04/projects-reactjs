import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { Textarea } from "components/textarea";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { userRole, userStatus } from "utils/constants";
import { useAuth } from "contexts/auth-context";
import useFirebaseImage from "hooks/useFirebaseImage";
import { toast } from "react-toastify";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const image_name = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, image_name, deleteAvatar);

  const watchStatus = watch("status");
  const watchRole = watch("role");
  const { userInfo } = useAuth();

  const handleUpdateProfile = async (values) => {
    if (!isValid) return;
    try {
      const docRef = doc(db, "users", userInfo.uid);
      await updateDoc(docRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update profile information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update profile failed!");
    }
  };

  async function deleteAvatar() {
    const docRef = doc(db, "users", userInfo.uid);
    await updateDoc(docRef, {
      avatar: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    if (!userInfo.uid) return;
    async function fetchData() {
      const docRef = doc(db, "users", userInfo.uid);
      const docData = await getDoc(docRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [reset, userInfo.uid]);

  return (
    <div>
      <DashboardHeading
        title="User Profile"
        desc="User profile information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="w-[200px] h-[200px] rounded-full mx-auto mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            image={image}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              name="birthday"
              placeholder="Please enter your date of birth"
              control={control}
              type="date"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              name="telephone"
              placeholder="Please enter your mobile number"
              control={control}
              type="tel"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MODE}
                value={userRole.MODE}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Description</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
