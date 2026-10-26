import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Flame, Mountain, Wind, Droplets } from "lucide-react";

const elementConfig = {
    Fogo: {
        color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        icon: Flame,
    },
    Terra: {
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        icon: Mountain,
    },
    Ar: {
        color: "bg-sky-500/10 text-sky-400 border-sky-500/30",
        icon: Wind,
    },
    Água: {
        color: "bg-violet-500/10 text-violet-400 border-violet-500/30",
        icon: Droplets,
    },
};

function formatDate(dateStr) {
    if (!dateStr) return "";
    const [month, day] = dateStr.split("-");
    const months = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ];
    return `${parseInt(day, 10)} DE ${months[parseInt(month, 10) - 1].toUpperCase()}`;
}

export function ZodiacCard({ zodiac }) {
    if (!zodiac) return null;

    const elementInfo = elementConfig[zodiac.element] || {
        color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
        icon: Sparkles,
    };
    const ElementIcon = elementInfo.icon;

    return (
        <Card className="w-full max-w-md mx-auto shadow-2xl border-slate-800/80 bg-slate-900/90 backdrop-blur-md text-slate-100 border-t-4 border-t-purple-500 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            <CardHeader className="pb-3 text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400/80" />
                    <CardTitle className="text-4xl font-black tracking-tight text-white">
                        {zodiac.name}
                    </CardTitle>
                    <Sparkles className="w-5 h-5 text-purple-400/80" />
                </div>
            </CardHeader>
            <CardContent className="space-y-5 text-center pb-6">
                <div className="flex justify-center">
                    <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border shadow-sm ${elementInfo.color}`}
                    >
                        <ElementIcon className="w-4 h-4" />
                        ELEMENTO: {zodiac.element.toUpperCase()}
                    </span>
                </div>

                <div className="text-xs font-bold text-slate-400 tracking-wider">
                    PERÍODO:{" "}
                    <span className="text-slate-200 font-semibold">
                        {formatDate(zodiac.startDate)} A{" "}
                        {formatDate(zodiac.endDate)}
                    </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed pt-4 border-t border-slate-800 italic">
                    "{zodiac.description}"
                </p>
            </CardContent>
        </Card>
    );
}
