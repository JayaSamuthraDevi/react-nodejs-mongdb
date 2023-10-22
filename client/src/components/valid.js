import formValidate from "../ValidateForm";

const valid = () => {
  const dataError = document.querySelectorAll(".error");
  const dataSuccess = document.querySelectorAll(".success");
  const inputFields = ["fname", "lname", "mobile", "dob", "email", "address","password"];

  if (dataError.length == 0 && dataSuccess.length == 7) {
    console.log(dataSuccess);
    return true;
  } else {
    {
      inputFields.map((index) => {
        formValidate(index);
      });
    }
  }

  return false;
};

export default valid;
