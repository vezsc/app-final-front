import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";


function DeactivatedPage() {
    const navigate = useNavigate();
    return (<>
        <NavBar/>
        <div className="container pt-3">
            <h4>#비활성화됨</h4>
            <p>
                계정이 비활성화 되었습니다.
            </p>
            <p>
                떠나신다니 아쉽습니다. #GoodBye
            </p>
        </div>
        <div className="fixed-bottom text-center bg-primary">
            <button className="btn btn-primary"
                onClick={(evt) => navigate("/flow/login")}>로그인</button>
            <button className="btn btn-primary"
                onClick={(evt) => navigate("/flow/signup")}>회원가입</button>
        </div>
    </>);
}

export default DeactivatedPage;