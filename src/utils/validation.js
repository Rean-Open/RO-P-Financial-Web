//CHECK FOR VALID EMAIL FORMAT
export function validateEmail(email) {
  var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
}

//CHECK FOR VALID Password
export function validatePasswordLength(word) {
  if (!word) {
    return false
  } else {
    return word.length >= 8 && word.length <= 32
  }
}
/**
* Check if password has at least one number
* @param {string} word
*/
export function atLeastOneNumber(word) {
  return /\d/.test(word)
}

/**
* Check if password has at least one upper case letter [A-Z]
* @param {string} word
*/
export function atLeastOneUppercase(word) {
  return (/[A-Z]/.test(word))
}

/**
* check if Password has at least one lower case letter [a-z]
* @param {string} word
*/
export function atLeastOneLowercase(word) {
  return (/[a-z]/.test(word))
}

/**
* Check if password matches required requirements.
* @param {string} word
*/
export function validatePassword(password) {
  return validatePasswordLength(password) && atLeastOneNumber(password) && atLeastOneUppercase(password) && atLeastOneLowercase(password)
}