import ForgotPasswordComponent
from "../../components/ForgotPassword";
export async function generateMetadata() {
  return {
    title: "Forgot Password",
  };
}
export default function ForgotPasswordPage() {

  return <ForgotPasswordComponent />;
}