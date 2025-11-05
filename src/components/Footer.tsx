import { FaXTwitter } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="border-y border-foreground/30">
      <div className="flex flex-col gap-4 max-w-7xl mx-auto border-x">
        <div className="flex flex-col gap-1 p-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Rohit. All rights reserved.{" "}
          </p>
          <p className="text-sm text-muted-foreground">
            Built for educational purposes. Not affiliated with Netflix. All
            movie data from TMDB.
          </p>
        </div>
      </div>

      <div className="border-t border-foreground/30">
        <div className="flex justify-between  px-4 py-2 mx-auto max-w-7xl border-x">
          <h2 className="text-muted-foreground">
            Design and Developed by{" "}
            <a
              href="https://negativ.in"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-foreground underline underline-offset-4">
                Rohit
              </span>
            </a>
          </h2>

          <div className="flex gap-4 items-center text-foreground/80">
            <a
              href="https://x.com/RohitMehta1409"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="size-4" />
            </a>
            <a
              href="https://github.com/negativ14/watchMV"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TbBrandGithubFilled className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
