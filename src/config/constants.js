
import { BUILD, BuildTypes } from './index';


export default Constants = {
  ...getConstants(),
};

function getConstants() {
  if (BUILD == BuildTypes.Production) {
    return {
      MERCHANT_KEY: 'B49p0D',
      PAYMENT_SALT: 'QjOW5Iqh',
      MERCHANT_ID: '8002391',
      MOBILEMERCHANT_KEY: "oZ7oo9",
      MOBILESALT: "UkojH5TS",
      PAYMENT_HASH_SEQUENCE: 'key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10',
      PAYMENT_STATIC_HASH_SEQUENCE: "key|command|default|salt",
      URL_MARKET_VALUE: "https://enam.gov.in/web/dashboard/trade-data",
      APIKey: "AIzaSyBGiElD1_aOJBZs50_lu9ML4iHKnsDo5OY",
      // static, only for testing
      farmerID: UserManager.isLoggedIn ? UserManager.user.id : '',
      language: UserManager.user.languageId ?? 1,
      languageCharacter: UserManager.user.languageCharacter ?? 'A',
      languageName: UserManager.user.language ?? 'English',
      termsAndCondition: 'https://mygromor.coromandel.biz/#/terms&conditions',
      termsAndConditionSpray: 'https://mygromor.coromandel.biz/#/sprayterms&conditions',
      privacyPolicy: 'https://mygromor.coromandel.biz/#/privacypolicy',
      G_Tracker_ID: 'G-SVW9GDNK6T',
      ios: 'https://apps.apple.com/us/app/mygromor/id1619924730',
      android: 'https://play.google.com/store/apps/details?id=com.coromandel.gromor'
    }
  } else if (BUILD == BuildTypes.PreProduction) {
    return {
      MERCHANT_KEY: 'B49p0D',
      PAYMENT_SALT: 'QjOW5Iqh',
      MERCHANT_ID: '8002391',
      MOBILEMERCHANT_KEY: "oZ7oo9",
      MOBILESALT: "UkojH5TS",
      PAYMENT_HASH_SEQUENCE: 'key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10',
      PAYMENT_STATIC_HASH_SEQUENCE: "key|command|default|salt",
      URL_MARKET_VALUE: "https://enam.gov.in/web/dashboard/trade-data",
      APIKey: "AIzaSyBGiElD1_aOJBZs50_lu9ML4iHKnsDo5OY",
      // static, only for testing
      farmerID: UserManager.isLoggedIn ? UserManager.user.id : '',
      language: UserManager.user.languageId ?? 1,
      languageCharacter: UserManager.user.languageCharacter ?? 'A',
      languageName: UserManager.user.language ?? 'English',

      termsAndCondition: 'https://mygromor.coromandel.biz/#/terms&conditions',
      termsAndConditionSpray: 'https://mygromor.coromandel.biz/#/sprayterms&conditions',

      privacyPolicy: 'https://mygromor.coromandel.biz/#/privacypolicy',
      G_Tracker_ID: 'G-SVW9GDNK6T',
      ios: 'https://apps.apple.com/us/app/mygromor/id1619924730',
      android: 'https://play.google.com/store/apps/details?id=com.coromandel.gromor'
    }
  } else if (BUILD == BuildTypes.Development) {
    return {
      MERCHANT_KEY: 'B49p0D',
      PAYMENT_SALT: 'QjOW5Iqh',
      MERCHANT_ID: '8002391',
      MOBILEMERCHANT_KEY: "oZ7oo9",
      MOBILESALT: "UkojH5TS",
      PAYMENT_HASH_SEQUENCE: 'key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10',
      PAYMENT_STATIC_HASH_SEQUENCE: "key|command|default|salt",
      URL_MARKET_VALUE: "https://enam.gov.in/web/dashboard/trade-data",
      APIKey: "AIzaSyBGiElD1_aOJBZs50_lu9ML4iHKnsDo5OY",
      // static, only for testing
      farmerID: UserManager.isLoggedIn ? UserManager.user.id : '',
      language: UserManager.user.languageId ?? 1,
      languageCharacter: UserManager.user.languageCharacter ?? 'A',
      languageName: UserManager.user.language ?? 'English',

      termsAndCondition: 'https://mygromor20uatazure.coromandel.biz/#/terms&conditions',
      termsAndConditionSpray: 'https://mygromor20uatazure.coromandel.biz/#/sprayterms&conditions',

      privacyPolicy: 'https://mygromor20uat.coromandel.biz/#/privacypolicy',
      G_Tracker_ID: 'G-SVW9GDNK6T',
      ios: 'https://apps.apple.com/us/app/mygromor/id1619924730',
      android: 'https://play.google.com/store/apps/details?id=com.coromandel.gromor'
    }
  } else if (BUILD == BuildTypes.Staging) {
    return {
      MERCHANT_KEY: 'B49p0D',
      PAYMENT_SALT: 'QjOW5Iqh',
      MERCHANT_ID: '8002391',
      MOBILEMERCHANT_KEY: "oZ7oo9",
      MOBILESALT: "UkojH5TS",
      PAYMENT_HASH_SEQUENCE: 'key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10',
      PAYMENT_STATIC_HASH_SEQUENCE: "key|command|default|salt",
      URL_MARKET_VALUE: "https://enam.gov.in/web/dashboard/trade-data",
      APIKey: "AIzaSyBGiElD1_aOJBZs50_lu9ML4iHKnsDo5OY",
      // Farmer Id & Langage details getting from one place based on build type
      farmerID: UserManager.isLoggedIn ? UserManager.user.id : '',
      language: UserManager.user.languageId ?? 1,
      languageCharacter: UserManager.user.languageCharacter ?? 'A',
      languageName: UserManager.user.language ?? 'English',
      termsAndConditionSpray: 'https://mygromor20uatazure.coromandel.biz/#/sprayterms&conditions',

      termsAndCondition: 'https://mygromor.coromandel.biz/#/terms&conditions',
      privacyPolicy: 'https://mygromor.coromandel.biz/#/privacypolicy',
      G_Tracker_ID: 'G-SVW9GDNK6T',
      ios: 'https://apps.apple.com/us/app/mygromor/id1619924730',
      android: 'https://play.google.com/store/apps/details?id=com.coromandel.gromor'
    }
  }
}
