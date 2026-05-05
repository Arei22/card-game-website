import { defineConfig } from "vite";
import { glob } from "glob";

export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist",
        emptyOutDir: true,

        rolldownOptions: {
            input: glob.sync("src/**/*.html"),
        },
    }
});