import { useState } from "react";

function FeedCreate() {
    

    return (<div className="card">
        <div className="card-body">
        <div>
            <textarea className="form-control-plaintext" style={{resize:"none"}}></textarea>
        </div>
        <div className="d-flex flex-wrap">
            사진 미리보기 영역
        </div>
        <div>
            <input type="file" style={{display:"none"}}/>
            <button className="btn btn-sm btn-secondary"><i className="bi bi-file-image"></i></button>
        </div>
        </div>
    </div>);
}

export default FeedCreate;