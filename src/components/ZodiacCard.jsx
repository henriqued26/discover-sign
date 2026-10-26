import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ZodiacCard({ zodiac }) {
    if (!zodiac) return null;

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    {zodiac.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
                <div>
                    <span className="font-semibold text-muted-foreground">
                        Elemento:
                    </span>{" "}
                    <span className="text-primary font-medium">
                        {zodiac.element}
                    </span>
                </div>
                <div>
                    <span className="font-semibold text-muted-foreground">
                        Período:
                    </span>{" "}
                    <span>
                        {zodiac.startDate} a {zodiac.endDate}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    {zodiac.description}
                </p>
            </CardContent>
        </Card>
    );
}
