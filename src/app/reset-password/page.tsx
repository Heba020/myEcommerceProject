

import ResetPasswordComponent
from "@/src/components/ResetPassword";

export async function generateMetadata() {
  return {
    title: "Reset Password Page",
  };
}
export default function ResetPasswordPage() {

  return <ResetPasswordComponent />;
}