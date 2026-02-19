import { Package2 } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="w-full flex flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row md:py-0 px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Package2 className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg">DocSearch+</span>
        </div>

        <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
          Built by{" "}
          <a
            href="https://github.com/triptishakya-dev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            Tripti Shakya
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/triptishakya-dev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
