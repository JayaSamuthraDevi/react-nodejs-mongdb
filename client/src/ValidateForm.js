import setError from "./components/setError";
import setSuccess from "./components/setSuccess"

const formValidate = async (id) => {

    const elementName = id;
    const field = document.querySelector(`#${elementName}`);

    //regex constants
    const alphaExp = /^[a-zA-Z]+$/;
    const exp = /^[0-9]+$/;
    const addressExp = /^[a-zA-Z0-9-/]+$/;
    const emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    
    switch (elementName) {

      case 'fname':

        // console.log(field);
        if (field.value === '') {
          setError(field, '*FirstName is required')
        }
        else if (!field.value.match(alphaExp)) {
          setError(field, "*Enter only Aphabets")
        }
        else {
          setSuccess(field)
        }

        break;
      case 'lname':
        if (field.value === '') {
          setError(field, '*LastName is required')
        }
        else if (!field.value.match(alphaExp)) {
          setError(field, "*Enter only Aphabets")
        }
        else {
          setSuccess(field)
        }
        break;
      case 'mobile':
        if (field.value === '') {
          setError(field, '*Mobile Number is required')
        }
        else if (!field.value.match(exp)) {
          setError(field, '*Enter only Numbers')
        }
        else if (field.value.length < 10) {
          setError(field, '*Enter a Valid Number')
        }
        else {
          setSuccess(field)
        }
        break;
      case 'email':
        if (field.value === '') {
          setError(field, '*Email is required')
        }
        else if (!field.value.match(emailExp)) {
          setError(field, "*Enter a Valid Email")
        }
        else {
          setSuccess(field)
        }
        break;
      case 'dob':
        if (field.value === '') {
          setError(field, '*Date is required')
        }
        else {
          setSuccess(field)
        }
        break;
      case 'address':
        if (field.value === '') {
          setError(field, '*Address is required')
          
        }
        else if (!field.value.match(addressExp)) {
          setError(field, '*Enter a Valid Address')
          
        }
        else {
          setSuccess(field)
         
        }
        
        break;
        case 'password':
          if (field.value === '') {
            setError(field, '*Password is required')
          }
          else if (field.value.length < 4  ||  field.value.length > 8 ) {
            setError(field, '*Password should contain only 4 digits')
            
          }
          else {
            setSuccess(field)
           
          }
          
          break;

      default:
        alert("error");

    }
   

  };

 

export default formValidate;

  
