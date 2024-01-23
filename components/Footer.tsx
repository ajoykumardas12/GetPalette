import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <>
      <Separator className="mt-auto" />
      <footer className="bg-light p-8 text-center text-sm">
        <div>
          Built by{" "}
          <HoverCard>
            <HoverCardTrigger asChild>
              <button>Ajoy Kumar Das</button>
            </HoverCardTrigger>
            <HoverCardContent className="flex h-max w-max justify-center gap-2 bg-[#442f80]">
              <Avatar>
                <AvatarImage src="https://github.com/ajoykumardas12.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="text-left text-sm">
                <div className="text-white">Front-end Developer</div>
                <a
                  href="https://ajoykumardas.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mid underline"
                >
                  Portfolio
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>
          . Source code available on{" "}
          <a
            href="https://github.com/ajoykumardas12/get-palette"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mid underline"
            title="GitHub Repository"
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
