import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getQuiz } from "@/services/quizService";
import { Brain, CheckCircle, CheckCircle2, Trophy, XCircle } from "lucide-react";
import { use, useEffect, useState } from "react";

export interface QuizQuestion {
  id: string,
  question: string,
  options: string[],
  correctAnswer: number,
  explanation: string,
}

/*
Quiz section
*/
const Quiz = () => {
    const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

    const question = quiz[currentQuestion];
    const progress = ((currentQuestion +1) / quiz.length) * 100;

    useEffect(() => {
        getQuiz()
            .then((res) => {
                    
                if (res.data.content) {
                    const quiz = res.data.content;
                    setQuiz(quiz);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    /*
    Select answer
    */
    const handleAnswerSelect = (index : number) => {
        if(!showResult){
            setSelectedAnswer(index);
        }
    };

    /*
    Send answer
    */
    const handleSubmit = () => {
        if (selectedAnswer === null){
            return;
        }

        setShowResult(true);
        if(selectedAnswer === question.correctAnswer){
            setScore(score +1);
        }
    };

    /*
    Go to next question
    */
    const handleNext = () => {
        if(currentQuestion < quiz.length -1){
            setCurrentQuestion(currentQuestion +1)
            setSelectedAnswer(null);
            setShowResult(false);
        }
        else{
            setIsQuizCompleted(true);
        }
    };

    /*
    Restart the quiz
    */
    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setIsQuizCompleted(false);
    }

    if(loading){
        return(
        <div className="text-center text-blue-600 font-bold">
            Génération en cours...
        </div>
        );
    }

    {/*Displaying the results when the quiz is finished */}
    if(isQuizCompleted) {
        const percentage = Math.round((score / quiz.length) * 100)
        
        return (
            <div className="flex h-screen bg-slate-50">
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8 max-w-4xl mx-auto">
                        <Card className="text-center">
                            <CardContent className="p-12">
                                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Trophy className="w-10 h-10 text-white" />
                                </div>

                                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                                    Quiz terminé ! 🎉
                                </h1>

                                <div className="mb-8">
                                    <p className="text-6xl font-bold text-blue-600 mb-2">
                                        {percentage}%
                                    </p>
                                    <p className="text-slate-600">
                                        {score} bonnes réponses sur {quiz.length}
                                    </p>
                                </div>

                                <div className="max-w-md mx-auto mb-8">
                                    {percentage >= 80 ? (
                                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                            <p className="text-emerald-800 font-medium">
                                                Excellent travail ! Vous maîtrisez bien le sujet.
                                            </p>
                                        </div>
                                    ) : percentage >= 60 ? (
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <p className="text-blue-800 font-medium">
                                                Bon résultat ! Continuez à réviser pour améliorer.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                            <p className="text-amber-800 font-medium">
                                                Continuez vos efforts ! Révisez les concepts clés.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <Button onClick={handleRestart}>
                                        Recommencer le quiz
                                    </Button>
                                    <Button variant="outline">
                                        Retour au dashboard
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        )
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-5xl mx-auto">

                    {/*Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-ld flex items-center justify-center">
                                <Brain className="w-6 h-6 text-amber-600"/>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">
                                    Quiz d'entrainement
                                </h1>
                                <p className="text-slate-600">
                                    Question {currentQuestion +1} sur {quiz.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/*Progress bar */}
                    <div className="space-y-2">
                        <Progress value={progress} className="h-2"/>
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Progression</span>
                            <span>Score: {score}/{quiz.length}</span>
                        </div>
                    </div>

                    {/*Quiz Card */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {question.question}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {
                                question.options.map((option, index) => {
                                    const isSelected = selectedAnswer === index;
                                    const isCorrect = index === question.correctAnswer;
                                    const showCorrect = showResult && isCorrect;
                                    const showIncorrect = showResult && isSelected && !isCorrect;

                                    return(
                                        <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        disabled={showResult}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                        showCorrect
                                            ? "border-emerald-500 bg-emerald-50"
                                            : showIncorrect
                                            ? "border-red-500 bg-red-50"
                                            : isSelected
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                        }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-3">
                                                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                                                    showCorrect
                                                        ? "border-emerald-500 bg-emerald-500 text-white"
                                                        : showIncorrect
                                                        ? "border-red-500 bg-red-500 text-white"
                                                        : isSelected
                                                        ? "border-blue-500 bg-blue-500 text-white"
                                                        : "border-slate-300"
                                                    }`}>
                                                        {String.fromCharCode(65 + index)}
                                                    </span>
                                                    <span className={showCorrect ? "text-emerald-900 font-medium" : showIncorrect ? "text-red-900" : ""}>
                                                        {option}
                                                    </span>
                                                </span>
                                                {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600"/>}
                                                {showIncorrect && <XCircle className="w-5 h-5 text-red-500"/>}
                                            </div>
                                        </button>
                                    );
                                })
                            }
                        </CardContent>
                    </Card>


                    {/* Explanation */}
                    {showResult && (
                        <Card className="mb-6 bg-blue-50 border-blue-200">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-blue-600" />
                                    Explication
                                </h3>
                                <p className="text-slate-700">
                                    {question.explanation}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/*Send answer */}
                    <div className="flex gap-4">
                        {!showResult ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedAnswer === null}
                            className="flex-1"
                        >
                            Valider la réponse
                        </Button>
                        ) : (
                        <Button onClick={handleNext} className="flex-1">
                            {currentQuestion < quiz.length - 1
                            ? "Question suivante"
                            : "Voir les résultats"}
                        </Button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Quiz;