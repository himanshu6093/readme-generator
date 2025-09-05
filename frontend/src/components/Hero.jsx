import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const [repoUrl, setRepoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    async function handleGenerate() {
        setError(null);
        if (!repoUrl.trim()) {
            setError("Please enter a GitHub repo URL.");
            return;
        }
        setLoading(true);
        try {
            const resp = await axios.post("http://localhost:3000/summary", { repoUrl });
            // backend might return { readme, sections } or directly the sections object
            const data = resp.data.sections ?? resp.data;
            // pass the generated data via React Router state
            navigate("/content", { state: { repoUrl, data } });
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.error || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }


    return (

        <section id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-200 via-black to-gray-100">
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Generate Perfect
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent block">
                        README Files
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-white mb-20 max-w-3xl mx-auto leading-relaxed">
                    Automatically create professional, comprehensive README.md files for
                    any GitHub repository using AI-powered content generation and GitHub
                    API integration.
                </p>
                <div className="flex flex-col justify-between gap-4 ">
                    <input
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        type="text"
                        placeholder="Enter repo link..."
                        className="px-4 py-2 rounded-lg border-2 border-transparent bg-white text-gray-800 "
                    />


                    <button
                        onClick={handleGenerate}
                        disabled={loading} 
                        className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-medium rounded-lg shadow-md hover:from-emerald-500 hover:to-cyan-500 transition-colors duration-300"
                    >
                        {loading? "Generating..." : "Generate Readme File"}

                       
                    </button>
                     {error && <div className="text-red-400 mt-2">{error}</div>}
                </div>


            </div >

        </section >
    );
};

export default Hero;
