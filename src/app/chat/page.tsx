'use client';

import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpIcon} from "@heroicons/react/16/solid";
import PartiesSection from "../components/PartiesSection";
import Intro from "../components/Intro";
import MessagesSection from "../components/Messaging";
import DarkModeToggle from "../components/DarkModeToggle";

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
        if (messages.length > 0) {
            scrollToBottom();
        }
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
            if (data) {
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
        <div className="h-screen flex flex-col bg-white dark:bg-gray-700">
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
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                <div
                    className="max-w-4xl mx-auto px-4 max-[380px]:py-4 py-6 space-y-4 pb-2 pl-5 pr-5 md:pl-28 md:pr-28">
                    {!messages.length && <Intro/>}
                    <div className="max-[950px]:landscape:mt-0 mt-5 mb-5 md:mb-5 sticky top-0">
                        <PartiesSection onlyTags={messages.length > 0}/>
                    </div>
                    <MessagesSection messages={messages} isLoading={isLoading}/>
                    <div ref={messagesEndRef}></div>
                </div>
            </div>
            <div>
                <form
                    className="w-full max-w-3xl mx-auto max-[380px]:pl-6 max-[380px]:pr-6 pl-4 pr-4 max-[380px]:pb-4 pb-8 sm:pb-10 max-[950px]:landscape:pb-3"
                    onSubmit={handleSubmit}
                >
                    {messages.length == 0 && (
                        <div className="text-center text-black dark:text-white max-[380px]:pb-2 pb-6 sm:pb-8">
                            <h2 className="font-bold max-[380px]:text-sm text-lg md:text-xl"> Ask Away!</h2>
                        </div>
                    )}
                    <div className="flex w-full items-center relative">
                        <textarea
                            ref={inputRef}
                            className="max-[950px]:landscape:h-10 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-3xl p-2 pr-14 shadow placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none dark:focus:border-gray-600 resize-none"
                            value={input}
                            placeholder="Type your own question here"
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-white rounded-full p-3 max-[950px]:landscape:p-2 shadow focus:outline-none"
                        >
                            <ArrowUpIcon
                                className="h-6 w-6 max-[950px]:landscape:h-4 max-[950px]:landscape:w-4 text-gray-400 dark:text-gray-700"
                            />
                        </button>
                    </div>
                    <div
                        className="flex w-full items-center justify-between text-center text-black dark:text-white max-[950px]:landscape:pt-3 pt-5">
                        <p className="text-xs text-left mx-auto pl-20">Poll-E can make
                            mistakes.</p>
                        <div className="ml-4">
                            <DarkModeToggle/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
