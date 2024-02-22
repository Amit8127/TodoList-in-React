// isLoggedIn
export const isLoggedIn = () => {
  let auth = localStorage.getItem("auth");
  if (auth != null) {
    return true;
  } else {
    return false;
  }
};

// doLogedIn
export const doLogedIn = (auth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

// doLogOut
export const doLogOut = () => {
  localStorage.removeItem("auth");
};

// getCurrentAdmin
export const getCurrentAdmin = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("auth"));
  } else {
    return "Not logged in";
  }
};
