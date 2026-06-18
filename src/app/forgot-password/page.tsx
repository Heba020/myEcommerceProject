import { Suspense } from "react";
import ForgotPasswordComponent
from "../../components/ForgotPassword";
import Loading from "@/src/auth/Loading";
export async function generateMetadata() {
  return {
    title: "Forgot Password",
  };
}
export default function ForgotPasswordPage() {

  return(
    <div>
      <Suspense fallback={<Loading />}>
        <ForgotPasswordComponent />
      </Suspense>
    </div>
  );
}