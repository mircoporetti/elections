import {useCallback, useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Answer, ComparedStatement, PartyResult, Statement} from "../../types/quiz";

export function useQuiz() {
    const locale = useLocale();
    const t = useTranslations('Quiz');

    const [statements, setStatements] = useState<Statement[]>([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [weighted, setWeighted] = useState<Set<string>>(new Set());
    const [results, setResults] = useState<PartyResult[] | null>(null);
    const [compared, setCompared] = useState<ComparedStatement[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStatements = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/quiz?lang=${locale}`);
                if (!response.ok) {
                    setError(t('generic-error'));
                    return;
                }
                setStatements((await response.json())["statements"]);
            } catch {
                setError(t('generic-error'));
            } finally {
                setIsLoading(false);
            }
        };
        loadStatements();
    }, [locale, t]);

    const submit = useCallback(async (finalAnswers: Record<string, Answer>) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/quiz/score`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({answers: finalAnswers, weighted: [...weighted], lang: locale}),
            });
            if (!response.ok) {
                setError(t('generic-error'));
                return;
            }
            const data = await response.json();
            setResults(data["results"]);
            setCompared(data["statements"]);
        } catch {
            setError(t('generic-error'));
        } finally {
            setIsLoading(false);
        }
    }, [weighted, locale, t]);

    const answer = async (value: Answer) => {
        const statement = statements[current];
        const updated = {...answers, [statement.id]: value};
        setAnswers(updated);
        if (current + 1 < statements.length) {
            setCurrent(current + 1);
        } else {
            await submit(updated);
        }
    };

    const back = () => setCurrent(Math.max(0, current - 1));

    const toggleWeighted = (id: string) => {
        const updated = new Set(weighted);
        if (updated.has(id)) {
            updated.delete(id);
        } else {
            updated.add(id);
        }
        setWeighted(updated);
    };

    const restart = () => {
        setCurrent(0);
        setAnswers({});
        setWeighted(new Set());
        setResults(null);
        setCompared([]);
    };

    return {
        statements, current, answers, weighted, results, compared, isLoading, error, setError,
        answer, back, toggleWeighted, restart,
    };
}
