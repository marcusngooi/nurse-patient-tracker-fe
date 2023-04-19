// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Auth.js
const auth = {
    isLoggedIn:false,
    onAuthentication(){
      this.isLoggedIn=true;
    },
    getLogInStatus(){
      return this.isLoggedIn;
    },
    saveToken(userToken) {
        console.log(userToken);
        localStorage.setItem('token', JSON.stringify(userToken));
        
      },
    getToken(){
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
     
        return userToken;
      }
  }
  export default auth;