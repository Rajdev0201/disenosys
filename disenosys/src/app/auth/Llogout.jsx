"use client"
import { LinkedIn } from "@react-oauth/linkedin";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { LinkedInOut } from "../Redux/features/authSlice.js";


const Llogout = () => {
  const clientId =
    "86w923qmcty9du"
    ;
  const dispatch = useDispatch();
  const router = useRouter();
  const onSuccess = () => {
    dispatch(LinkedInOut());
    router.push("/");
  };
  return (
    <div>
      <LinkedIn
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};
export default Llogout;