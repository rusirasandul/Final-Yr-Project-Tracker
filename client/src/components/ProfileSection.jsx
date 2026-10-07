import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, GraduationCap, BookOpen, ExternalLink, Edit3, 
  Save, Check, ChevronDown, ChevronUp, Globe, Sparkles 
} from 'lucide-react';

export default function ProfileSection({ apiBaseUrl }) {
  const [profile, setProfile] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    university: '',
    department: '',
    programme: '',
    academicYear: '',
    projectTitle: '',
    supervisorName: '',
    supervisorEmail: '',
    githubProfile: '',
    overleafProject: '',
    blackboardUrl: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/profile`);
      if (res.data) {
        setProfile(res.data);
      }
    } catch (err) {
      console.error('Failed to load user profile:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put(`${apiBaseUrl}/api/profile`, profile);
      setProfile(res.data);
      setSavedSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save profile:', err);
      alert('Error saving profile. Please check connection.');
    } finally {
      setSaving(false);
    }
  };

  const hasProfileData = profile.fullName || profile.projectTitle || profile.studentId;

  return (
    <div className="bg-gradient-to-r from-slate-900/90 via-slate-900 to-indigo-950/40 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-md mb-8 transition-all duration-300">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-bold text-lg">
            {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {profile.fullName || 'Student Researcher Profile'}
              </h2>
              {profile.studentId && (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  ID: {profile.studentId}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <span className="text-slate-300 font-medium">{profile.projectTitle || 'Final Year Research Project'}</span>
              {profile.supervisorName && (
                <>
                  <span className="text-slate-600">•</span>
                  <span>Supervisor: <span className="text-slate-300">{profile.supervisorName}</span></span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg animate-pulse">
              <Check className="w-3.5 h-3.5" /> Saved to DB
            </span>
          )}

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              if (!isExpanded) setIsExpanded(true);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            {isEditing ? 'Cancel Edit' : 'Edit My Details'}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title={isExpanded ? 'Collapse' : 'Expand Details'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Access Workspace Links */}
      {(profile.githubProfile || profile.overleafProject || profile.blackboardUrl) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 text-xs font-medium mr-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-indigo-400" /> Quick Portals:
          </span>
          {profile.githubProfile && (
            <a
              href={profile.githubProfile.startsWith('http') ? profile.githubProfile : `https://${profile.githubProfile}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-purple-300 border border-purple-500/30 transition hover:scale-105"
            >
              <ExternalLink className="w-3 h-3" /> GitHub Repository
            </a>
          )}
          {profile.overleafProject && (
            <a
              href={profile.overleafProject.startsWith('http') ? profile.overleafProject : `https://${profile.overleafProject}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 transition hover:scale-105"
            >
              <ExternalLink className="w-3 h-3" /> Overleaf LaTeX Workspace
            </a>
          )}
          {profile.blackboardUrl && (
            <a
              href={profile.blackboardUrl.startsWith('http') ? profile.blackboardUrl : `https://${profile.blackboardUrl}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition hover:scale-105"
            >
              <ExternalLink className="w-3 h-3" /> Blackboard Portal
            </a>
          )}
        </div>
      )}

      {/* Expanded View / Edit View */}
      {isExpanded && (
        <div className="mt-5 pt-5 border-t border-slate-800 transition-all duration-300">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Edit Personal & Project Credentials (Saved in DB)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Student / Registration ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={profile.studentId}
                    onChange={handleChange}
                    placeholder="e.g. 23001842"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Institutional Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="student@university.ac.uk"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">University / Institute</label>
                  <input
                    type="text"
                    name="university"
                    value={profile.university}
                    onChange={handleChange}
                    placeholder="University of Leicester"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Programme / Degree</label>
                  <input
                    type="text"
                    name="programme"
                    value={profile.programme}
                    onChange={handleChange}
                    placeholder="BSc / BEng Computer Science"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Academic Year / Cohort</label>
                  <input
                    type="text"
                    name="academicYear"
                    value={profile.academicYear}
                    onChange={handleChange}
                    placeholder="2026/2027"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-slate-400 mb-1">Final Year Project Title</label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={profile.projectTitle}
                    onChange={handleChange}
                    placeholder="Deep Learning Pipeline for Automated Evaluation of..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Primary Supervisor Name</label>
                  <input
                    type="text"
                    name="supervisorName"
                    value={profile.supervisorName}
                    onChange={handleChange}
                    placeholder="Dr. Alan Turing"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Supervisor Email</label>
                  <input
                    type="email"
                    name="supervisorEmail"
                    value={profile.supervisorEmail}
                    onChange={handleChange}
                    placeholder="supervisor@university.ac.uk"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Contact Phone (Optional)</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="+44 7123 456789"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">GitHub Project / Profile URL</label>
                  <input
                    type="text"
                    name="githubProfile"
                    value={profile.githubProfile}
                    onChange={handleChange}
                    placeholder="https://github.com/your-username/fyp-repo"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Overleaf LaTeX Project URL</label>
                  <input
                    type="text"
                    name="overleafProject"
                    value={profile.overleafProject}
                    onChange={handleChange}
                    placeholder="https://www.overleaf.com/project/..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Blackboard Portal URL</label>
                  <input
                    type="text"
                    name="blackboardUrl"
                    value={profile.blackboardUrl}
                    onChange={handleChange}
                    placeholder="https://blackboard.university.ac.uk"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'Saving to Database...' : 'Save Details to Database'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <h4 className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <GraduationCap className="w-4 h-4 text-indigo-400" /> Academic Affiliation
                </h4>
                <p className="text-slate-400">University: <span className="text-slate-200 font-medium">{profile.university || 'Not set'}</span></p>
                <p className="text-slate-400">Programme: <span className="text-slate-200 font-medium">{profile.programme || 'Not set'}</span></p>
                <p className="text-slate-400">Cohort Year: <span className="text-slate-200 font-medium">{profile.academicYear || 'Not set'}</span></p>
                <p className="text-slate-400">Student ID: <span className="text-indigo-300 font-mono font-medium">{profile.studentId || 'Not set'}</span></p>
              </div>

              <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <h4 className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <BookOpen className="w-4 h-4 text-cyan-400" /> Supervision & Guidance
                </h4>
                <p className="text-slate-400">Supervisor: <span className="text-slate-200 font-medium">{profile.supervisorName || 'Not set'}</span></p>
                <p className="text-slate-400">Email: <span className="text-slate-200 font-mono">{profile.supervisorEmail || 'Not set'}</span></p>
                <p className="text-slate-400">Student Email: <span className="text-slate-200 font-mono">{profile.email || 'Not set'}</span></p>
                <p className="text-slate-400">Phone: <span className="text-slate-200">{profile.phone || 'Not set'}</span></p>
              </div>

              <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <h4 className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Globe className="w-4 h-4 text-emerald-400" /> Online Research Hubs
                </h4>
                <p className="truncate text-slate-400">
                  GitHub: {profile.githubProfile ? (
                    <a href={profile.githubProfile} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">{profile.githubProfile}</a>
                  ) : <span className="text-slate-500">Not set</span>}
                </p>
                <p className="truncate text-slate-400">
                  Overleaf: {profile.overleafProject ? (
                    <a href={profile.overleafProject} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{profile.overleafProject}</a>
                  ) : <span className="text-slate-500">Not set</span>}
                </p>
                <p className="truncate text-slate-400">
                  Blackboard: {profile.blackboardUrl ? (
                    <a href={profile.blackboardUrl} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">{profile.blackboardUrl}</a>
                  ) : <span className="text-slate-500">Not set</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
