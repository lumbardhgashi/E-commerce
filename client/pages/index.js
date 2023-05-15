import buildClient from "@/api/build-client";
import axios from "axios";

const Home = ({ currentUser }) => {

  console.log(currentUser)

  return <h1>{currentUser ? "You are signed in": "You are not signed in"}</h1>;
};

Home.getInitialProps = async (context) => {

  const client = buildClient(context)

  const { data } = await client.get("/api/users/currentuser");

  return data
};


export default Home;
