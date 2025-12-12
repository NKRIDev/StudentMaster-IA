/**
 * Document content
 */
export interface Document {
  filename: string,
  summarize: string,
  flashcards: Flashcard[],
  quiz: QuizQuestion[],
}

/**
 * Question for question section
 */
export interface QuizQuestion {
  id: string,
  question: string,
  options: string[],
  correctAnswer: number,
  explanation: string,
}

/*
Flashcard object
*/
export interface Flashcard {
  id: string,
  question: string,
  answer: string,
}