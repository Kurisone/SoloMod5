import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Auth({ children }) {
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
        return null;
    }
    return children;
    }

    export default Auth;
// This component checks if the user is logged in
// If the user is not logged in, it redirects them to the home page
// If the user is logged in, it renders the children components