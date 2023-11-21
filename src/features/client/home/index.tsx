import ClientPage from "common/components/Page/client";
import Home from "./components/Home";

const ClientHome = () => {
  return (
    <ClientPage>
      <ClientPage.Header />

      <ClientPage.Body>
        <Home />
      </ClientPage.Body>

      <ClientPage.PageFooter />
    </ClientPage>
  );
};

export default ClientHome;
