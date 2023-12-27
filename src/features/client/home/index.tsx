import { setItem } from "utils";
import Home from "./components/Home";
import { LocalStorageKeys } from "common/enums";

const ClientHome = () => {
  setItem(LocalStorageKeys.prevURL, '/');
  return (
    <Home/>
  );
};

export default ClientHome;
