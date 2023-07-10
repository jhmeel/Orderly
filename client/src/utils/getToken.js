import { useSelector } from "react-redux";

const GetToken = () => {
  const { token } = useSelector((state) => state.user);
  return token;
};

export default GetToken;
