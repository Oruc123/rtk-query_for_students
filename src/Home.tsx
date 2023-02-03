import AddUser from "./AddUser";
import Li from "./Li";
import { useGetUsersQuery, UserResponse } from "./store/services/usersService";

const Home = () => {
  const { data, isLoading, isError, isFetching } = useGetUsersQuery();
  if (isError) {
    return <h2>OOPS some errors on server</h2>;
  }
  if (isFetching) {
    return <h2>new data coming</h2>;
  }

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="App">
      <AddUser />
      <ul>
        {data?.map((el: UserResponse) => (
          <Li key={el.id} {...el} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
