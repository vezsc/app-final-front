import { Link, useNavigate } from "react-router-dom";
import { REST_SERVER_ADDRESS } from "../common/constant";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { jwtState, userEmailState } from "..";
import NavBar from "../component/NavBar";

function LoginPage() {
    // 필요한 훅 설정
    const navigate = useNavigate();
    const formRef = useRef();
    const [jwt, setJwt] = useRecoilState(jwtState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);


    // 팝업에서 메세지 이벤트 발생시켰을 때 =======================
    window.onmessage = (evt) => {
        console.log(evt.data.type);
        if (evt.data.type === "kakaoAuth") {
            setJwt(evt.data.jwtToken);
            setUserEmail(evt.data.userEmail);
            navigate("/");
        }
    }

    // 이벤트 처리 
    // 사용자 이메일 비번 치고 로그인 시도시 =================================
    const loginFormHandle = (evt) => {
        evt.preventDefault();
        const email = formRef.current.email.value;
        const password = formRef.current.password.value;
        if (email === "" || password === "") {
            formRef.current.email.focus();
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open("POST", REST_SERVER_ADDRESS + "/api/v1/user/validate", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.send("email=" + email + "&password=" + password);
        window.alert(xhr.status);
        if (xhr.status === 200) {
            // window.alert(xhr.responseText);
            const response = JSON.parse(xhr.responseText);
            // window.alert(response.token);
            setJwt(response.token);
            sessionStorage.setItem("authToken", response.token);
            setUserEmail(response.userEmail)
            sessionStorage.setItem("authUserEmail", response.userEmail);
            navigate("/home");
        } else if (xhr.status === 400) {
            formRef.current.email.classList.add("is-invalid");
            formRef.current.password.classList.add("is-invalid");
            formRef.current.password.value = "";
            formRef.current.email.select();
            formRef.current.email.focus();
        } else {
            formRef.current.password.classList.add("is-invalid");
            formRef.current.password.classList.add("is-invalid");
            formRef.current.password.value = "";
        }
    }
    // 카카오 로그인 클릭시
    const kakaoLoginHandle = (evt) => {

        const xhr = new XMLHttpRequest();
        xhr.open("GET", REST_SERVER_ADDRESS + "/api/v1/oauth/kakao", false);
        xhr.send();
        //   window.alert(xhr.responseText);
        const url = JSON.parse(xhr.responseText).authUri;
        window.open(url, "_blank", "width=400, height=620, popup=1");
    }

    return (
        <>
            <NavBar />
            <div className="container mt-5 pt-3">
                <h2>#로그인</h2>
                <form onSubmit={loginFormHandle} ref={formRef}>
                    <div className="mb-3">
                        <span className="form-label">사용자이메일(*)</span>
                        <input type="text" className="form-control mt-2" name="email" />
                    </div>
                    <div className="mb-3">
                        <span className="form-label">사용자비밀번호(*)</span>
                        <input type="password" className="form-control  mt-2" name="password" />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="form-control text-bg-dark" >로그인</button>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="form-control text-bg-warning" onClick={kakaoLoginHandle}>카카오로 로그인하기</button>
                    </div>
                </form>
                <div className="text-center">
                    계정이 없으신가요? <Link to="/flow/signup">가입하기</Link>
                </div>
            </div>
        </>);
}

export default LoginPage;