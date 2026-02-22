import React, { useEffect, useState, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
} from "lucide-react";
import Swal from "sweetalert2";

// --- Constants / Data ---

const LOCAL_PROJECTS = [
  {
    id: 1,
    Img: "/mental_health.png",
    Title: "Ruangrasa - Mental Health Tracker App",
    Description:
      "Aplikasi mobile berbasis Flutter yang dirancang untuk membantu pengguna memantau suasana hati dan tingkat kecemasan harian. Dilengkapi fitur jurnal harian, grafik progres kesehatan mental, dan rekomendasi aktivitas meditasi.",
    Link: "https://github.com/mputrra",
    Github: "https://github.com/mputrra",
    TechStack: ["Flutter", "Dart", "Firebase", "GetX"],
    Features: [
      "Daily Mood Tracking",
      "Analytics Dashboard",
      "User Authentication",
      "Daily Journaling",
    ],
  },
  {
    id: 2,
    Img: "/sentiment_ai.png",
    Title: "AI - Sentiment Analysis",
    Description:
      "Platform analisis sentimen berbasis Web & AI yang mampu mengklasifikasikan teks emosi pengguna secara real-time dengan akurasi tinggi menggunakan model Deep Learning yang telah dilatih dengan dataset lokal.",
    Link: "https://github.com/mputrra",
    Github: "https://github.com/mputrra",
    TechStack: ["Python", "TensorFlow", "Flask", "React"],
    Features: [
      "Real-time Text Analysis",
      "Deep Learning Model Integration",
      "Interactive UI",
      "REST API Endpoint",
    ],
  },
  {
    id: 3,
    Img: "/pos_system.png",
    Title: "Taberu Bento - POS System",
    Description:
      "Sistem Point of Sale (Kasir) komprehensif untuk UMKM. Mencakup manajemen inventaris stok bahan baku, pelacakan pesanan real-time, laporan penjualan harian/bulanan, dan manajemen shift karyawan.",
    Link: "https://github.com/mputrra",
    Github: "https://github.com/mputrra",
    TechStack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    Features: [
      "Inventory Management",
      "Transaction Processing",
      "Sales Reporting",
      "Employee Shift Management",
    ],
  },
];

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

// --- Sub-Components ---

const TechBadge = memo(({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
});

const FeatureItem = memo(({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
});

const ProjectStats = memo(({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-2xl overflow-hidden relative border border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-3 rounded-xl border border-blue-500/10 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30">
        <div className="bg-blue-500/20 p-2 rounded-lg">
          <Code2 className="text-blue-300 w-5 h-5" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-lg font-bold text-blue-200">
            {techStackCount}
          </div>
          <div className="text-[10px] uppercase text-gray-400">Tech Stack</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-3 rounded-xl border border-purple-500/10 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30">
        <div className="bg-purple-500/20 p-2 rounded-lg">
          <Layers className="text-purple-300 w-5 h-5" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-lg font-bold text-purple-200">
            {featuresCount}
          </div>
          <div className="text-[10px] uppercase text-gray-400">Key Features</div>
        </div>
      </div>
    </div>
  );
});

// --- Helper Functions ---

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private" || !githubLink) {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Maaf, source code untuk proyek ini bersifat privat.",
      confirmButtonText: "Mengerti",
      confirmButtonColor: "#6366f1",
      background: "#030014",
      color: "#ffffff",
    });
    return false;
  }
  return true;
};

// --- Main Component ---

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedProject = LOCAL_PROJECTS.find((p) => String(p.id) === id);
    if (selectedProject) {
      setProject(selectedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="w-12 h-12 mx-auto border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-0 -right-1/4 w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Back Button */}
          <div className="flex items-center space-x-4 mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
              <span>/</span>
              <span>Projects</span>
              <span>/</span>
              <span className="text-slate-300">{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 leading-tight">
                  {project.Title}
                </h1>
                <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                <p>{project.Description}</p>
              </div>

              <ProjectStats project={project} />

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </div>
                </a>

                <a
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) =>
                    !handleGithubClick(project.Github) && e.preventDefault()
                  }
                  className="flex-1 min-w-[140px] group relative px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Github className="w-5 h-5" />
                    <span>Github</span>
                  </div>
                </a>
              </div>

              {/* Tech Stack List */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.TechStack.map((tech, index) => (
                    <TechBadge key={index} tech={tech} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Image & Feature */}
            <div className="space-y-8 animate-slideInRight">
              {/* Image Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  style={{ minHeight: "400px" }}
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>

              {/* Features Card */}
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6 text-amber-400" />
                  Key Features
                </h3>
                <ul className="space-y-4">
                  {project.Features &&
                    project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectDetails);