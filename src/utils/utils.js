import moment from 'moment';

export const numberFormat = (value, fixed = 2) => {
  if (value) {
    var x = value.toString();
    var afterPoint = '.00';
    if (x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '' && otherNumbers !== '-') lastThree = ',' + lastThree;
    var res =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
      lastThree +
      (fixed === 0 ? '' : (parseFloat(afterPoint).toFixed(fixed).substring(1)));

    return res;
  }
  return value === null || value === undefined || value === 0 ? '0' : value.toString();
};

export const calculateOffer = (sellingPrice = 0, MRP = 0) => {
  var offer = {
    isOfferApplicable: false,
    offerPercentage: 0,
    saveUpto: 0
  }
  if (sellingPrice < MRP && sellingPrice > 0 && MRP > 0) {
    var discountPrice = MRP - sellingPrice
    var offerValue = (discountPrice / MRP) * 100

    offerValue = offerValue

    offer.isOfferApplicable = true
    offer.offerPercentage = Math.floor(offerValue)
    offer.saveUpto = discountPrice
  }
  return offer
}

export const getDateToMoment = value => {
  if (!value) return null;
  if (moment(value, 'DD/MM/YYYY').isValid()) return moment(value, 'DD/MM/YYYY');
  if (moment(value, 'DD-MM-YYYY').isValid()) return moment(value, 'DD-MM-YYYY');
  if (moment(value, 'MM-DD-YYYY').isValid()) return moment(value, 'MM-DD-YYYY');
  if (moment(value, 'YYYY-MM-DD').isValid()) return moment(value);
  if (moment(value, 'YYYY-DD-YY').isValid()) return moment(value);

  if (moment(new Date(value)).isValid()) {
    return moment(new Date(value));
  }

  if (moment(value).isValid()) return moment(value);
  return null;
};

export const stringTruncate = function (fullStr, strLen, separator) {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars);
};


export const extractVideoData = (iframeHtml) => {
  const idMatch = iframeHtml.match(/youtube\.com\/embed\/([^"?&]*)/);
  const titleMatch = iframeHtml.match(/title="([^"]+)"/);

  return {
    videoId: idMatch ? idMatch[1] : null,
    title: titleMatch ? titleMatch[1] : null
  };
};


export const capitalizeAll = str => {
  var splitStr = str?.toLowerCase().split(' ');
  for (var i = 0; i < splitStr?.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr?.join(' ');
};

export const getFileExtension = function (filename) {
  return filename?.slice((filename?.lastIndexOf(".") - 1 >>> 0) + 2);
}


export const getLoadingInfo = (APITiming = {}, isLoading = false) => {
  let currentTime = new Date();
  let temptime = { ...APITiming }
  if (isLoading) {
    temptime.beforeTime = currentTime.getTime()
  } else {
    temptime.AfterTime = currentTime.getTime()
  }
  return temptime
}