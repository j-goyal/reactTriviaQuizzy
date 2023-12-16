export const Encrypt = (data) => {
    return btoa(JSON.stringify(data));
  };
  
  export const Decrypt = (encryptedData) => {
    return JSON.parse(atob(encryptedData));
  };