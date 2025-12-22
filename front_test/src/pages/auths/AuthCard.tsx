import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
    title: string,
    description: string,
    footer?: React.ReactNode;
    children: React.ReactNode;
};

/*
Cards to authenticate users
*/
export const AuthCard = ({title, description, footer, children} : AuthCardProps) => {
    return (
        <Card className="border-slate-200 shadow-xl">
            {/*Card header */}
            <CardHeader className="flex items-center">
                <CardTitle className="text-2xl font-bold text-slate-900">{title}</CardTitle>
                <CardDescription className="text-slate-600">{description}</CardDescription>
            </CardHeader>

            {/**Card content */}
            <CardContent>
                {children}
            </CardContent>

            {/**Card footer, if footer exist*/}
            {
                footer && (
                    <CardFooter  className="flex flex-col space-y-4">
                        {footer}
                    </CardFooter>
                )
            }
        </Card>
    );
};