import withoutAuthentication from "../components/hoc/withoutAuthentication";
import MetaTags from "../components/config/MetaTags";
import withAuthentication from "../components/hoc/withAuthentication";
import Header from "../components/global/header/Header";

const Home = () => {
  return (
    <>
      <MetaTags title="Home-Page" />
      <Header />
      <div className="flex justify-center items-center h-screen">
      <p className="text-3xl text-center text-light">Welcome to the application</p>
    </div>

    </>
  );
};
export default withAuthentication(Home);
