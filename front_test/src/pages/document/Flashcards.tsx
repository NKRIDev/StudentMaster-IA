import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getFlashcards } from "@/services/flashcardService";
import { Brain, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

export interface Flashcard {
  id: string,
  question: string,
  answer: string,
}

const Flashcards = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const currentCard = flashcards[currentIndex];
    const progress = ((currentIndex +1) / flashcards.length) *100;

    /*
    Next cards
    */
    const handleNext = () => {
        if(currentIndex < flashcards.length -1){
            setCurrentIndex(currentIndex +1);
            setIsFlipped(false);
        }
    };

    /*
    back to previous card
    */
    const handlePrevious = () => {
        if(currentIndex > 0){
            setCurrentIndex(currentIndex -1);
            setIsFlipped(false);
        }
    };

    /*
    turn over the card
    */
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        getFlashcards()
            .then((res) => {
                
                if (res.data.content) {
                    const parsedFlashcards = JSON.parse(res.data.content);
                    setFlashcards(parsedFlashcards);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return(
        <div className="flex h-screen bg-slate-50">
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-5xl mx-auto">

                    {/*Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Brain className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">
                                    Flashcards
                                </h1>
                                <p className="text-slate-600">
                                    Carte 1 sur 5
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-slate-600 text-right">
                                {Math.round(progress)}% complété
                            </p>
                        </div>
                    </div>

                    {/*Loader */}
                    {loading && (
                        <div className="text-center text-blue-600 font-bold">
                            Génération en cours...
                        </div>
                    )}

                    {/*Card container*/}
                    <div className="mb-8">
                        <Card 
                        className="cursor-pointer hover:shadow-lg transition-all duration-300 min-h-[400px]"
                        onClick={handleFlip}
                        >

                            <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                                <div className="text-center w-full">
                                    {
                                        !loading && (
                                            !isFlipped ? (
                                                <>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                                                    Question
                                                </div>
                                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                                                    {currentCard.question}
                                                </h2>
                                                <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                                                    <RotateCw className="w-4 h-4"/>
                                                    Cliquez pour voir la réponse
                                                </p>
                                                </>
                                            ) : (
                                                <>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
                                                    Réponse
                                                </div>
                                                <p className="text-lg text-slate-700 leading-relaxed">
                                                    {currentCard.answer}
                                                </p>
                                                <p className="text-slate-500 text-sm mt-6 flex items-center justify-center gap-2">
                                                    <RotateCw className="w-4 h-4"/>
                                                    Cliquez pour voir la question
                                                </p>
                                                </>
                                            )
                                        )
                                    }
                                </div>
                            </CardContent>

                        </Card>
                    </div>

                    {/*Nav cards */}
                    <div className="flex items-center justify-between gap-4">
                        <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={false}
                        className="flex-1"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2"/>
                            Précédente
                        </Button>

                        <Button
                        variant="outline"
                        onClick={handleFlip}
                        disabled={false}
                        className="flex-1"
                        >
                            <RotateCw className="w-4 h-4 mr-2"/>
                            Retourner
                        </Button>

                        <Button
                        variant="outline"
                        onClick={handleNext}
                        disabled={false}
                        className="flex-1"
                        >
                            Suivante
                            <ChevronRight className="w-4 h-4 mr-2"/>
                        </Button>
                    </div>

                    {/* Tips */}
                    <Card className="mt-6 bg-blue-50 border-blue-200">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-slate-900 mb-3">
                                Technique de mémorisation
                            </h3>
                            
                            <p className="text-sm text-slate-700">
                                Essayez de répondre mentalement avant de retourner la carte.
                                La récupération active améliore la rétention à long terme.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Flashcards;