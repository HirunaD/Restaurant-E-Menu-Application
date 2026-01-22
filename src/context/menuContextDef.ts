import { createContext } from "react";
import type { MenuContextType } from "../types";

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined,
);
