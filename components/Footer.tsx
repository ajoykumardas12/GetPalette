import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Footer = () => {
  return (
    <footer className="p-8 text-center text-sm bg-light">
      <div>
        Built by{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <button>Ajoy Kumar Das</button>
          </HoverCardTrigger>
          <HoverCardContent className="w-max h-max flex justify-center gap-2 bg-[#442f80]">
            <Avatar>
              <AvatarImage src="https://github.com/ajoykumardas12.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="text-sm text-left">
              <div className="text-white">Front-end Developer</div>
              <a
                href="https://ajoykumardas.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-mid"
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
          className="underline text-mid"
          title="GitHub Repository"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
