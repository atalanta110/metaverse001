import {
  // ? react hooks
  useState,
  createContext,
  // ? react types
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import { USER_TOKEN, getValue } from "../app/localStorage";
interface IProps {
  children: ReactNode;
}
interface IMyContext {
  [key: string]: boolean;
}

// Context for state
export const ContextState = createContext<undefined | IMyContext>(undefined);

// Context for setState
export const ContextSetState = createContext<
  undefined | Dispatch<SetStateAction<undefined | IMyContext>>
>(undefined);

export default function ContextProvider({ children }: IProps) {
  const [appState, setAppState] = useState<undefined | IMyContext>({
    isBuyEnable: false,
    isWalletModalOpen: false,
    isLogin: !!getValue(USER_TOKEN),
  });

  return (
    <ContextState.Provider value={appState}>
      <ContextSetState.Provider value={setAppState}>
        {children}
      </ContextSetState.Provider>
    </ContextState.Provider>
  );
}
