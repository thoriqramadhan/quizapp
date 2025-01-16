import { User, UserDb } from "./auth";

interface Participant {
    id: number,
    participant?: UserDb,
    quizId: number,
    score: number,
    time?: number,
    title: string,
    userId: number
}