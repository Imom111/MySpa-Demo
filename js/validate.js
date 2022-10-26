export function validate_positive(num){
  try {
    if(parseInt(num) >= 0){
      return true;
    } else {
      return false;
      console.error("The character is not a positive number");
    }
  } catch (error) {
    console.error(error);
  }
}