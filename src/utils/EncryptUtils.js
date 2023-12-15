export const encrypt = (data) => {
    return btoa(JSON.stringify(data));
  };
  
  export const decrypt = (encryptedData) => {
    return JSON.parse(atob(encryptedData));
  };