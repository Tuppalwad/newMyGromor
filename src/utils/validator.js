/*
 * validate  string, array and object if message found throws the exception
 * param value (object) input value
 * param message (string) if message is valid and condition false throws exception
 */

export const isEmpty = (value, message: string = null) => {
  let _isValid = false;
  if (
    value === null ||
    value === undefined ||
    value === 'null' ||
    value === '0' ||
    value === 0
  ) {
    _isValid = true;
  } else if (isString(value)) {
    _isValid = value.length === 0 || value.trim().length === 0;
  } else if (value instanceof Date) {
    _isValid = false;
  } else if (typeof value === 'object') {
    _isValid = Object.keys(value).length === 0;
  } else if (Array.isArray(value)) {
    _isValid = value.length === 0;
  }
  // // console.log("isvalid",_isValid,message);

  if (message !== null && _isValid) {
    throw message;
  }
  return _isValid;
};

export const isEqual = (value1, value2, msg) => {
  if (value1 === value2) {
    return true;
  }
  if (msg !== null) throw msg;
  return false;
};
export const notEquals = (value1, value2, msg) => {
  if (value1 !== value2) {
    return true;
  }
  if (msg !== null) throw msg;
  return false;
};
export const isEmptyArray = (value, message) => {
  if (value.length === 0) throw message;
  return true;
};

/*
 * validate  string length min & max if message found throws the exception
 * param value (string) input value
 * param min (number) min length size
 * param max (number) max length size
 * param message (string) if message is valid and condition false throws exception
 */
export const minMaxLength = (
  value,
  min: number,
  max: number,
  message: string = null,
) => {
  let _isValid = false;
  if (isString(value)) {
    _isValid = value.length >= min && value.length <= max;
  }
  if (message !== null && !_isValid) {
    throw message;
  }
  return _isValid;
};

/*
 * validate  string length min if message found throws the exception
 * param value (string) input value
 * param min (number) min length size
 * param message (string) if message is valid and condition false throws exception
 */
export const minLength = (value, min, message: string = null) => {
  let _isValid = false;
  if (isString(value)) {
    _isValid = value.length >= min;
  }
  if (message !== null && !_isValid) {
    throw message;
  }
  return _isValid;
};

/*
 * validate  string max if message found throws the exception
 * param value (string) input value
 * param max (number) max length size
 * param message (string) if message is valid and condition false throws exception
 */
export const maxLength = (value, max, message: string = null) => {
  let _isValid = false;
  if (isString(value)) {
    _isValid = value.length <= max;
  }
  if (message !== null && !_isValid) {
    throw message;
  }
  return _isValid;
};

/*
 * validate  string numeric if message found throws the exception
 * param value (string) input value
 * param Numeric (number) Numeric
 * param message (string) if message is valid and condition false throws exception
 */
export const onlyNumeric = (value, message: string = null) => {
  return regexValidation(value, /^-?[0-9]\d*(\.\d+)?$/, message);
};

/*
 * validate  string numeric if message found throws the exception
 * param value (string) input value
 * param Numeric (number) Numeric
 * param message (string) if message is valid and condition false throws exception
 */
export const alphabetWithSpace = (value, message: string = null) => {
  return regexValidation(value, /^[a-zA-Z ]+$/, message);
};

export const validateKyc = (value, regex, message) => {
  return regexValidation(value, regex, message);
};

export const checkAllEmpty = data => {
  if (data) {
    const keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
      if (isEmpty(data[keys[i]])) {
        return true;
      }
    }
    return false;
  }
  return false;
};

/*
 * validate
 *   string numeric if message found throws the exception
 * param value (string) input value
 * param Numeric (number) Numeric
 * param message (string) if message is valid and condition false throws exception
 */
export const onlyAlphabet = (value, message: string = null) => {
  return regexValidation(value, /^[a-zA-Z]+$/, message);
};

/*
 * validate  string numeric if message found throws the exception
 * param value (string) input value
 * param Numeric (number) Numeric
 * param message (string) if message is valid and condition false throws exception
 */
export const onlyAlphaNumeric = (value, message: string = null) => {
  return regexValidation(value, /^[0-9a-zA-Z]+$/, message);
};
export const isValidPAN = (value, message: string = null) => {
  return regexValidation(value, /[A-Z]{5}[0-9]{4}[A-Z]{1}/, message);
};
export const isValidPassport = (value, message: string = null) => {
  return regexValidation(
    value,
    /^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$/,
    message,
  );
};
export const isValidVoterId = (value, message: string = null) => {
  return regexValidation(value, /^([a-zA-Z]){3}([0-9]){7}?$/, message);
};

