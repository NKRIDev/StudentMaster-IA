import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft, ArrowRight, Loader, Lock, Mail, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthCard } from "./auths/AuthCard";
import { registerUser } from "@/services/authService";

export const Register = () => {
    const [pseudo, setPseudo] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setPasswordConfirm] = useState<string>("");

    const [isLoading, setLoading] = useState<boolean>(false);

    const {toast} = useToast();
    const navigate = useNavigate();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();

        /*
        Passwords checked
        */
        if(password !== confirmPassword){
            toast({
                title: "Erreur",
                description: "Les mots de passe ne correspondent pas.",
                variant: "destructive"
            });
            
            return;
        }

        setLoading(true);

        /*
        Send register data to server
        */
        const result = await registerUser({
            pseudo, email, password, confirmPassword
        });

        if(result.error){
            toast({
                title: "Erreur",
                description: result.error,
                variant: "destructive"
            });
        }
        else{
            toast({
                title: "Succès",
                description: result.message,
                variant: "success"
            });

            navigate("/login");
        }

        setLoading(false);
    };

    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3">
                <div className="flex justify-start items-center space-x-2 text-sm">
                    <ArrowLeft className="w-4 h-4 text-sm" />
                    <Link to="/" className="hover:underline">Retour à l’accueil</Link>
                </div>

                <AuthCard
                    title="Créer un compte"
                    description="Commencez votre parcours d'apprentissage avec l'IA"
                    footer={
                        <div className="text-sm text-center text-slate-600">
                            Vous avez déjà un compte ?{" "}
                            <Link 
                            to="/login" 
                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                            >
                                Se connecter
                            </Link>
                        </div>
                    }
                >

                    {/**Form: card content */}
                    <form className="space-y-4" onSubmit={handleRegister}>

                            {/*Pseudo */}
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-700">Pseudo</Label>

                                <div className="relative">
                                    <User className="absolute left-3 top-2 h-5 w-5 text-slate-400"/>
                                    <Input 
                                        type="text" 
                                        placeholder="Votre pseudo" 
                                        className="pl-10"
                                        value={pseudo}
                                        onChange={(e) => setPseudo(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/*Email */}
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-700">Email</Label>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-2 h-5 w-5 text-slate-400"/>
                                    <Input 
                                        type="email" 
                                        placeholder="votre@mail.com" 
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>                  
                            
                            {/*Password */}
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-700">Mot de passe</Label>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-2 h-5 w-5 text-slate-400"/>
                                    <Input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="pl-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/*Confirm password */}
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-700">Confirmer le mot de passe</Label>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-2 h-5 w-5 text-slate-400"/>
                                    <Input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="pl-10"
                                        value={confirmPassword}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/*Connect button */}
                            {
                                isLoading ? (
                                    <Button 
                                        disabled={true}
                                        className="w-full h-12 text-base"
                                        variant="default"
                                        size="lg"
                                    >
                                        <div className="flex items-center gap-2">
                                            Chargement
                                            <Loader className="w-4 h-4 animate-spin" />
                                        </div>
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit"
                                        className="w-full h-12 text-base"
                                        variant="default"
                                        size="lg"
                                    >
                                        <div className="flex items-center gap-2">
                                            Créer mon compte
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Button>
                                )
                            }
                            
                            {/*Separator */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-500">Ou s'inscrire avec</span>
                                </div>
                            </div>
                            
                            {/*Social button */}
                            <div className="grid grid-cols-1">
                                <Button disabled={isLoading} variant="outline" type="button" className="h-12">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Google
                                </Button>
                                {/**TODO: other link ? */}
                            </div>
                        </form>
                </AuthCard>
            </div>
        </div>
    );
};