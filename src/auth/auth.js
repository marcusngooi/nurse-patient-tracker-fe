const auth = {
  isSignedIn() {
    const jwt = window.jsonwebtoken;
    const jwtValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1];
    const jwtDecode = jwt.decode;
    const decodedJwt = jwtDecode(jwtValue);
    const currentTime = Date.now() / 1000;

    if (decodedJwt.exp < currentTime) {
      return false;
    } else {
      return true;
    }
  },
};

export default auth;
