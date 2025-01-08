import { UserDb } from "./auth"


interface QuestionObjectDB{
    id:            number,     
    question     : string,
    type?          :string,
    time?         :string,
    choice        :string[],
    correctChoice :string,
    quizId        :number,

}
interface QuizObject {
    id:number,
    name:string,
    Participant? :Participant[]
    User?: UserDb,    
    authorId:Int,
    question: QuestionObjectDB[],    
    quizTypeId?:number
}