export type Answer = "agree" | "neutral" | "disagree" | "skip";
export type PartyPosition = "agree" | "neutral" | "disagree" | "not_addressed";

export interface Statement {
    id: string;
    area: string;
    text: string;
}

export interface PartyResult {
    party: string;
    percentage: number | null;
    points: number;
    max_points: number;
    statements_compared: number;
}

export interface Position {
    position: PartyPosition;
    source: string | null;
    quote: string | null;
}

export interface ComparedStatement {
    id: string;
    text: string;
    answer: Answer;
    weighted: boolean;
    positions: Record<string, Position>;
}
