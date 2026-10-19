import Cookies from 'js-cookie';

// Set in Cookie
export const setCokie = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    Cookies.set(key, value);
  }
};

// remove from cookie
export const removeCokie = (key: string): void => {
  if (typeof window !== 'undefined') {
    Cookies.remove(key);
  }
};

// Get from cookie such as stored token
export const getCokie = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    return Cookies.get(key);
  }
  return undefined;
};

// Set in localstorage
export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// Authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response: any, next: () => void): void => {
  if (response) {
    setCokie('token', response.token);
    setLocalStorage('token', response.token);
    setLocalStorage('user', response.user);
  }
  if (next) next();
};

// Access user info from localstorage
export const isAuth = (): any => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (e) {
        return false;
      }
    }
  }
  return false;
};

export const isAsignature = (): any => {
  if (typeof window !== 'undefined') {
    const cookieChecked = getCokie('token');
    if (cookieChecked) {
      const curse = localStorage.getItem('curse');
      if (curse) {
        try {
          return JSON.parse(curse);
        } catch (e) {
          return false;
        }
      }
    }
  }
  return false;
};

export const signout = (next: () => void): void => {
  removeCokie('token');
  removeLocalStorage('user');
  removeLocalStorage('token');
  removeCokie('idcat');
  removeLocalStorage('idcat');
  removeCokie('idc');
  removeLocalStorage('idc');
  removeCokie('curse');
  removeLocalStorage('curse');
  if (next) next();
};

export const updateUser = (response: any, next: () => void): void => {
  console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr && response?.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  }
  if (next) next();
}