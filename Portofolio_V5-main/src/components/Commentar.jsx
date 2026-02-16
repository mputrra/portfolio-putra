import React, { useEffect } from 'react';
import { MessageCircle, UserCircle2 } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

const Komentar = () => {
    useEffect(() => {
        AOS.init({ once: false, duration: 1000 });
    }, []);

    return (
        <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl backdrop-blur-xl shadow-xl" data-aos="fade-up" data-aos-duration="1000">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20">
                        <MessageCircle className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Comments <span className="text-indigo-400">(0)</span>
                    </h3>
                </div>
            </div>
            <div className="p-6 space-y-6">
                <div className="text-center py-8" data-aos="fade-in">
                    <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
                    <p className="text-gray-400">Fitur komentar dinonaktifkan pada versi portofolio lokal ini.</p>
                </div>
            </div>
        </div>
    );
};

export default Komentar;