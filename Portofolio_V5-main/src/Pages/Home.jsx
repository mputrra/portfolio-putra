import React, { useState, useEffect, useCallback, memo } from "react";
import { Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// --- Constants ---
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Computer Science Student", "Data Analyst", "Web Developer"];
const TECH_STACK = ["Python", "PHP", "JavaScript", "Flutter", "MySQL", "Firebase"];
const SOCIAL_LINKS = [
  { icon: Linkedin, link: "#Portofolio" },
  { icon: Mail, link: "mailto:mputrra274@gmail.com" },
];

// --- Memoized Components ---
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group cursor-pointer">
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-4 py-2 rounded-full bg-slate-950/50 backdrop-blur-xl border border-white/10 ring-1 ring-white/5">
        <span className="relative flex items-center gap-2 text-sm font-medium text-indigo-300 tracking-wide">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Ready to Innovate</span>
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4">
      <span className="block mb-2 text-slate-300">Data Analyst</span>
      <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#d946ef]">
        & Web Developer
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 cursor-default">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px] overflow-hidden rounded-xl bg-indigo-600/10 p-[1px] transition-all duration-300 hover:bg-indigo-600/20 active:scale-95">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center justify-center gap-2 rounded-xl bg-[#030014] py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-transparent">
        {text}
        <Icon
          className={`w-4 h-4 transition-transform duration-300 ${text === "Contact"
            ? "group-hover:translate-x-1"
            : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            }`}
        />
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => {
  const isInternal = link.startsWith("#");

  const handleClick = (e) => {
    if (isInternal) {
      e.preventDefault();
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <a
      href={link}
      target={isInternal ? "_self" : "_blank"}
      rel={isInternal ? "" : "noopener noreferrer"}
      onClick={handleClick}
    >
      <button className="group relative p-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white/20 active:scale-95">
        <Icon className="w-5 h-5 text-slate-400 transition-colors duration-300 group-hover:text-indigo-400" />
      </button>
    </a>
  );
});

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: true, offset: 10, duration: 1000 });
    };
    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div
      className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]"
      id="Home"
    >
      {/* Background Ambience */}
      <div
        className={`absolute -z-10 top-0 left-0 w-full h-screen overflow-hidden transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div
        className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="container mx-auto min-h-screen flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full ga-12 lg:gap-20">
            {/* LEFT CONTENT */}
            <div
              className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1 mt-8 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* TYPING EFFECT */}
                <div
                  className="h-8 flex items-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-xl md:text-2xl font-light text-slate-300/80">
                    I am a{" "}
                    <span className="font-semibold text-indigo-300">{text}</span>
                  </span>
                  <span className="w-[2px] h-6 bg-indigo-400 ml-1 animate-blink"></span>
                </div>

                {/* DESCRIPTION */}
                <p
                  className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Saya Putra, mahasiswa semester enam program studi Teknik Informatika
                  di Universitas Al Azhar Indonesia. Berfokus pada penciptaan solusi
                  digital yang elegan dan analisis data mendalam untuk keputusan
                  strategis.
                </p>

                {/* TECH STACK */}
                <div
                  className="flex flex-wrap gap-3 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* BUTTONS */}
                <div
                  className="flex flex-row gap-4 w-full justify-start pt-4"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="Explore Work"
                    icon={ExternalLink}
                  />
                  <CTAButton href="#Contact" text="Contact Me" icon={Mail} />
                </div>

                {/* SOCIAL LINKS */}
                <div
                  className="hidden sm:flex gap-4 justify-start pt-4"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT ILLUSTRATION */}
            <div
              className="w-full lg:w-1/2 relative flex items-center justify-center order-1 lg:order-2"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full max-w-[500px] aspect-square">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-full blur-[50px] transition-all duration-700 ${isHovering ? "opacity-70 scale-110" : "opacity-30 scale-100"
                    }`}
                ></div>

                {/* Image */}
                <div
                  className={`relative z-10 w-full h-full transition-transform duration-500 hover:scale-105`}
                >
                  <img
                    src="Animation1.gif"
                    alt="Developer Animation"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);