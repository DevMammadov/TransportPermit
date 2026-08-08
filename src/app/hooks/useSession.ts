// import { useCurrentUser } from "@/app/api/authApi";
import { getStorage } from "@/app/helpers/localStorage";
// import { LoginDTO } from "@/data/dto/login.dto";
// import { useEffect, useState } from "react";

export const useSession = () => {
  // const [sessiontUser, setSessionUser] = useState<LoginDTO>();
  // const token = getStorage("token");
  // const {
  //   enableQuery,
  //   data: newUser,
  //   isLoading: currentUserLoading,
  // } = useCurrentUser();
  // useEffect(() => {
  //   if (token) {
  //     enableQuery();
  //   }
  // }, [token, enableQuery]);
  // useEffect(() => {
  //   if (newUser) {
  //     setStorage("user", newUser);
  //     setSessionUser(newUser);
  //   }
  // }, [newUser]);
  // return { ...sessiontUser, currentUserLoading };
};

export const getCurrentUser = () => {
  const user = getStorage("user");

  if (user) {
    return JSON.parse(user);
  }

  return {
    person: {
      document: {
        name: "Name",
        surname: "Surname",
        patronymic: "Father oglu",
      },
      pin: "5VASF2H",
    },
    organization: {
      tin: "1301702143",
    },
  };
};
