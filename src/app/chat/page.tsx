'use client';

import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpIcon} from "@heroicons/react/16/solid";

export default function Chat() {

    interface Message {
        role: string;
        content: string;
    }

    const [messages, setMessages] = useState<Message[]>([]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorScreen, setErrorScreen] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current?.focus();
        }
        scrollToBottom();
    }, [messages]);

    const handleCloseError = () => {
        setErrorScreen('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userMessage = {role: 'You', content: input};
        const chatHistory = [...messages, userMessage];
        setMessages(chatHistory);
        setInput('');
        setIsLoading(true);
        try {
            const response = await fetch(`/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({history: chatHistory, question: input}),
            });

            let data
            if (response.status === 404) {
                const json = await response.json();
                data = json['detail'];
            } else if (!response.ok) {
                setErrorScreen('AI Assistant responded with an error! Please try again.');
                setTimeout(() => {
                    setErrorScreen('');
                }, 5000);
            } else {
                const json = await response.json();
                data = json['answer'];
            }
            if(data){
                setErrorScreen('');
                const botMessage = {role: 'AI', content: String(data)};
                setMessages([...chatHistory, botMessage]);
            }

        } catch (error) {
            setErrorScreen('Failed to get answer from elections AI Assistant: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            {errorScreen && (
                <div
                    className="error-screen mx-auto max-w-3xl w-full bg-red-600 p-4 rounded-lg flex items-center justify-between shadow-lg">
                    <span className="flex-1">{errorScreen}</span>
                    <button onClick={handleCloseError}
                            className="text-white font-bold px-2 py-1 bg-transparent rounded-full hover:bg-red-700 transition">
                        X
                    </button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 ">
                <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                    <div
                        className="flex justify-center items-center p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl sticky top-0 z-10 border-b-8 border-white">
                        <div className="text-center text-gray-800 dark:text-white">
                            <h2 className="font-bold text-xl mb-4">🇩🇪 Welcome to Bundestag 2025 Elections AI
                                Chatbot! 🇩🇪</h2>
                            <p className="text-sm">Ask me anything about the official German parties&apos; programs for
                                elections and
                                I will answer with the info taken from the official manifests!</p><p>
                            <b>IMPORTANT:</b> Please mention only one of the following parties at a time : CDU, SPD,
                            AFD, FDP, DL, DGR, BSW. Currently, I
                            can&apos;t handle multiple parties in the same question.</p>
                        </div>
                    </div>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`whitespace-pre-wrap p-4 rounded-lg shadow ${message.role === 'You' ? 'bg-blue-100 text-right ml-auto max-w-max' : 'bg-gray-50 dark:bg-gray-700 text-left mr-auto max-w-full'}`}
                        >
                            <div className="font-bold">{message.role}</div>
                            <p className="break-words text-left">{message.content}</p>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex flex-col mx-auto mt-4">
                            <div className="font-bold">AI</div>
                            <div
                                className="pt-2 border-4 border-t-4 border-gray-600 border-dotted w-8 h-8 rounded-full animate-spin mt-2 self-start"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef}></div>
                </div>
            </div>

            <form className="w-full max-w-3xl mx-auto p-4 pb-10" onSubmit={handleSubmit}>
                <div className="flex w-full items-center relative">
                    <textarea
                        ref={inputRef}
                        className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl p-2 pr-14 shadow placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none dark:focus:border-gray-600 resize-none"
                        value={input}
                        placeholder="Ask a question..."
                        onChange={handleInputChange}
                        style={{height: '6rem', backgroundColor: "#f5f4f3"}}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-3 shadow focus:outline-none"
                    >
                        <ArrowUpIcon className="h-6 w-6 text-white"/>
                    </button>
                </div>
            </form>
        </div>
    );
}
