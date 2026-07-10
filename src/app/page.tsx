"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GithubHeatmap } from "@/components/GithubHeatmap";
import { LeetcodeStats } from "@/components/LeetcodeStats";

export default function Home() {
  const [theme, setTheme] = useState<string>("dark");
  const [typedName, setTypedName] = useState("");
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
    }

    // Typewriter effect
    const nameText = "Ritesh Patel";
    let i = 0;
    
    // Initial delay
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < nameText.length) {
          setTypedName((prev) => prev + nameText.charAt(i));
          i++;
        } else {
          clearInterval(interval);
          setShowShadow(true);
          setTimeout(() => setShowShadow(false), 1000);
        }
      }, 120);
      return () => clearInterval(interval);
    }, 600);

    return () => clearTimeout(startDelay);
  }, []);

  const handleThemeToggle = () => {
    if (theme === "dark") {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <div className="card">
      <div className="top-section">
        <div className="left-top">
          <h2 style={{ display: "flex", alignItems: "center" }}>
            Hii People
            <Image src="/hand.gif" alt="Hand waving" width={28} height={28} style={{ marginLeft: "8px" }} unoptimized />
          </h2>
        </div>
        <div className="right-top">
          <label className="switch theme-toggle-button" id="theme-toggle">
            <input 
              checked={theme === "light"} 
              onChange={handleThemeToggle} 
              id="checkbox" 
              type="checkbox" 
            />
            <span className="slider">
              <div className="star star_1"></div>
              <div className="star star_2"></div>
              <div className="star star_3"></div>
              <svg viewBox="0 0 16 16" className="cloud_1 cloud">
                <path
                  transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                  fill="#fff"
                  d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                ></path>
              </svg>
            </span>
          </label>
        </div>
      </div>

      <div className="main-content">
        <div className="my-img">
          <Image src="/dp.jpg" alt="Ritesh Patel" width={140} height={150} style={{ borderRadius: "12px", objectFit: "cover" }} priority />
        </div>
        <div className="text-content">
          <div className="heading">
            <h1 
              id="name" 
              style={{ 
                opacity: 1, 
                transition: "text-shadow 0.6s ease",
                textShadow: showShadow ? "0 0 12px var(--heading-color)" : "none" 
              }}
            >
              {typedName}
            </h1>
          </div>
          <div className="bio">
            <p>MCA Grad <span style={{ color: "red" }}>||</span> Associate Web Developer</p>
          </div>
          <div className="bio-text">
            Associate Web Developer building scalable web applications while pursuing an online MCA from Chandigarh University. Strong foundation in Data Structures and Algorithms with competitive coding experience, focused on writing clean code, solving complex problems, and continuously improving as an engineer.
          </div>
          <div className="location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Lucknow, Uttar Pradesh</span>
          </div>
          <div className="resume social-links">
            <a href="/ritesh_resume.pdf" target="_blank" rel="noopener noreferrer">
              <svg width="30" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" strokeWidth="2"></path>
                <path d="M5 12V5a2 2 0 0 1 2 -2h7l5 5v4" strokeWidth="2"></path>
                <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3H5v6" strokeWidth="2"></path>
                <path d="M17 18h2" strokeWidth="2"></path>
                <path d="M20 15h-3v6" strokeWidth="2"></path>
                <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" strokeWidth="2"></path>
              </svg>
            </a>
            <p>Resume</p>
          </div>
          <div className="social-links">
            <a href="https://wa.me/919120315908?text=Hey%20Ritesh!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20chat!" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 21 1.65 -3.8a9 9 0 1 1 3.4 2.9L3 21" strokeWidth="2"></path>
                <path d="M9 10a0.5 0.5 0 0 0 1 0V9a0.5 0.5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 0.5 0 0 0 0 -1h-1a0.5 0.5 0 0 0 0 1" strokeWidth="2"></path>
              </svg>
            </a>
            <a href="https://x.com/_riteshh" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="https://t.me/sshivam_0" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 10 -4 4 6 6 4 -16 -18 7 4 2 2 6 3 -4"></path>
              </svg>
            </a>
            <a href="mailto:riteshapplication@gmail.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="https://github.com/riteshh01" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/ritesh-patel-profile/" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="education">
        <h2>Education</h2>
        <div className="education-entry">
          <Image src="/college2.png" alt="Chandigarh University" width={40} height={40} className="education-logo" />
          <div className="education-details">
            <strong>Master of Computer Applications</strong>
            <p>Chandigarh University</p>
          </div>
          <div className="education-year-tag">8.34 SGPA</div>
          <div className="education-year-tag">2025 - 2027</div>
        </div>
        <div className="education-entry">
          <Image src="/college1.png" alt="Babu Banarasi Das University" width={40} height={40} className="education-logo" />
          <div className="education-details">
            <strong>Bachelor of Computer Applications</strong>
            <p>Babu Banarasi Das University</p>
          </div>
          <div className="education-year-tag">8.58 CGPA</div>
          <div className="education-year-tag">2022 - 2025</div>
        </div>
      </div>

      <div className="skills">
        <h2>Skills</h2>
        <div className="skills-list">
          <span className="skill-tag">C/C++</span>
          <span className="skill-tag">Memory Management in C++</span>
          <span className="skill-tag">Java</span>
          <span className="skill-tag">Data Structures & Algorithms</span>
          <span className="skill-tag">DBMS</span>
          <span className="skill-tag">MySql</span>
          <span className="skill-tag">Operating System</span>
          <span className="skill-tag">Computer Networks</span>
          <span className="skill-tag">HTML\CSS</span>
          <span className="skill-tag">Javascript</span>
          <span className="skill-tag">Node Js</span>
          <span className="skill-tag">Express Js</span>
          <span className="skill-tag">React</span>
          <span className="skill-tag">Mongo DB</span>
          <span className="skill-tag">n8n</span>
          <span className="skill-tag">Gen AI</span>
          <span className="skill-tag">Vectors</span>
        </div>
      </div>

      <div className="experience">
        <h2>Experience</h2>
        <div className="experience-entry">
          <Image src="/easylauncher_logo.jpeg" alt="Company Logo" width={70} height={40} className="experience-logo" />
          <div className="experience-details">
            <strong>Associate Web Developer</strong>
            <p>Working on a video streaming platform, building and optimizing scalable features using Ruby on Rails and PostgreSQL.</p>
            <p className="experience-duration">Feb 2026 - Present</p>
          </div>
          <div className="experience-tag">Full Time</div>
        </div>
        <div className="experience-entry">
          <Image src="/spi_logo.png" alt="Company Logo" width={70} height={40} className="experience-logo" />
          <div className="experience-details">
            <strong>Full Stack Developer</strong>
            <p>Worked on the Projects of MERN Stack</p>
            <p className="experience-duration">Feb 2025 - May 2025</p>
            <a href="/pdff.pdf" target="_blank" className="certificate-link">View Certificate</a>
          </div>
          <div className="experience-tag">Full-Time</div>
        </div>
      </div>

      <div className="projects">
        <h2>Projects</h2>
        <div className="projects-container">
          <div className="project-card">
            <div className="project-img">
              <Image src="/web.jpeg" alt="Portfolio Website" width={160} height={150} />
            </div>
            <div className="project-info">
              <h3>Multithreaded Proxy Web Server</h3>
              <p>A personal portfolio showcasing my skills, education, and projects with dark/light mode toggle and responsive design.</p>
              <div className="project-tags">
                <span className="tag">C Language</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/riteshh01/Multithreaded-Web-Server.git" className="btn-code" target="_blank">Repo</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img">
              <Image src="/logo1.png" alt="College Transport System" width={160} height={150} />
            </div>
            <div className="project-info">
              <h3>PetPuja a Food Delivery Platform</h3>
              <p>A full-stack MERN project that allows students to book buses, track live locations, and manage routes efficiently.</p>
              <div className="project-tags">
                <span className="tag">HTML/CSS</span>
                <span className="tag">Javascript</span>
                <span className="tag">React</span>
                <span className="tag">Express</span>
                <span className="tag">Node.js</span>
                <span className="tag">MongoDB</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/riteshh01/Farmly.git" className="btn-code" target="_blank">Repo</a>
                <a href="https://farmly-frontend.vercel.app" className="btn-code" target="_blank">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cp-profiles">
        <h2>Coding Profiles</h2>
        <div className="profile-links">
          <a href="https://leetcode.com/u/riteshh_0/" target="_blank" rel="noopener noreferrer">LeetCode</a>
          <a href="https://www.codechef.com/users/riteshh_0" target="_blank" rel="noopener noreferrer">CodeChef</a>
          <a href="https://codeforces.com/profile/riteshh_0" target="_blank" rel="noopener noreferrer">CodeForces</a>
        </div>
        <div className="heatmap">
          <h2>LeetCode Stats</h2>
          <LeetcodeStats />
        </div>
      </div>

      <div className="section">
        <h2>GitHub Activity</h2>
        <GithubHeatmap />
      </div>

      <div className="achievements">
        <h2>Achievements</h2>
        <div className="achievement-entry">
          <Image src="/type_logo.png" alt="Typing speed icon" width={38} height={38} className="achievement-icon" />
          <div>
            <h3>Having a typing Speed of <span>120+</span> WPM</h3>
            <p>My average typing speed is 90 WPM and and the highest typing speed is 124 WPM</p>
            <a href="/type.png" target="_blank" className="achievement-btn">View</a>
          </div>
        </div>
        <div className="achievement-entry">
          <Image src="/chess_logo.png" alt="Chess icon" width={38} height={38} className="achievement-icon" />
          <div>
            <h3>Having <span>1500+</span> rating in Chess</h3>
            <p>I play chess as a hobbie so I also love to play chess</p>
            <a href="https://www.chess.com/member/gookkuuu/stats/rapid" target="_blank" className="achievement-btn">View</a>
          </div>
        </div>
      </div>

      <div className="contact">
        <h2>Contact Me</h2>
        <p>Hi there! I’m Ritesh Patel always excited to connect with fellow developers, collaborators, or anyone curious about my work. Feel free to reach out — I’d love to chat, collaborate, or answer any questions you have.</p>
        <div className="social-links">
          <a href="mailto:riteshapplication@gmail.com" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/ritesh-patel-profile/" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://x.com/_riteshh" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="https://wa.me/919120315908?text=Hey%20Ritesh!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20chat!" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 21 1.65 -3.8a9 9 0 1 1 3.4 2.9L3 21" strokeWidth="2"></path>
              <path d="M9 10a0.5 0.5 0 0 0 1 0V9a0.5 0.5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 0.5 0 0 0 0 -1h-1a0.5 0.5 0 0 0 0 1" strokeWidth="2"></path>
            </svg>
          </a>
        </div>
        <div className="footer-note">
          <p>Built with 💛 by <span style={{ color: "#00a6ff" }}>Ritesh Patel</span></p>
          <h5>All Rights are Reserved</h5>
        </div>
      </div>
    </div>
  );
}
