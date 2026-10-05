'use client';

import React from 'react';
import {useTranslations} from 'next-intl';
import {Link} from "../../../i18n/routing";
import {useQuiz} from "./useQuiz";
import {Answer} from "../../types/quiz";
import QuizResults from "../../components/QuizResults";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import DarkModeToggle from "../../components/DarkModeToggle";

const ANSWER_BUTTONS: { value: Answer, style: string }[] = [
    {value: "agree", style: "border-green-600 hover:bg-green-50 dark:hover:bg-green-900"},
    {value: "neutral", style: "border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600"},
    {value: "disagree", style: "border-red-600 hover:bg-red-50 dark:hover:bg-red-900"},
];

// "Economy & Finance" -> "economy-finance", matching the keys in messages/*.json
const areaKey = (area: string) => area.toLowerCase().replace(/[^a-z]+/g, "-");

export default function Quiz() {

    const t = useTranslations('Quiz');

    const {
        statements, current, answers, weighted, results, compared, isLoading, error, setError,
        answer, back, toggleWeighted, restart,
    } = useQuiz();

    const statement = statements[current];
    const previousAnswer = statement ? answers[statement.id] : undefined;

    return (
        <div className="min-h-[100dvh] flex flex-col bg-white dark:bg-gray-700">
            {error && (
                <div role="alert"
                     className="error-screen mx-auto max-w-3xl w-full bg-red-600 text-white p-4 rounded-lg flex items-center justify-between shadow-lg">
                    <span className="flex-1">{error}</span>
                    <button onClick={() => setError(null)} aria-label={t('close')}
                            className="text-white font-bold px-2 py-1 bg-transparent rounded-full hover:bg-red-700 transition">
                        X
                    </button>
                </div>
            )}
            <main className="flex-1 w-full max-w-3xl mx-auto px-5 py-6">
                <div className="flex justify-end mb-4">
                    <Link href="/chat" className="text-sm text-blue-600 dark:text-blue-300 hover:underline">
                        {t('to-chat')}
                    </Link>
                </div>

                {results ? (
                    <QuizResults results={results} compared={compared} onRestart={restart}/>
                ) : statement ? (
                    <div className="flex flex-col gap-6 text-black dark:text-white">
                        <div className="text-center">
                            <h1 className="font-bold text-2xl">{t('title')}</h1>
                            {current === 0 && <p className="text-sm mt-2">{t('intro')}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>{t('progress', {current: current + 1, total: statements.length})}</span>
                                <span>{t(`areas.${areaKey(statement.area)}`)}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full"
                                 role="progressbar" aria-valuemin={1} aria-valuemax={statements.length}
                                 aria-valuenow={current + 1}
                                 aria-label={t('progress', {current: current + 1, total: statements.length})}>
                                <div className="h-2 bg-blue-600 rounded-full transition-all"
                                     style={{width: `${(100 * (current + 1)) / statements.length}%`}}/>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6 min-h-32 flex items-center justify-center">
                            <h2 className="text-lg md:text-xl font-medium text-center" aria-live="polite">
                                {statement.text}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {ANSWER_BUTTONS.map(({value, style}) => (
                                <button key={value} onClick={() => answer(value)} disabled={isLoading}
                                        aria-pressed={previousAnswer === value}
                                        className={`py-3 rounded-xl border-2 font-bold bg-white dark:bg-gray-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 ${style} ${previousAnswer === value ? "ring-2 ring-blue-500" : ""}`}>
                                    {t(`answer-${value}`)}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                            <button onClick={back} disabled={current === 0 || isLoading}
                                    className="underline disabled:opacity-40 disabled:no-underline">
                                {t('back')}
                            </button>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={weighted.has(statement.id)}
                                       onChange={() => toggleWeighted(statement.id)}
                                       className="w-4 h-4"/>
                                {t('weight-toggle')}
                            </label>
                            <button onClick={() => answer("skip")} disabled={isLoading}
                                    className="underline disabled:opacity-40">
                                {t('answer-skip')}
                            </button>
                        </div>

                        {isLoading && <p className="text-center text-sm" role="status">{t('calculating')}</p>}
                    </div>
                ) : (
                    isLoading && <p className="text-center text-black dark:text-white" role="status">{t('loading')}</p>
                )}
            </main>
            <footer className="w-full max-w-3xl mx-auto px-4 pb-4">
                <div className="flex w-full items-center justify-between text-center text-black dark:text-white pt-5">
                    <div><LanguageSwitcher onLanguageChange={restart}/></div>
                    <div className="flex-grow text-center">
                        <p className="text-xs mx-auto pr-3">{t('disclaimer')}</p>
                    </div>
                    <div className="ml-4"><DarkModeToggle/></div>
                </div>
            </footer>
        </div>
    );
}
