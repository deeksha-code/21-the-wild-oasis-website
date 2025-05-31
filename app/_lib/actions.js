"use server" //its important beause it shoul be called only inside server

import { signIn,signOut } from "./auth"

export async function signInAction() {
    await signIn("google",{redirectTo:'/account'});
}
export async function signOutAction() {
    await signOut("google",{redirectTo:'/'});
}
