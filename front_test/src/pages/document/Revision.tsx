import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookMarked, Download } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const Revision = () => {
    
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
                                    Fiches de révision
                                </h1>
                                <p className="text-slate-600">Points clés organisés par catégorie</p>
                            </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Exporter en PDF 
                        </Button>
                    </div>

                    {/*Revision content in mardkwon format => use react-markdown for markdown*/}
                    <div className="space-y-6">
                        <Card className="overflow-hidden prose">
                            <ReactMarkdown>
                                blabla
                            </ReactMarkdown>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Revision;