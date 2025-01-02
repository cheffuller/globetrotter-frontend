import { useState } from "react";

export function useResponseMessage() {
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
    const [requestFailed, setRequestFailed] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    function startWaitingForResponse(): void {
        setWaitingForResponse(true);
        setRequestFailed(false);
        setMessage("Waiting for response from the server");
    }

    function stopWithResponseSuccess(): void {
        setWaitingForResponse(false);
        setRequestFailed(false);
        setMessage("Login successful.")
    }

    function stopWithResponseFailure(message: string): void {
        setWaitingForResponse(false);
        setRequestFailed(true);
        setMessage(message);
    }

    function getElement(): JSX.Element {
        return <p>{message}</p>;
    }

    return { startWaitingForResponse, stopWithResponseSuccess, stopWithResponseFailure, getElement };

}