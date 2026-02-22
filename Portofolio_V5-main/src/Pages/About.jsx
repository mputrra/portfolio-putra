import React, { useEffect, memo, useMemo, useState } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";

// --- Data Structures ---

const ORG_PHOTOS = {
  "hmif-vice": [
    "/gallery/hmif-1.jpeg",
    "/gallery/hmif-2.jpeg",
    "/gallery/hmif-3.jpeg",
    "/gallery/hmif-4.jpeg",
    "/gallery/hmif-5.jpeg",
  ],
  "bem-fst": ["/gallery/bem-1.jpg"],
  "campus-committee": [
    "/gallery/committee-1.jpg",
    "/gallery/committee-2.jpg",
    "/gallery/committee-3.jpg",
  ],
  "hmif-pr": [
    "/gallery/pr-1.jpeg",
    "/gallery/pr-2.jpeg",
    "/gallery/pr-3.jpeg",
    "/gallery/pr-4.jpeg",
    "/gallery/pr-5.jpeg",
    "/gallery/pr-6.jpeg",
    "/gallery/pr-7.jpeg",
  ],
};

const ORG_EXPERIENCES = [
  {
    id: "campus-committee",
    role: "Campus Committee - UAI",
    period: "Aug 2025 - Sep 2025",
    description: "Mentor at New Student Orientation Program (PKKMB).",
  },
  {
    id: "bem-fst",
    role: "BEM FST - UAI",
    period: "Nov 2025 - Dec 2025",
    description: "Mentor division for FST Orientation event.",
  },
  {
    id: "hmif-pr",
    role: "Informatics Student Association (HMIF)",
    period: "Aug 2024 - Feb 2025",
    description: "Public Relations & Advocacy Department.",
  },
  {
    id: "hmif-vice",
    role: "Informatics Student Association (HMIF)",
    period: "Apr 2025 - Feb 2026",
    description: "Vice Chairperson",
  },
];

const COURSEWORK = [
  {
    category: "Data & AI",
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    border: "border-emerald-500/20",
    courses: [
      "Artificial Intelligence & Machine Learning",
      "Applied Statistics",
      "Database & Advanced Database",
      "Data Structures",
    ],
  },
  {
    category: "Development",
    bg: "bg-teal-500/10",
    text: "text-teal-300",
    border: "border-teal-500/20",
    courses: [
      "Cloud Computing",
      "E-commerce & Web Dev",
      "Mobile Programming",
      "Software Engineering",
      "Object Oriented Programming",
    ],
  },
  {
    category: "Security & Sys",
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    border: "border-cyan-500/20",
    courses: [
      "Computer Security",
      "Operating Systems",
      "Computer Networks",
      "Human-Computer Interaction",
    ],
  },
  {
    category: "Management",
    bg: "bg-indigo-500/10",
    text: "text-indigo-300",
    border: "border-indigo-500/20",
    courses: [
      "Technopreneurship",
      "Computer Graphics",
      "Professional Ethics",
    ],
  },
];

// --- Memoized Components ---

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105 border-4 border-white/10 group-hover:border-white/20">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/Photo.png"
            alt="Profile Abdullah Maulana Putra"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div data-aos={animation} data-aos-duration={1300} className="relative group">
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white max-w-[100px] break-words"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-sm uppercase tracking-wider text-gray-300 mb-2"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-400"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
);

