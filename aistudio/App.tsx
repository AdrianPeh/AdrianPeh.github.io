
import React, { useState, useMemo } from 'react';
import SkillGraph from './components/SkillGraph';
import { 
  EXPERIENCES, 
  CERTIFICATIONS, 
  EDUCATIONS, 
  SKILLS_LIST 
} from './constants';
import { NodeType } from './types';

const App: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const filteredExperiences = useMemo(() => {
    if (!activeNodeId) return EXPERIENCES;
    // If a skill is clicked, show related experiences
    if (SKILLS_LIST.includes(activeNodeId)) {
      return EXPERIENCES.filter(e => e.skills.includes(activeNodeId));
    }
    // If an experience is clicked, just show that one
    const expMatch = EXPERIENCES.find(e => e.company === activeNodeId);
    return expMatch ? [expMatch] : EXPERIENCES;
  }, [activeNodeId]);

  const filteredCertifications = useMemo(() => {
    if (!activeNodeId) return CERTIFICATIONS;
    if (SKILLS_LIST.includes(activeNodeId)) {
      return CERTIFICATIONS.filter(c => c.skills.includes(activeNodeId));
    }
    const certMatch = CERTIFICATIONS.find(c => c.name === activeNodeId);
    return certMatch ? [certMatch] : CERTIFICATIONS;
  }, [activeNodeId]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Adrian Peh</h1>
              <p className="text-slate-500 font-medium">Solutions Architect & Team Lead</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <a href="mailto:adrianpehzl@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <i className="fas fa-envelope text-blue-500"></i> adrianpehzl@gmail.com
              </a>
              <a href="tel:+6590117078" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <i className="fas fa-phone text-blue-500"></i> +65 9011 7078
              </a>
              <a href="https://linkedin.com/in/adrian-peh" target="_blank" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <i className="fab fa-linkedin text-blue-500"></i> linkedin.com/in/adrian-peh
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Summary */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-user-circle text-blue-500"></i> Summary
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            Experienced in client-facing operations and automation solutions across multiple industries. 
            Skilled in Business Process Digitalization, Optimization, and Automation, with hands-on expertise 
            in RPA, Power Platform, and software development. Proven ability to select and lead cross-functional 
            teams, design end-to-end solutions, and support technical execution while driving stakeholder success.
          </p>
        </section>

        {/* Visual Graph Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <i className="fas fa-project-diagram text-blue-500"></i> Skill Relationship Graph
            </h2>
            {activeNodeId && (
              <button 
                onClick={() => setActiveNodeId(null)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-full transition-all"
              >
                Clear Selection
              </button>
            )}
          </div>
          <SkillGraph activeNodeId={activeNodeId} onNodeClick={setActiveNodeId} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Experience Column */}
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Professional Experience</h2>
              <div className="space-y-6">
                {filteredExperiences.map((exp, idx) => (
                  <div key={idx} className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ${activeNodeId === exp.company ? 'ring-2 ring-blue-500' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                        <p className="text-blue-600 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-slate-400 bg-slate-50 px-3 py-1 rounded-full font-medium">{exp.period}</span>
                    </div>
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-slate-600 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span 
                          key={skill}
                          onClick={() => setActiveNodeId(skill)}
                          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md cursor-pointer transition-colors ${activeNodeId === skill ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column: Certs and Education */}
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Certifications</h2>
              <div className="space-y-3">
                {filteredCertifications.map((cert, idx) => (
                  <div key={idx} className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ${activeNodeId === cert.name ? 'ring-2 ring-emerald-500' : ''}`}>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{cert.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{cert.issuer}</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map(s => (
                        <span 
                          key={s} 
                          onClick={() => setActiveNodeId(s)}
                          className={`text-[9px] px-1.5 py-0.5 rounded cursor-pointer ${activeNodeId === s ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Education</h2>
              <div className="space-y-4">
                {EDUCATIONS.map((edu, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-blue-600 font-bold mb-1">{edu.period}</p>
                    <h4 className="font-bold text-sm text-slate-900">{edu.degree}</h4>
                    <p className="text-xs text-slate-500">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      
      {/* Floating Action Hint */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-3 animate-bounce">
          <i className="fas fa-mouse-pointer"></i>
          Explore Adrian's career by interacting with the graph
        </div>
      </div>
    </div>
  );
};

export default App;
