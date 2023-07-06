import { useRecoilValue } from "recoil";
import { jwtState } from "..";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../component/NavBar";

function IndexPage() {
    const jwt = useRecoilValue(jwtState);
    const navigate = useNavigate();


    useEffect(() => {
        // window.alert("!!!");
        if (jwt) {
            //  navigate("/home");
        }
    }, []);

    return (
        <>
            <NavBar />
            <div className="container mt-5 pt-3">
                <div>
                    <Link to="/flow/login">로그인하로가기</Link>
                    <Link to="/flow/signup">회원가입하로가기</Link>
                </div>

            </div>
        </>);
}

export default IndexPage;