/*
 * validate  string email if message found throws the exception
 * param value (string) input value
 * param max (number) max length size
 * param message (string) if message is valid and condition false throws exception
 */
export const isValidEmail = (value, message: string = null) => {
  // eslint-disable-next-line no-useless-escape
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexValidation(value.toLowerCase(), re, message);
};
export const isValidName = (value, message: string = null) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^[a-zA-Z\s]*$/;
  return regexValidation(value.toLowerCase(), re, message);
};
export const isValidPhone = (value, message: string = null) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^[5-9]\d{9}$/;
  return regexValidation(value.toLowerCase(), re, message);
};

export const isValidIFSC = (value, message: string = null) => {
  // eslint-disable-next-line no-useless-escape
  const re = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
  return regexValidation(value.toLowerCase(), re, message);
};

export const isAccepted = (value, message: string = null) => {
  if (value === true) {
    return value === true;
  } else {
    throw message;
  }
};

/*
 * validate  string password if message found throws the exception
 * param message (string) if message is valid and condition false throws exception
 * https://stackoverflow.com/a/12090405
 */
export const strongPassword = (pass, message) => {
  let data = scorePassword(pass);

  if (data.score < 8 || data.variationCount < 4) {
    throw message;
  }
  return true;
};

export const regexValidation = (value, regexExp, message: string = null) => {
  let _isValid = regexExp.test(value);
  // console.log('valid', _isValid);
  if (message !== null && !_isValid) {
    throw message;
  }
  return _isValid;
};

export const ifFailedThrows = (condition, message) => {
  if (!condition) {
    throw message;
  }
};
//
// export const showToastError = (error, type = toast.POSITION.BOTTOM_CENTER) => {
//   let e = error;
//   if (!isString(error) && error.hasOwnProperty('message')) {
//     e = e.message;
//   }
//   console.error('error ', e);
//   toast.error(e, {
//     position: type,
//   });
// };

// export const TOAST_POSITION = toast.POSITION;

function isString(value) {
  if (value === null || value === undefined) {
    return false;
  } else if (typeof value === 'string') {
    return true;
  }
  return false;
}

export const scorePassword = pass => {
  let variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /[-!@$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(pass),
  };

  let variationCount = 0;
  for (let check in variations) {
    variationCount += variations[check] == true ? 1 : 0;
  }
  return {score: pass.length, variationCount: variationCount};
};

export const truncateDecimal = (
  number = '',
  index = 2,
  removeEmptydot = true,
) => {
  // convert number to string
  number += '';
  number = number.toString();
  // cutting the number.
  if (number.indexOf('.') > -1) {
    number = number.slice(0, number.indexOf('.') + (index + 1));
  }
  // If the their is no decimal remove the '.'
  if (removeEmptydot && number.indexOf('.') === number.length - 1) {
    number = number.slice(0, number.indexOf('.'));
  }
  return number;
};

export const getFullPrecision = number => {
  number += '';
  const possplit = number.split('e+');
  // If has exponential values then calculate it
  if (possplit[1]) {
    return (+number).toPrecision(+possplit[1] + 1);
  }

  const negpos = number.split('e-');
  // If has exponential values then calculate it
  if (negpos[1]) {
    let wholeNumbercount = negpos[0].split('.')[0];
    wholeNumbercount = wholeNumbercount ? wholeNumbercount.length : 0; // 1
    let numZeros = negpos[1] - wholeNumbercount; // 7-1 = 6
    let res = negpos[0].replace('.', ''); // 5706000000000001
    while (numZeros > 0) {
      res = '0' + res;
      numZeros--;
    }
    return '0.' + res;
  }
  return number;
};

export const renderError = (error, error_text) => {
  if (error?.field?.includes(error_text)) {
    return true;
  } else {
    return false;
  }
};

import moment from 'moment';

export const renderDateformat = postCreatedOn => {
  let currentDate = new Date(postCreatedOn);
  let FeedsDate = new Date();
  let One_Daycal = 1000 * 60 * 60 * 24;
  let postFinalDate = '';
  let difference = currentDate.getTime() - FeedsDate.getTime();
  if (Math.abs(difference) < One_Daycal) {
    postFinalDate = moment(postCreatedOn).fromNow();
  } else if (Math.abs(difference) < One_Daycal * 7) {
    postFinalDate = moment(postCreatedOn).fromNow(true);
  } else if (Math.abs(difference) < One_Daycal * 364) {
    postFinalDate = moment(postCreatedOn).format('DD MMMM');
  } else {
    postFinalDate = moment(postCreatedOn).format("DD MMM'YY");
  }
  return postFinalDate;
};

export const India_INRCurrency = '₹';
export const India_INRCurrencyname = 'INR';
export const INR_Defaultprecision = 2;
export const Default_Language = 1;
