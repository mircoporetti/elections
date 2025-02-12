import {useState} from "react";
import {Message} from "../../types/message";
import {useTranslations} from "next-intl";

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const t = useTranslations('Chat');


    function setErrorWithTimeout(message: string) {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 10000);
        setMessages([]);
    }

    const fetchChatResponse = async (question: string) => {
        const userMessage = {role: "You", content: question};
        const chatHistory = [...messages, userMessage];

        setMessages(chatHistory);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/chat`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({history: chatHistory, question}),
            });

            let data;
            if (response.status === 404) {
                data = (await response.json())["detail"];
            } else if (!response.ok) {
                setErrorWithTimeout(t('assistant-error'));
            } else {
                data = (await response.json())["answer"];
            }

            if (data) {
                const botMessage = {role: "AI", content: String(data)};
                setMessages([...chatHistory, botMessage]);
            }
        } catch (error) {
            setErrorWithTimeout((error as Error).message)
        } finally {
            setIsLoading(false);
        }
    };

    return {messages, isLoading, error, setError, fetchChatResponse};
}
