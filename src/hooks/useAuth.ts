import { useWeb3React } from "@web3-react/core";
import { ConnectorNames } from "../types";
import { connectorsByName } from "../utils/web3React";

const useAuth = () => {
  const { activate, account, library, connector, active, deactivate } = useWeb3React();
  
  
  
  const login = async (conectorID: ConnectorNames) => {
    
    const connector = connectorsByName[conectorID];
    
    
    if (connector) {
      try {
        await activate(connector, (error: Error) =>
          alert(error.name + " " + error.message)
        );
      } catch (e) { console.log("this",e)}

    } else {
      alert("The connector config is wrong");
    }
  };

  return { login, logout: deactivate,account, library, connector, active };
};

export default useAuth;
