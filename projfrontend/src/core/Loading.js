import React from "react";

const Loading = ({loading = false}) => {
    return (
        <div className="text-center">
                <div className={`spinner-border text-info my-3 ${(loading == true) ? "" : " d-none"}`} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
        </div>
    );
}

export default Loading;