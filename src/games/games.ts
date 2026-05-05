export interface GameModule {
    title: string;
    slug: string;
    rules: boolean;
    calculator: boolean;
}

export const games: GameModule[] = [
    {
        title: "Example",
        slug: "example",
        rules: true,
        calculator: true,
    },
];