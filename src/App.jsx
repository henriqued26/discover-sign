import { useState, useEffect } from "react";
import { ZodiacCard } from "./components/ZodiacCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Compass } from "lucide-react";

export default function App() {
    const [zodiacs, setZodiacs] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedZodiac, setSelectedZodiac] = useState(null);

    useEffect(() => {
        fetch("/signs.json")
            .then((response) => response.json())
            .then((data) => setZodiacs(data))
            .catch((error) =>
                console.error("Erro ao carregar dados dos signos:", error),
            );
    }, []);

    const handleCalculateZodiac = (e) => {
        e.preventDefault();
        if (!selectedDate || zodiacs.length === 0) return;

        const [, month, day] = selectedDate.split("-");
        const formattedInput = `${month}-${day}`;

        const foundZodiac = zodiacs.find((sign) => {
            const { startDate, endDate } = sign;

            if (startDate > endDate) {
                return formattedInput >= startDate || formattedInput <= endDate;
            }

            return formattedInput >= startDate && formattedInput <= endDate;
        });

        setSelectedZodiac(foundZodiac || null);
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 space-y-8 from-slate-900 via-purple-950/30 to-slate-950">
            <Card className="w-full max-w-md shadow-2xl border-slate-800/80 bg-slate-900/90 backdrop-blur-md text-slate-100">
                <CardHeader className="text-center space-y-3 pb-4">
                    <div className="mx-auto bg-purple-500/10 w-14 h-14 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-inner">
                        <Compass className="w-7 h-7 text-purple-400 animate-pulse" />
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight text-white">
                        Descubra seu Signo
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-sm leading-relaxed px-2">
                        Informe sua data de nascimento para revelar as
                        características e energias do seu signo zodiacal.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                    <form
                        onSubmit={handleCalculateZodiac}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="birthdate"
                                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
                            >
                                Data de Nascimento
                            </label>
                            <Input
                                id="birthdate"
                                type="date"
                                lang="pt-BR"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                required
                                className="bg-slate-950/80 border-slate-700/80 text-white h-12 text-base focus-visible:ring-purple-500 rounded-xl"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 font-bold text-base bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-900/40 rounded-xl"
                        >
                            Descobrir Signo
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {selectedZodiac && <ZodiacCard zodiac={selectedZodiac} />}
        </main>
    );
}
