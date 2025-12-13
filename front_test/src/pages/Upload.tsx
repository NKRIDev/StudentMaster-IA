import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CircleX, Loader2, UploadIcon } from "lucide-react";
import { useState } from "react";
import { File as FileIcon } from "lucide-react";
import { uploadFile } from "@/services/uploadService";
import { useNavigate } from "react-router-dom";
import { useDocument } from "@/contexts/DocumentContext";
import { useToast } from "@/hooks/use-toast";

/**
 * Page that manages file uploads
 */
const Upload = () => {
    const navigate = useNavigate();

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isError, setError] = useState<string>("");

    const {changeDocument} = useDocument();
    const {toast} = useToast();

    /*
    Manage darg and drop system
    */
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = (e : React.DragEvent) => {
        setIsDragging(false);
    }

    const handleDrop = (e : React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if(files.length > 0){
            handleFile(files[0]);
        }
    }

    /**
     * Manage files
     */
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if(files && files.length > 0){
            handleFile(files[0]);
        }
    }

    const handleFile = async (file : File) => {
        setUploadedFile(file);
        setIsProcessing(true);

        try{
            const response = await uploadFile(file);
            const generatedDocument = response.data;

            /*
            Apply new datas elements
            */
            changeDocument(generatedDocument);

            setIsProcessing(false);
            setIsComplete(true);
            
            toast({
                title: "Félicitations 🎉",
                description: "Contenus générés avec succès.",
                variant: "success"
            });
        }
        catch(error){
            console.error(error);
            setIsProcessing(false);
            toast({title: "Erreur",
                   description: error.response.data.error, 
                   variant:"destructive"
                });
            setError(error.response.data.error);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <main className="flex-1 overflow-y-auto">


                <div className="p-8 max-w-4xl mx-auto">
                    <div className="p-8 max-w-4xl mx-auto">
                        {/*Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                Téléverser un document
                            </h1>

                            <p className="text-slate-600">
                                Importez vos cours et laisser l'IA générer vos outils d'apprentissage.
                            </p>
                        </div>

                        {/*Upload Card*/}
                        <Card>
                            {/*Header Card */}
                            <CardHeader>
                                <CardTitle>UPLOAD un fichier</CardTitle>

                                <CardDescription>
                                    Formats supportés : PDF, TXT, DOCX, MD, PPTX
                                </CardDescription>
                            </CardHeader>


                            {/*Card Content */}
                            <CardContent>
                                {!uploadedFile && (
                                    <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                                        isDragging 
                                        ? "border-blue-500 bg-blue-50" 
                                        : "border-slate-300 hover:border-slate-400"
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                                <UploadIcon className="w-8 h-8 text-blue-600"/>
                                            </div>
                                            
                                            <div>
                                                <p className="text-lg font-medium text-slate-900 mb-1">
                                                    Glissez votre fichier ici
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    ou cliquez pour Parcourir
                                                </p>
                                            </div>
                                            
                                            <input
                                            type="file"
                                            id="file-upload"
                                            className="hidden"
                                            accept=".pdf,.docx,.txt,.ppt,.pptx"
                                            onChange={handleFileInput}
                                            />
                                            
                                            <Button asChild>
                                                <label htmlFor="file-upload" className="cursor-pointer">
                                                    Parcourir les fichiers
                                                </label>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                
                                {uploadedFile && (
                                    <div className="space-y-6">
                                        {/* File Info */}
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <FileIcon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            
                                            <div className="flex-1">
                                                <p className="font-medium text-slate-900">{uploadedFile.name}</p>
                                                <p className="text-sm text-slate-500">
                                                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                            
                                            {isComplete && (
                                                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                            )}
                                            </div>
                                            
                                            {/* Processing Status */}
                                            {isProcessing && (
                                                <div className="flex items-center justify-center gap-3 p-6 bg-blue-50 rounded-lg">
                                                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                                    <p className="text-sm font-medium text-blue-900">
                                                        Traitement en cours... L'IA analyse votre Document
                                                    </p>
                                                </div>
                                            )}

                                            {/* Success State */}
                                            {isError && (
                                                <div className="space-y-4">
                                                    <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                                                        <div className="flex items-start gap-3">
                                                            <CircleX className="w-6 h-6 text-red-600 mt-0.5" />
                                                            <div>
                                                                <h3 className="font-semibold text-red-900 mb-1">
                                                                    Une erreur est survenue lors du traitement du document.
                                                                </h3>
                                                                <div className="text-sm text-red-700 mb-4">
                                                                    <p>L'IA n'a pas pu générer les éléments attendus. Veuillez réessayer.</p>
                                                                    <p>Cause : {isError}</p>
                                                                </div>

                                                                <div className="flex gap-2">
                                                                <Button 
                                                                size="sm"
                                                                onClick={() => navigate("/dashboard")}
                                                                >
                                                                    Retour au dashboard
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                                <Button 
                                                variant="outline" 
                                                className="w-full"
                                                onClick={() => {
                                                    setUploadedFile(null)
                                                    setIsComplete(false)
                                                }}
                                                >
                                                    Essayer de téléverser un autre Document
                                                </Button>
                                                </div>
                                            )}
                                            
                                            {/* Success State */}
                                            {isComplete && (
                                                <div className="space-y-4">
                                                    <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                                                        <div className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" />
                                                            <div>
                                                                <h3 className="font-semibold text-emerald-900 mb-1">
                                                                    Document traité avec succès !
                                                                </h3>
                                                                <p className="text-sm text-emerald-700 mb-4">
                                                                    L'IA a généré vos résumés, fiches de révision, flashcards et quiz.
                                                                </p>
                                                        
                                                            <div className="flex gap-2">
                                                                <Button 
                                                                size="sm"
                                                                onClick={() => navigate("/document")}
                                                                >
                                                                    Voir les outils générés
                                                                </Button>
                                                                
                                                                <Button 
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => navigate("/dashboard")}
                                                                >
                                                                    Retour au dashboard
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                                <Button 
                                                variant="outline" 
                                                className="w-full"
                                                onClick={() => {
                                                    setUploadedFile(null)
                                                    setIsComplete(false)
                                                }}
                                                >
                                                    Téléverser un autre Document
                                                </Button>
                                                </div>
                                            )}
                                    </div>
                                )}
                                </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default Upload;