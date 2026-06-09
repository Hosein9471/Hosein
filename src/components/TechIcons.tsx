/**
 * TechIcons — Real SVG logos for programming languages and technologies
 */

export const PythonIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pythonBlue" x1="12.96%" x2="79.64%" y1="12.04%" y2="78.57%">
        <stop offset="0%" stopColor="#387EB8"/>
        <stop offset="100%" stopColor="#366994"/>
      </linearGradient>
      <linearGradient id="pythonYellow" x1="19.13%" x2="90.58%" y1="20.58%" y2="88.51%">
        <stop offset="0%" stopColor="#FFE052"/>
        <stop offset="100%" stopColor="#FFC331"/>
      </linearGradient>
    </defs>
    <path fill="url(#pythonBlue)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"/>
    <path fill="url(#pythonYellow)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"/>
  </svg>
);

export const JavaScriptIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <rect width="256" height="256" fill="#F7DF1E" rx="12"/>
    <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"/>
  </svg>
);

export const JavaIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 256 346" xmlns="http://www.w3.org/2000/svg">
    <path fill="#5382A1" d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517m-8.262-37.814s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.798 1.885-114.296-17.532"/>
    <path fill="#E76F00" d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.6"/>
    <path fill="#5382A1" d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.91-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.358-12.848 54.358-12.848m112.605 62.942c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.411 1.99-7.411 1.99s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.897-13.355 65.647 0 .001 1.003-.895 1.302-1.697"/>
    <path fill="#E76F00" d="M162.439.371s35.887 35.9-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439.37"/>
    <path fill="#5382A1" d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.99-118.564 8.824-157.399 2.421.001 0 7.95 6.58 48.83 9.201"/>
  </svg>
);

export const ReactIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 256 228" xmlns="http://www.w3.org/2000/svg">
    <path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.985 4.76-1.52 29.151-10.09 48.443-25.858 48.443-42.157.001-15.537-18.037-30.562-45.517-40.175zM198.438 16.235c9.222 5.322 12.714 24.894 7.413 50.623a155.938 155.938 0 0 1-1.18 5.2c-11.333-2.547-23.584-4.323-36.386-5.276a155.082 155.082 0 0 0-22.38-27.113 158.681 158.681 0 0 1 5.584-5.159c18.636-16.207 36.114-22.752 46.949-18.275zm-70.113 173.533c-2.447 2.28-4.914 4.433-7.379 6.453-17.553 14.417-33.84 21.108-43.063 15.778-9.683-5.592-13.437-23.603-8.512-46.77a153.406 153.406 0 0 1 1.8-8.068 184.65 184.65 0 0 0 37.036 5.003c6.965 9.64 14.498 18.594 22.537 26.768a148.63 148.63 0 0 1-2.419.836zm-11.252-51.04c-4.698-8.099-9.097-16.492-13.14-25.136 4.056-8.632 8.469-17.008 13.17-25.072 8.38-.42 17.006-.625 25.732-.625 8.783 0 17.462.211 25.884.638 4.707 8.094 9.1 16.493 13.11 25.1-4.024 8.619-8.409 17.007-13.095 25.094-8.43.43-17.101.645-25.9.645-8.74 0-17.374-.214-25.761-.644zm92.49-13.658c5.095 8.833 9.77 18.003 13.935 27.44a150.696 150.696 0 0 1-4.1 1.394c-3.588-10.39-7.974-21.138-13.012-32.048a152.683 152.683 0 0 1 3.177 3.214zm-18.97-33.65c5.158 9.037 9.924 18.349 14.24 27.856a152.43 152.43 0 0 1-3.297 3.369 308.38 308.38 0 0 0-13.05-26.872 155.08 155.08 0 0 1 2.107-4.354zm-44.14-35.04a141.04 141.04 0 0 1 14.865 17.73c-9.759-.43-19.683-.437-29.676.032a141.376 141.376 0 0 1 14.812-17.762zM69.633 20.09c9.57-5.554 27.802.577 47.048 17.276a156.95 156.95 0 0 1 4.606 4.234 154.893 154.893 0 0 0-22.293 27.133c-12.855.98-25.156 2.786-36.478 5.358a142.456 142.456 0 0 1-1.268-4.776c-4.821-24.315-1.155-43.823 8.385-49.225zM34.9 142.264c-2.15-.677-4.23-1.387-6.239-2.128-11.904-4.383-21.555-9.986-27.963-16.115-5.444-5.205-8.164-10.34-8.164-14.354 0-8.778 14.173-20.313 37.67-28.766 2.819-1.013 5.772-1.969 8.829-2.87a185.156 185.156 0 0 0 12.963 31.317 184.65 184.65 0 0 0-17.096 32.916zm16.263 52.543c-11.133-6.43-14.77-27.285-8.726-53.044a151.87 151.87 0 0 1 1.764-7.55c11.375 2.617 23.687 4.456 36.496 5.462a156.408 156.408 0 0 0 22.288 27.175 157.11 157.11 0 0 1-4.58 4.182c-18.097 15.5-35.25 22.01-47.242 23.775zm147.693-27.614c3.912 18.51 2.025 33.464-5.183 38.038-7.566 4.798-22.285-.52-38.643-14.148a144.983 144.983 0 0 1-5.839-5.382 156.12 156.12 0 0 0 22.238-26.95c12.9-.975 25.223-2.747 36.564-5.283.324 1.37.618 2.788.863 4.224v9.5zm16.566-19.05c-1.346.468-2.716.914-4.11 1.34a182.65 182.65 0 0 0-12.786-31.04 182.88 182.88 0 0 0 12.57-31.03 135.97 135.97 0 0 1 4.263 1.406c25.024 8.646 39.846 20.92 39.846 30.35 0 10.055-15.783 23.025-39.783 28.974z"/>
    <circle cx="128.001" cy="113.634" r="23.238" fill="#00D8FF"/>
  </svg>
);

