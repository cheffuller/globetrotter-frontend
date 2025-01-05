import { useRef, useState } from "react";

export function ResponseMessage() {
    const waitingForResponse = useRef<boolean>(false);
    const requestFailed = useRef<boolean>(false);
    const [message, setMessage] = useState<string>("");

    function startWaitingForResponse(message: string): void {
        waitingForResponse.current = true;
        requestFailed.current = false;
        setMessage(message);
    }

    function stopWaitingAfterSuccess(message: string): void {
        waitingForResponse.current = false;
        requestFailed.current = false;
        setMessage(message);
    }

    function stopWaitingAfterFailure(message: string): void {
        waitingForResponse.current = false;
        requestFailed.current = true;
        setMessage(message);
    }

    function getResponseMessage(): JSX.Element {
        return <p>{message}</p>;
    }

    return {
        startWaitingForResponse, stopWaitingAfterSuccess, stopWaitingAfterFailure,
        getResponseMessage, waitingForResponse, requestFailed
    };

}