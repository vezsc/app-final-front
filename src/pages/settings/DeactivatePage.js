import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { jwtState, userEmailState } from "../..";
import { REST_SERVER_ADDRESS } from "../../common/constant";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";

function DeactivatePage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [error, setError] = useState(false);
    const [jwt, setJwt] = useRecoilState(jwtState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);
    const passwordRef = useRef();


    //=================================================================================
    const deactivateHandle = (evt) => {
        // 패스워드 뽑아서 .. API 호출
        const xhr = new XMLHttpRequest();
        const password = passwordRef.current.value;

        xhr.open("DELETE", REST_SERVER_ADDRESS + "/api/v1/user/private?password=" + password, false);
        xhr.setRequestHeader("Authorization", jwt);
        xhr.send();
        if (xhr.status === 200) {
            setJwt(null);
            setUserEmail(null);
            navigate("/settings/deactivated");
            return;
        }
        // 처리결과에 따라 UI 변경
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 1000)
    };

    return (<>
        <NavBar />
        <div className="container pt-3">
            {
                step === 0 && <>
                    <h3>계정이 삭제됩니다.</h3>
                    <div>
                        기타 알아야할 상황들
                    </div>
                    <button className="btn btn-danger" onClick={(evt) => {
                        setStep(1);
                    }}>다음</button>

                </>
            }
            {
                step === 1 && <>
                    <h3>암호를 확인합니다.</h3>
                    <small>당신의 계정에 설정된 비밀번호를 입력하세요</small>
                    <div>
                        {userEmail.endsWith("@kakao.user") ?
                            <>
                                <input type="password" className="form-controll"
                                    placeholder="소셜가입자는 비밀번호를 입력하지 않습니다." disabled />
                            </>
                            :
                            <>
                                <input type="password" placeholder="비밀번호" ref={passwordRef} />
                            </>
                        }
                    </div>
                    <button className="btn btn-danger" onClick={deactivateHandle}>삭제 진행</button>
                    {error && <div className="alert alert-danger" role="alert">
                        비밀번호가 일치하지 않습니다.
                    </div>}
                </>
            }
        </div>
    </>);
}

export default DeactivatePage;