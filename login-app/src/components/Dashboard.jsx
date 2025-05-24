import { useLocation, useNavigate } from "react-router";
import Page from "../../../base-components/src/components/Page/Page";
import Header from "../../../base-components/src/components/Header/Header";
import Footer from "../../../base-components/src/components/Footer/Footer";
import Button from "../../../base-components/src/components/Button/Button";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Header title="Dashboard" />
      <div className="content">
        <h2>Welcome, we are successfully logged in!</h2>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Log out
        </Button>
      </div>
      <Footer />
    </Page>
  );
};

export default Dashboard;
