import { Home, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DefaultLayout = ({children} : {children : React.ReactNode}) => {
    const navigation = useNavigate();

    const navigationItems = [
        {id: "dashboard", icon : Home, label: "Dashboard"},
        {id: "upload", icon: Upload, label: "Téléverser"},
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            {/*SideCar */}
            <aside className="w-64 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">StudentMaster IA</span>
                    </div>
                </div>

                {/*Navigation */}
                <nav className="flex-1 p-3 space-y-1">
                    {
                        navigationItems.map((item) => {
                            const Icon = item.icon;
                            
                            return(
                                <button
                                key={item.id}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                onClick={() => navigation("/" + item.id)} 
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0"/>
                                    <span>{item.label}</span>
                                </button>
                            );
                        })
                    }
                </nav>
            </aside>

            {/*Main */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};