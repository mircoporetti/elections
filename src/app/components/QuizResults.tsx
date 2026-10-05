import React from "react";
import {useTranslations} from "next-intl";
import {ComparedStatement, PartyPosition, PartyResult} from "../types/quiz";
import {PARTY_COLORS, PARTY_NAMES} from "./parties";

interface QuizResultsProps {
    results: PartyResult[];
    compared: ComparedStatement[];
    onRestart: () => void;
}

const POSITION_STYLES: Record<PartyPosition, string> = {
    agree: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
    neutral: "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-100",
    disagree: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
    not_addressed: "bg-white text-gray-600 border border-dashed border-gray-400 dark:bg-gray-700 dark:text-gray-300",
};

const QuizResults: React.FC<QuizResultsProps> = ({results, compared, onRestart}) => {
    const t = useTranslations('Quiz');

    return (
        <div className="flex flex-col gap-6 text-black dark:text-white">
            <div className="text-center">
                <h1 className="font-bold text-2xl">{t('results-title')}</h1>
                <p className="text-sm mt-2">{t('results-explanation')}</p>
            </div>

            <ol className="flex flex-col gap-3" aria-label={t('results-title')}>
                {results.map(result => (
                    <li key={result.party}>
                        <div className="flex justify-between items-baseline text-sm md:text-base">
                            <span className="font-bold">{PARTY_NAMES[result.party] ?? result.party}</span>
                            <span>
                                <span className="font-bold">
                                    {result.percentage === null ? "–" : `${result.percentage.toFixed(1)} %`}
                                </span>
                                <span className="text-xs ml-2 text-gray-600 dark:text-gray-300">
                                    {t('compared-on', {count: result.statements_compared})}
                                </span>
                            </span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full mt-1" aria-hidden="true">
                            <div className="h-3 rounded-full border border-gray-400"
                                 style={{
                                     width: `${result.percentage ?? 0}%`,
                                     backgroundColor: PARTY_COLORS[result.party] ?? "cadetblue",
                                 }}/>
                        </div>
                    </li>
                ))}
            </ol>

            <p className="text-xs text-center">{t('results-disclaimer')}</p>

            <div>
                <h2 className="font-bold text-lg mb-2">{t('comparison-title')}</h2>
                <div className="flex flex-col gap-2">
                    {compared.map(statement => (
                        <details key={statement.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-3">
                            <summary className="cursor-pointer text-sm md:text-base">
                                <span className="font-medium">{statement.text}</span>
                                <span className="block text-xs mt-1 text-gray-600 dark:text-gray-300">
                                    {t('your-answer')}: <strong>{t(`answer-${statement.answer}`)}</strong>
                                    {statement.weighted && ` · ${t('weighted')}`}
                                </span>
                            </summary>
                            <ul className="mt-3 flex flex-col gap-2">
                                {Object.entries(statement.positions).map(([party, position]) => (
                                    <li key={party} className="text-sm">
                                        <span className="font-bold mr-2">{PARTY_NAMES[party] ?? party}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${POSITION_STYLES[position.position]}`}>
                                            {t(`position-${position.position}`)}
                                        </span>
                                        {position.quote && (
                                            <blockquote className="mt-1 pl-3 border-l-2 border-gray-400 text-xs italic">
                                                „{position.quote}“
                                                <span className="not-italic ml-1 text-gray-600 dark:text-gray-300">
                                                    ({position.source})
                                                </span>
                                            </blockquote>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}
                </div>
            </div>

            <button onClick={onRestart}
                    className="self-center px-5 py-2 rounded-full bg-blue-600 text-white font-bold shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                {t('restart')}
            </button>
        </div>
    );
};

export default QuizResults;
