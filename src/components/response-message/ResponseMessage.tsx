import { useRef, useState } from "react";

export function ResponseMessage() {
    const waitingForResponse = useRef<boolean>(false);
    const requestFailed = useRef<boolean>(false);
    const [message, setMessage] = useState<string>("");

    function startWaitingForResponse(): void {
        waitingForResponse.current = true;
        requestFailed.current = false;
        setMessage("Waiting for response from the server");
    }

    function stopAfterSuccess(): void {
        waitingForResponse.current = false;
        requestFailed.current = false;
        setMessage("Login successful.")
    }

    function stopAfterFailure(message: string): void {
        waitingForResponse.current = false;
        requestFailed.current = true;
        setMessage(message);
    }

    function getElement(): JSX.Element {
        return <p>{message}</p>;
    }

    return {
        startWaitingForResponse, stopAfterSuccess, stopAfterFailure,
        getElement, waitingForResponse, requestFailed
    };

}