const ImageGalleryModal = memo(({ isOpen, onClose, images }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  if (!isOpen || !images || images.length === 0) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 md:left-4 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all backdrop-blur-md border border-white/10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 md:right-4 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all backdrop-blur-md border border-white/10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                      ? "bg-white w-6"
                      : "bg-white/30 hover:bg-white/50"
                      }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const EducationCard = memo(() => {
  const [isCourseworkOpen, setIsCourseworkOpen] = useState(false);

  return (
    <div
      className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 group hover:border-white/20 hover:bg-white/10"
      data-aos="fade-up"
      data-aos-duration="1600"
    >
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsCourseworkOpen(!isCourseworkOpen)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
              Education
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isCourseworkOpen ? "rotate-180" : ""}`}
          />
        </div>

        <div className="flex justify-between items-end">
          <div className="text-left">
            <h4 className="text-lg font-bold text-gray-200">
              Al Azhar University Indonesia
            </h4>
            <p className="text-slate-400 text-sm">
              Bachelor of Computer Science (2023 - 2027) | GPA: 3.40/4.00 | 106 SKS Completed
            </p>
          </div>
        </div>

        <p className="text-xs text-indigo-400 mt-3 font-medium flex items-center gap-1 group-hover:underline">
          <BookOpen className="w-3.5 h-3.5" />
          {isCourseworkOpen ? "Hide Coursework" : "See Relevant Coursework"}
        </p>
      </div>

      <AnimatePresence>
        {isCourseworkOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-6 bg-white/[0.02]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COURSEWORK.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <h5 className={`text-sm font-semibold ${category.text} flex items-center gap-2`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${category.bg.replace('/10', '')}`}></span>
                      {category.category}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {category.courses.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className={`text-[10px] font-medium px-2 py-1 rounded-md border ${category.bg} ${category.text} ${category.border} hover:bg-white/5 transition-colors`}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const AboutPage = () => {
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const projectsCount = 3;
    const certificatesCount = 7;
    const startDate = new Date("2023-08-01");
    const today = new Date();
    let experience = today.getFullYear() - startDate.getFullYear();
    if (
      today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
    ) {
      experience--;
    }
    return {
      totalProjects: projectsCount,
      totalCertificates: certificatesCount,
      YearExperience: experience > 0 ? experience : 1,
    };
  }, []);

  useEffect(() => {
    const initAOS = () => AOS.init({ once: false, offset: 10 });
    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web & data solutions",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: YearExperience + "+",
        label: "Years Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  const handleOpenGallery = (orgId) => {
    if (ORG_PHOTOS[orgId] && ORG_PHOTOS[orgId].length > 0) {
      setSelectedOrgId(orgId);
      setIsGalleryOpen(true);
    }
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Abdullah Maulana Putra
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Saya Putra, mahasiswa Teknik Informatika di Universitas Al Azhar
              Indonesia dengan hasrat mendalam terhadap{" "}
              <span className="text-indigo-400 font-medium">Data Analysis</span>{" "}
              dan <span className="text-purple-400 font-medium">Web Development</span>
              . Saya menggabungkan keahlian teknis dengan kepemimpinan organisasi
              untuk menghadirkan solusi digital yang berdampak nyata.
            </p>

            <div className="grid grid-cols-1 gap-6">
              <EducationCard />

              <div
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-duration="1700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                    Organisational Experience
                  </h3>
                </div>
                <div className="space-y-6">
                  {ORG_EXPERIENCES.map((org, index) => (
                    <div key={org.id}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-200">
                            {org.role}
                          </h4>
                          <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded whitespace-nowrap inline-block mt-1">
                            {org.period}
                          </span>
                        </div>

                        <button
                          onClick={() => handleOpenGallery(org.id)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 hover:text-white transition-all group/btn"
                        >
                          <Camera className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                          View Documentation
                        </button>
                      </div>
                      <p className="text-slate-400 text-sm text-left">
                        {org.description}
                      </p>

                      {index < ORG_EXPERIENCES.length - 1 && (
                        <div className="w-full h-[1px] bg-white/10 mt-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 mt-6">
              <a
                href="/Putra_Universitas Al Azhar Indonesia_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto"
              >
                <button className="w-full lg:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" /> Download CV
                </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
                <button className="w-full lg:w-auto px-8 py-3 rounded-xl border border-indigo-500/30 text-indigo-300 font-medium transition-all duration-300 hover:scale-105 hover:bg-indigo-500/10 flex items-center justify-center gap-2">
                  <Code className="w-5 h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        images={selectedOrgId ? ORG_PHOTOS[selectedOrgId] : []}
      />
    </div>
  );
};

export default memo(AboutPage);