import { useState, useEffect } from "react";
import { ZodiacCard } from "./components/ZodiacCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
    const [zodiacs, setZodiacs] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedZodiac, setSelectedZodiac] = useState(null);

    // Busca os dados dos signos no arquivo public/signs.json ao montar o componente
    useEffect(() => {
        fetch("/signs.json")
            .then((response) => response.json())
            .then((data) => setZodiacs(data))
            .catch((error) =>
                console.error("Erro ao carregar dados dos signos:", error),
            );
    }, []);

    // Calcula o signo do zodíaco com base na data informada (MM-DD)
    const handleCalculateZodiac = (e) => {
        e.preventDefault();
        if (!selectedDate || zodiacs.length === 0) return;

        // Extrai o mês e o dia de "AAAA-MM-DD" retornado pelo input de data
        const [, month, day] = selectedDate.split("-");
        const formattedInput = `${month}-${day}`;

        const foundZodiac = zodiacs.find((sign) => {
            const { startDate, endDate } = sign;

            // Caso especial para Capricórnio (22-12 a 19-01) que cruza a virada do ano
            if (startDate > endDate) {
                return formattedInput >= startDate || formattedInput <= endDate;
            }

            return formattedInput >= startDate && formattedInput <= endDate;
        });

        setSelectedZodiac(foundZodiac || null);
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 space-y-6">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Descubra seu Signo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleCalculateZodiac}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="birthdate"
                                className="block text-sm font-medium mb-1"
                            >
                                Data de Nascimento
                            </label>
                            <Input
                                id="birthdate"
                                type="date"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Descobrir Signo
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Renderiza o card do signo quando um signo for encontrado */}
            {selectedZodiac && <ZodiacCard zodiac={selectedZodiac} />}
        </main>
    );
}
