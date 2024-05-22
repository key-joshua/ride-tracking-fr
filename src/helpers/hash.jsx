const encrypt = (data) => {
  try {
    return btoa(data);
  } catch (error) {
    window.location.replace("/");
    return error.toString();
  }
};

const dencrypt = (data) => {
  try {
    return atob(data);
  } catch (error) {
    window.location.replace("/");
    return error.toString();
  }
};

export { encrypt, dencrypt };
