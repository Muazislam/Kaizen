function validateform() {
  let firstName = document.getElementById(`firstName`).value;
  let email = document.getElementById(`email`).value;
  let password = document.getElementById(`password`).value;
  let confirmPassword = document.getElementById(`confirmPassword`).value;

  if (firstName.trim() === "") {
    alert(`Please Enter your name`);
    return false;
  } else if (email.trim() === "") {
    alert(`Please Enter email`);
    return false;
  } else if (!email.includes(`@`) || !email.includes(`.`)) {
    alert(`Please write a valid email address`);
    return false;
  } else if (password.trim() === "") {
    alert(`Please enter Password`);
    return false;
  } else if (password.length < 8 || password.length > 12) {
    alert(
      "Password must be between 8 and 12 characters.",
    );
    return false;
  } else if (password !== confirmPassword) {
    alert(`Password didn't match`);
    return false;
  } else {
    alert(`Form submitted sucessfully`);
    return true;
  }
};
