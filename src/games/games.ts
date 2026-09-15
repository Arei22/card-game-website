export interface GameModule {
    title: string;
    slug: string;
    rules: boolean;
    calculator: boolean;
}

export const games: GameModule[] = [
    {
        title: "Estimation",
        slug: "estimation",
        rules: true,
        calculator: true,
    },
];