export const selectUser = (user)=>{
  console.log("User: "+ user.first +" was clicked");
  return{
    type:"USER_SELECTED",
    payload:user
  }
};
