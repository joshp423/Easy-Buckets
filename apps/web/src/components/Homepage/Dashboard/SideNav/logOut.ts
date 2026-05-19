type logOutProps = {
    setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function logOut({setLoginStatus}:logOutProps){
    setLoginStatus(false);
    localStorage.clear();
  };
