import React from "react";
import { User } from "@firebase/auth-types";

import AuthService from "./AuthService";

export const currentUserCtx = React.createContext<User | null>(null);

export const authServiceCtx = React.createContext<AuthService | null>(null);

export default authServiceCtx;
