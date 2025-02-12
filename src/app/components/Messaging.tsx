import React from 'react';
import {useTranslations} from "next-intl";

interface Message {
    role: string;
    content: string;
}

interface MessagingProps {
    messages: Message[];
    isLoading: boolean;
}

const Messaging: React.FC<MessagingProps> = ({messages, isLoading}) => {

    const t = useTranslations('Chat');

    return (
        <>
            <div className="flex flex-col pl-1 pr-1 gap-3">
                {messages.map((message, index) => {
                    const role = message.role.toLowerCase();
                    return (
                        <div
                            key={index}
                            className={`whitespace-pre-wrap p-5 rounded-lg shadow ${
                                role === 'you'
                                    ? 'bg-blue-100 dark:bg-gray-600 text-right text-black dark:text-white ml-auto max-w-max'
                                    : 'bg-gray-50 dark:bg-gray-800 text-left mr-auto max-w-full text-black dark:text-white'
                            }`}
                        >
                            <div className="font-bold">{t(`${role}`)}</div>
                            <p className="max-[950px]:landscape:text-sm break-words text-left max-[380px]:text-xs text-sm md:text-lg">
                                {message.content}
                            </p>
                        </div>
                    );
                })}
            </div>
            {isLoading && (
                <div className="flex flex-col mx-auto mt-4t">
                    <div className="font-bold text-black dark:text-white">Poll-E</div>
                    <div
                        className="pt-2 border-4 border-t-4 border-gray-600 dark:border-white border-dotted w-8 h-8 rounded-full animate-spin mt-2 self-start"></div>
                </div>
            )}
        </>
    );
};

export default Messaging;
