import { useGetUsersQuery } from "./store/services/usersService";

const Header = () => {
  const { data, isFetching } = useGetUsersQuery();
  return (
    <div>
      <h1>This is header </h1>
      {isFetching && <h2>Now loading in header</h2>}
      <h3>
        <strong>Users count </strong>
        {data?.length}
      </h3>
    </div>
  );
};

export default Header;
