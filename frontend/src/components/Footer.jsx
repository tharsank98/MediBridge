import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialMediaLinks = [
    {
      icon: <FacebookIcon />,
      url: "https://www.facebook.com",
      label: "Facebook",
    },
    {
      icon: <TwitterIcon />,
      url: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <InstagramIcon />,
      url: "https://www.instagram.com",
      label: "Instagram",
    },
    {
      icon: <LinkedInIcon />,
      url: "https://www.linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm text-gray-300">
              MediBridge is committed to improving healthcare by connecting
              patients and doctors with the right tools and resources.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300">support@medibridge.com</p>
            <p className="text-sm text-gray-300">+1 234 567 890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start gap-4">
              {socialMediaLinks.map(({ icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-xl text-gray-300 hover:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} MediBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
