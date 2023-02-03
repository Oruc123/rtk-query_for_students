import { useEffect, useRef, useState } from "react";
import {
  useAddUserMutation,
  UserResponse,
} from "./store/services/usersService";

const AddUser = () => {
  const [userName, setUsername] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userEmail, setEmail] = useState("");

  const [adduser] = useAddUserMutation();
  const stateRef = useRef<Omit<UserResponse, "id">>({
    name: "",
    surname: "",
    email: "",
    createdAt: 0,
  });
  const handleClick = () => {
    adduser({
      name: userName,
      surname: userSurname,
      email: userEmail,
      createdAt: +Date.now(),
    });
  };
  useEffect(() => {
    const listener = (e: any) => {
      if (e.key === "Enter") {
        const data = { ...stateRef.current };
        adduser({
          ...data,
          createdAt: +Date.now(),
        });
      }
    };
    document.documentElement.addEventListener("keydown", listener);
    return () => {
      document.documentElement.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <div>
      <label>
        Username
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
            stateRef.current.name = e.target.value;
          }}
          value={userName}
          type="text"
        />
      </label>
      <p>
        <label>
          Surname
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserSurname(e.target.value);
              stateRef.current.surname = e.target.value;
            }}
            value={userSurname}
            type="text"
          />
        </label>
      </p>
      <p>
        <label>
          Email
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              stateRef.current.email = e.target.value;
            }}
            value={userEmail}
            type="email"
          />
        </label>
      </p>
      <button onClick={handleClick}>Add user</button>
    </div>
  );
};

export default AddUser;
