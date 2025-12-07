import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return(
        <div className="p-8 max-w-7xl mx-auto">
            {/*Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-3">Bienvenue sur StudentMaster IA 👋</h1>
                <p className="text-lg text-slate-600">Transformez vos documents en outils d'apprentissage intelligents</p>
            </div>

            {/*Quick actions : send document */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Actions rapides</h2>
                
                <Card 
                className="bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/upload")}
                >
                
                    <CardContent className="p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <Upload className="w-8 h-8 text-white"/>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Téléverser un nouveau document</h3>
                                    <p className="text-blue-100">Importez un PDF, TXT, DOCX, MD ou PPTX pour commencer</p>
                                </div>
                            </div>
                            <ArrowRight className="w-8 h-8"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;