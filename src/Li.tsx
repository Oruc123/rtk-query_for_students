import dayjs from "dayjs";
import React, { memo } from "react";
import {
  useDeleteuserMutation,
  UserResponse,
} from "./store/services/usersService";

const Li: React.FC<UserResponse> = ({ id, name, email, createdAt }) => {
  const [deleteUser] = useDeleteuserMutation();
  // onClick={() => deleteUser(id)}
  let date = dayjs.unix(createdAt / 1000);
  return (
    <li>
      <p>{name}</p>
      <p> {email}</p>
      <p>{date.format("hh-mm:ss dd/mm")}</p>
      <p>istifadeci ayin {date.format("DD")} qeydiya</p>
    </li>
  );
};

export default memo(Li);
