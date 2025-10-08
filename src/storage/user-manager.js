import Storage from './storage';
import 'react-native-get-random-values'
import CryptoJS from 'react-native-crypto-js';

class UserManager {
  constructor() {
    this.user = this.user ?? {};
    this.language = this.language ?? {};
    this.locationInfo = this.locationInfo ?? {};
    this.fcmToken = '';
    this.appMultiLanguage = this.appMultiLanguage ?? {};
  }

  isEncrypted(str): boolean {
    try {
      let data = CryptoJS.AES.decrypt(str, 'user1');
      let userString = data.toString(CryptoJS.enc.Utf8);
      return JSON.parse(userString);
    } catch (e) {
      return null;
    }
  }

  initUser(): Promise {
    return new Promise((resolve, reject) => {
      Storage.getObjectValue('user-info-')
        .then(d => {
          if (d) {
            let userJson = this.isEncrypted(d);
            if (userJson && userJson.id != null) {
              this.user = userJson;
              resolve(userJson);
            }
          }
          resolve({});
        })
        .catch(e => reject(e));
    });
  }

  loadUser(): Promise {
    return new Promise((resolve, reject) => {
      resolve(this.user);
    });
  }

  loadUserLocation(): Promise {
    return new Promise((resolve, reject) => {
      Storage.getObjectValue('user-location')
        .then(d => {
          if (d) {
            this.locationInfo = JSON.parse(d);
          } else {
            this.locationInfo = {};
          }
          resolve(d);
        })
        .catch(e => reject(e));
    });
  }

  loadAppMultiLangauge(): Promise {
    return new Promise((resolve, reject) => {
      Storage.getObjectValue('app-multi-langauge')
        .then(d => {
          if (d) {
            this.appMultiLanguage = JSON.parse(d);
          } else {
            this.appMultiLanguage = {};
          }
          // console.log('\n **** Loading app language ', this.appMultiLanguage)
          resolve(d);
        })
        .catch(e => reject(e));
    });
  }

  saveUser(item): any {
    let saveObject = item;
    if (typeof item === 'object') {
      saveObject = JSON.stringify(item);
    }
    return new Promise((resolve, reject) => {
      let userLevel1Encrypt = CryptoJS.AES.encrypt(
        saveObject,
        'user1',
      ).toString();
      Storage.setObjectValue('user-info-', userLevel1Encrypt)
        .then(async () => {
          var user = await this.initUser();
          resolve(item);
        })
        .catch(e => reject(e));
    });
  }

  setLastUsedTime(val): any {
    Storage.setObjectValue('lastUsedTime', val);
  }

  saveLocation(item): any {
    let saveObject = item;
    if (typeof item === 'object') {
      saveObject = JSON.stringify(item);
    }
    return new Promise((resolve, reject) => {
      Storage.setObjectValue('user-location', saveObject)
        .then(() => {
          this.locationInfo = JSON.parse(saveObject);
          // console.log('\n\n User Location',this.locationInfo);
          resolve(saveObject);
        })
        .catch(e => reject(e));
    });
  }

  saveAppMultiLanguage(item): any {
    let saveObject = item;
    if (typeof item === 'object') {
      saveObject = JSON.stringify(item);
    }
    return new Promise((resolve, reject) => {
      Storage.setObjectValue('app-multi-langauge', saveObject)
        .then(() => {
          this.appMultiLanguage = JSON.parse(saveObject);
          resolve(saveObject);
        })
        .catch(e => reject(e));
    });
  }

  getLastUsedTime(): any {
    return Storage.getObjectValue('lastUsedTime');
  }

  get isLoggedIn(): boolean {
    // console.log('\n\n Is logged in', this.user, Object.keys(this.user ?? {}).length > 0)
    return Object.keys(this.user ?? {}).length > 0;
  }

  get getAccessToken() {
    if (!this.isLoggedIn) {
      return null;
    }
    return this.user.token;
  }

  updateFcmToken(token) {
    Storage.setObjectValue('user-fcmToken', token);
    this.fcmToken = token;
  }

  get getFcmToken() {
    if (this.fcmToken === '') {
      return new Promise(() => {
        Storage.getObjectValue('user-fcmToken')
          .then(d => {
            resolve(d);
          })
          .catch(e => reject(e));
      });
    }

    return this.fcmToken;
  }

  get getUserId() {
    if (!this.isLoggedIn) {
      return null;
    }
    return this.user.id;
  }
  get getUserLanguage() {
    if (!this.isLoggedIn) {
      return null;
    }

    return this.user.languageId;
  }
  get getUserAddress() {
    if (!this.isLoggedIn) {
      return null;
    }

    return this.user.address;
  }
  get getUserIdentity() {
    if (!this.isLoggedIn) {
      return null;
    }

    return this.user.identity;
  }
  get getUserSelectedCrops() {
    if (!this.isLoggedIn) {
      return null;
    }

    return this.user.crops;
  }

  get getUserLocation() {
    return this.locationInfo;
  }

  get getUserMobileNumber() {
    if (!this.isLoggedIn) {
      return null;
    }

    return this.user.username;
  }

  get getAppMultiLanguage() {
    return this.appMultiLanguage;
  }

  logout(): Promise {
    return new Promise((resolve, reject) => {
      try {
        this.user = {};
        this.language = {};
        this.locationInfo = {};
        this.fcmToken = '';
        this.appMultiLanguage = {};
        Storage.clearAll();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  logoutDrawer() {
    try {
      this.user = {};
      this.language = {};
      this.locationInfo = {};
      this.fcmToken = '';
      this.appMultiLanguage = {};
      Storage.clearAll();
    } catch (e) {
      // console.log(e);
    }
  }
}

export default new UserManager();
