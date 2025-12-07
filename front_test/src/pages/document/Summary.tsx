import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSummary } from "@/services/summaryService";
import { BookMarked, Download } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Summary = () => {
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        
        getSummary()
            .then((res) => {
                setSummary(res.data.content);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    return (
        <div className="flex h-screen bg-slate-50">
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-5xl mx-auto">

                    {/*Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookMarked className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">
                                    NOM DOCUMENT
                                </h1>
                                <p className="text-slate-600">Résumé généré par l'IA</p>
                            </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Exporter en PDF 
                        </Button>
                    </div>

                    {/*Loader */}
                    {loading && (
                        <div className="text-center text-blue-600 font-bold">
                            Génération en cours...
                        </div>
                    )}

                    {/*Revision content in mardkwon format => use react-markdown for markdown*/}
                    {
                        !loading && (
                        <Card className="p-8 rounded-xl shadow-md bg-white border border-slate-200">
                            <CardContent className="p-0">
                                <div className="prose prose-slate max-w-none">

                                    {/*TODO : faut que je verif la source en cas d'injection XSS */}
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                        {summary}
                                    </ReactMarkdown>
                                </div>
                            </CardContent>
                        </Card>
                        )
                    }
                </div>
            </main>
        </div>
    );
};

export default Summary;