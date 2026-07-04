import { AudioWaveform } from "lucide-react";
import { Link } from "react-router-dom";

type LogoProps = {
  url?: string;
  asLink?: boolean;
};

const Logo = ({ url = "/", asLink = true }: LogoProps) => {
  const icon = (
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <AudioWaveform className="size-4" />
    </div>
  );

  if (!asLink) {
    return <div className="flex items-center justify-center sm:justify-start">{icon}</div>;
  }

  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>{icon}</Link>
    </div>
  );
};

export default Logo;
