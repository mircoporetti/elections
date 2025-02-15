'use client';

import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpIcon} from "@heroicons/react/16/solid";
import PartiesSection from "../../components/PartiesSection";
import Intro from "../../components/Intro";
import MessagesSection from "../../components/Messaging";
import DarkModeToggle from "../../components/DarkModeToggle";
import {useTranslations} from 'next-intl';
import {useChat} from "./useChat";
import LanguageSwitcher from "../../components/LanguageSwitcher";

export default function Chat() {

    const t = useTranslations('Chat');

    const {messages, isLoading, error, setError, fetchChatResponse} = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current?.focus();
        }
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        await fetchChatResponse(input);
        setInput("");
    };

    const autoResize = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className="h-screen flex flex-col bg-white dark:bg-gray-700">
            {error && (
                <div
                    className="error-screen mx-auto max-w-3xl w-full bg-red-600 p-4 rounded-lg flex items-center justify-between shadow-lg">
                    <span className="flex-1">{error}</span>
                    <button onClick={() => setError(null)}
                            className="text-white font-bold px-2 py-1 bg-transparent rounded-full hover:bg-red-700 transition">
                        X
                    </button>
                </div>
            )}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                <div
                    className="max-w-4xl mx-auto px-4 max-[380px]:py-4 py-6 space-y-4 pb-2 pl-5 pr-5 md:pl-28 md:pr-28">
                    {!messages.length &&
                        <div className="max-[380px]:mb-4 mb-10 sm:mb-14 md:mb-20 xl:mb-28">
                            <Intro/>
                        </div>
                    }
                    <div
                        className={`max-[950px]:landscape:mt-0 mb-5 md:mb-5 ${
                            messages.length > 0 ? "fixed top-0 left-0 w-full bg-white dark:bg-gray-700 z-50" : "sticky top-0"
                        }`}
                    >
                        <PartiesSection showOnlyTags={messages.length > 0} fillChatInput={setInput}/>
                    </div>
                    {messages.length > 0 && <div className="max-[950px]:landscape:h-[6rem] h-[9rem]"></div>}
                    <MessagesSection messages={messages} isLoading={isLoading}/>
                    <div ref={messagesEndRef}></div>
                </div>
            </div>
            <div>
                <form
                    className="w-full max-w-3xl mx-auto max-[380px]:pl-6 max-[380px]:pr-6 pl-4 pr-4 max-[380px]:pb-4 pb-8 sm:pb-10 max-[950px]:landscape:pb-3"
                    onSubmit={handleSubmit}
                >
                    {!messages.length && (
                        <div className="text-center text-black dark:text-white max-[380px]:pb-2 pb-6 sm:pb-8">
                            <h2 className="font-bold max-[380px]:text-sm text-lg md:text-xl">{t('ask-away')}</h2>
                        </div>
                    )}
                    <div className="flex w-full items-center relative">
                        <textarea
                            ref={inputRef}
                            className="max-[950px]:landscape:h-12 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-3xl p-2 pr-14 pt-6 max-[950px]:landscape:pt-2 max-[380px]:text-sm shadow placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none dark:focus:border-gray-600 resize-none"
                            value={input}
                            placeholder={t('input-placeholder')}
                            onChange={event => setInput(event.target.value)}
                            onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
                            onKeyDown={async (e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    await handleSubmit(e);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-white rounded-full p-3 max-[950px]:landscape:p-2 shadow focus:outline-none"
                        >
                            <ArrowUpIcon
                                className={`h-6 w-6 max-[950px]:landscape:h-4 max-[950px]:landscape:w-4 ${
                                    input.length > 0 ? "text-black dark:text-gray-700" : "text-gray-400"
                                }`}
                            />
                        </button>
                    </div>
                    <div
                        className="flex w-full items-center justify-between text-center text-black dark:text-white max-[950px]:landscape:pt-3 pt-5">
                        <div>
                            <LanguageSwitcher onLanguageChange={() => setInput('')}/>
                        </div>
                        <div className="flex-grow text-center">
                            <p className="text-xs mx-auto pr-8">{t('polle-disclaimer')}</p>
                        </div>
                        <div className="ml-4">
                            <DarkModeToggle/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
