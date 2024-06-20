import { createContext, useContext, useState } from "react";

const SigninUserContext = createContext(undefined);

export const useSigninUser=()=>{
  const context = useContext(SigninUserContext);
  if(!context){
    throw new Error('useSigninUser는 SigninUserProvider 내에서 사용해야 합니다.');
  }
  return context;
}
export const SigninUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const signinAuthUser = (userInfo) => {// 로그인시
    setUser(userInfo);
  };
  const signoutUser = () => { // 로그아웃시
    setUser(null);
  };

  return <SigninUserContext.Provider value={{user, signinAuthUser, signoutUser}}>{children}</SigninUserContext.Provider>
};