export const DatabaseIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ApiIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 18h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const AIIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1.27c.34-.6.99-1 1.73-1a2 2 0 1 1 0 4c-.74 0-1.39-.4-1.73-1H21a7 7 0 0 1-7 7v1.27c.6.34 1 .99 1 1.73a2 2 0 1 1-4 0c0-.74.4-1.39 1-1.73V17a7 7 0 0 1-7-7H3.73c-.34.6-.99 1-1.73 1a2 2 0 1 1 0-4c.74 0 1.39.4 1.73 1H5a7 7 0 0 1 7-7V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const BackendIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="2" y="15" width="20" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 6h.01M6 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 9v6" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 12h6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const PHPIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 256 134" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="128" cy="67" rx="128" ry="67" fill="#8892BF"/>
    <path fill="#FFFFFF" d="M37.94 80.17h11.77l2.97-15.34h9.67c14.23 0 21.57-7.05 23.53-17.94 1.75-9.66-1.97-17.44-16.22-17.44H47.44l-9.5 50.72zm22.15-38.06h7.18c6.07 0 8.31 2.29 7.44 6.9-.97 5.12-4.2 8.16-10.37 8.16h-7.05l2.8-15.06zM87.3 80.17h11.66l3.89-20.73h9.05c5.95 0 6.91 2.4 6.04 7.22l-2.77 13.51h11.88l3.24-15.95c1.5-7.44-1.85-11.42-9.74-11.42H109.7l2.33-12.35h-11.66L87.3 80.17zM131.94 80.17h11.77l2.97-15.34h9.67c14.23 0 21.57-7.05 23.53-17.94 1.75-9.66-1.97-17.44-16.22-17.44h-22.22l-9.5 50.72zm22.15-38.06h7.18c6.07 0 8.31 2.29 7.44 6.9-.97 5.12-4.2 8.16-10.37 8.16h-7.05l2.8-15.06z"/>
  </svg>
);

export const HTMLIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 256 361" xmlns="http://www.w3.org/2000/svg">
    <path fill="#E44D26" d="M255.555 70.766l-23.241 260.36-104.47 28.962-104.182-28.922L.445 70.766h255.11z"/>
    <path fill="#F16529" d="M128 337.95l84.417-23.403 19.86-222.49H128V337.95z"/>
    <path fill="#EBEBEB" d="M82.82 155.932H128v-31.937H47.917l.764 8.568 7.85 88.01H128v-31.937H85.739l-2.919-32.704zM90.018 236.542l-3.91-43.78H128v31.937H117.83l-2.863 32.09-22.967 6.197v33.026l42.383-11.751.347-3.907 4.86-54.445.502-5.367H128v-.001z"/>
    <path fill="#fff" d="M128 155.932v31.937h42.281l-3.986 44.704-38.295 10.356v33.026l70.282-19.517.516-5.777 8.063-90.159.833-9.366.168-1.86H128v6.656zm0-31.937v31.937h77.044l.69-7.722.718-8.034.633-7.1H128v-9.081z"/>
  </svg>
);

export const CppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 256 288" xmlns="http://www.w3.org/2000/svg">
    <path fill="#00599C" d="M255.569 84.452c-.002-4.83-1.035-9.098-3.124-12.761-2.052-3.602-5.125-6.621-9.247-9.008-34.025-19.619-68.083-39.178-102.097-58.817-9.17-5.294-18.061-5.101-27.163.269C100.395 12.39 32.59 51.237 12.385 62.94 4.064 67.757.015 75.129.013 84.578c-.03 39.249-.024 78.498-.012 117.748.001 9.207 3.744 16.456 11.606 21.634.482.317.986.611 1.456.941 33.034 19.093 66.074 38.174 99.086 57.3 9.156 5.302 18.025 5.259 27.177-.03 34.052-19.673 68.138-39.29 102.193-58.96 8.651-4.998 12.418-12.586 13.975-21.637.078-.227.18-.146.075.09V84.452z"/>
    <path fill="#004482" d="M128.182 143.241c-2.631 1.512-5.281 2.995-7.892 4.54-22.22 13.128-44.418 26.292-66.676 39.354-1.376.807-1.834 1.628-1.834 3.213.024 26.413.012 52.825.012 79.238v2.178l-.012-.001v-79.238c0-1.585.458-2.406 1.834-3.213 22.258-13.062 44.456-26.226 66.676-39.354 2.611-1.545 5.261-3.028 7.892-4.54v-2.177z"/>
    <path fill="#fff" d="M170.327 173.727h-10.66v-10.66h-10.66v10.66h-10.66v10.66h10.66v10.66h10.66v-10.66h10.66zM212.66 173.727H202v-10.66h-10.66v10.66h-10.66v10.66h10.66v10.66H202v-10.66h10.66z"/>
  </svg>
);

export const UIUXIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export const ArchitectureIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 21V7l7-4 7 4v14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 9h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const PerformanceIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export const TradingIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 14l4-4 4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChatIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M8 9h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const GamingIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12h4M8 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="17" cy="10" r="1" fill="currentColor"/>
    <circle cx="15" cy="12" r="1" fill="currentColor"/>
    <rect x="2" y="6" width="20" height="12" rx="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const WebIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12h20M12 2c2.5 2.5 4 6 4 10s-1.5 7.5-4 10c-2.5-2.5-4-6-4-10s1.5-7.5 4-10z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const StudentIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);
