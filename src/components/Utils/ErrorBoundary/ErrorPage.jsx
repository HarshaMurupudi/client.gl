// import "./Er;
export default function ErrorPage(props) {
    return (
        <div className={"error-page"}>
            <div className={"message"}>Work in progress...</div>
            {props.resetErrorBoundary && (
                <div>
                    <button className={"retry-button"} onClick={props.resetErrorBoundary}>
                        🔄 Try Again!
                    </button>
                </div>
            )}
        </div>
    );
}