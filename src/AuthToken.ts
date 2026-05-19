import { getServerSession } from "next-auth";

import { authOptions } from "./scheme/Auth";

export async function getAuthToken() {

  const session =
    await getServerSession(authOptions);

  return (session as any)?.accessToken;
}