
import Auth from "./Auth.jsx";

export default function AdminPage() {
    // const user = useSelector((state) => state?.user);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   const storedUser = localStorage.getItem("profile");
    //   if (storedUser) {
    //     // Dispatch action to update Redux with localStorage data
    //     dispatch(setUser(JSON.parse(storedUser)));
    //   }
    // }, [dispatch]);


return(
    <div>
        <Auth/>
    </div>
)
}