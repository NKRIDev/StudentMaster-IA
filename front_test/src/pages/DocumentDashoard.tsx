import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocument } from "@/contexts/DocumentContext";
import { Album, BookOpen, Brain, ChevronRight, FileText, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cards = [
    {
      title: "Résumé",
      description: "Consultez le résumé intelligent généré par l'IA",
      icon: FileText,
      color: "emerald",
      navigate: "/document/summary",
      action: "Lire le résumé"
    },
    {
      title: "Fiche de révision",
      description: "Points clés organisés pour vos révisions",
      icon: BookOpen,
      color: "purple",
      navigate: "/document/revision",
      action: "Réviser"
    },
    {
      title: "Flashcards",
      description: "Cartes de mémorisation",
      icon: Brain,
      color: "indigo",
      navigate: "/document/flashcards",
      action: "Pratiquer"
    },
    {
      title: "Quiz",
      description: "Questions pour tester vos connaissances",
      icon: GraduationCap,
      color: "amber",
      navigate: "/document/quiz",
      action: "Démarrer le quiz"
    },
];

export const DocumentBoard = () => {
    const navigate = useNavigate();
    const document = useDocument();

    return(
        <div className="p-8 max-w-5xl mx-auto">
            {/*Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Album className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {document.document.filename}
                        </h1>
                        
                        <p className="text-slate-600">
                            Ajouté le XX/XX/XXXX - X.XMB
                        </p>
                    </div>
                </div>
            </div>

            {/*Tools sections */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Outils disponibles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {
                        cards.map((card, index) => {
                            const Icon = card.icon;
                            const colorClasses = {
                                emerald: 'bg-emerald-100 text-emerald-600',
                                purple: 'bg-purple-100 text-purple-600',
                                indigo: 'bg-indigo-100 text-indigo-600',
                                amber: 'bg-amber-100 text-amber-600',
                            };

                            return(
                                <Card
                                key={index}
                                className="hover:shadow-lg cursor-pointer transition-shadow"
                                onClick={() => navigate(card.navigate)}
                                >
                                    
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 ${colorClasses[card.color]} rounded-lg flex items-center justify-center`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                        </div>

                                        <CardTitle className="text-lg">{card.title}</CardTitle>
                                        <CardDescription>{card.description}</CardDescription>
                                    </CardHeader>  

                                    <CardContent>
                                        <Button 
                                            className="w-full"
                                            variant={'default'}
                                        >
                                            {card.action}
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })
                    }
                </div>
            </section>
        </div>
    );
};