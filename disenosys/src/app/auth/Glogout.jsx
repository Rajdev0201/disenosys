import { GoogleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { GoogleOut } from "../Redux/features/authSlice.js";
const Glogout = () => {
  const clientId =
    "983254091360-quqeguqb1f1kl5s3gmlljamv3rla3acr.apps.googleusercontent.com";
  const dispatch = useDispatch();
  const router = useRouter();
  const onSuccess = () => {
    dispatch(GoogleOut());
    router.push("/");
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};
export default Glogout;