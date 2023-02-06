import Axios from 'axios'
// import { createBrowserHistory } from "history";
// import {createBrowserHistory} from 'history'
// export const history = createBrowserHistory({window});

export const DOMAIN = 'https://shop.cyberlearn.vn'
export const ACCESS_TOKEN = 'accessToken'
export const USER_LOGIN = 'userLogin'

export const http = Axios.create({
     baseURL: DOMAIN,
     timeout: 30000
})

// cấu hình các hàm set get cũng như cookie
export const settings = {
     setStorageJson: (name: string, data: any): void => {
          data = JSON.stringify(data);
          localStorage.setItem(name, data);
     },
     setStorage: (name: string, data: string): void => {
          localStorage.setItem(name, data)
     },
     getStorageJson: (name: string): any | undefined => {
          if (localStorage.getItem(name)) {
               const dataStore: string | undefined | null = localStorage.getItem(name);
               if (typeof dataStore == 'string') {
                    const data = JSON.parse(dataStore);
                    return data;
               }
               return undefined;
          }
          return; //undefined
     },
     getStore: (name: string): string | null | undefined | boolean | any => {
          if (localStorage.getItem(name)) {
               const data: string | null | undefined = localStorage.getItem(name);
               return data;
          }
          return; //undefined
     },
     setCookieJson: (name: string, value: any, days: number): void => {
          var expires = "";
          if (days) {
               var date = new Date();
               date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
               expires = "; expires=" + date.toUTCString();
          }
          value = JSON.stringify(value);
          document.cookie = name + "=" + (value || "") + expires + "; path=/";
     },
     getCookieJson: (name: string): any => {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
               var c = ca[i];
               while (c.charAt(0) == ' ') c = c.substring(1, c.length);
               if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
          }
          return null;
     },
     setCookie: (name: string, value: string, days: number): void => {
          var expires = "";
          if (days) {
               var date = new Date();
               date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
               expires = "; expires=" + date.toUTCString();
          }
          document.cookie = name + "=" + (value || "") + expires + "; path=/";
     },
     getCookie: (name: string): string | null => {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
               var c = ca[i];
               while (c.charAt(0) == ' ') c = c.substring(1, c.length);
               if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
          }
          return null;
     },
     eraseCookie: (name: string): void => {
          document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
     },
     clearStorage: (name: string) => {
          localStorage.removeItem(name);
     }

}





// cấu hình cho tất cả request gửi đi
// http.interceptors.requ




// cấu hình cho tất cả kết quả trả về (cấu hình cho response)
// http.interceptors.response.use((response) => {
//      // thanh cong
//      return response;
// }, (error) => {
//      // bi loi
//      if (error.status === 400 || error.status === 404) {
//           history.push('/')
//      }
//      return Promise.reject(error);
// });