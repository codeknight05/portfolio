import { useState, useEffect, useMemo } from 'react'
import {
  Award, Bookmark, Briefcase, ChevronRight, Circle, Database,
  Code2, Download, ExternalLink, FileCode2, Folder, FolderOpen, GraduationCap, Mail, MapPin,
  Menu, MessageSquare, PanelLeft, Play, Search, Send, Settings, Sparkles,
  Terminal as TerminalIcon, UserRound, X, Zap,
} from 'lucide-react'

const projects = [
  {
    id: 'mri-gan',
    name: 'mri-gan-detector.tsx',
    title: 'MRI-GAN Deepfake Detection',
    type: 'RESEARCH · AI / ML · FORENSICS',
    color: '#e889a2',
    sourceUrl: 'https://github.com/codeknight05/deepfake',
    descriptor: 'Multimodal video forensics system using adversarial perceptual learning and calibrated ensemble fusion.',
    overview: 'MRI-GAN Deepfake Detection is a video forensics framework engineered to identify synthetic face-swaps and generative facial manipulations across high-resolution video media. Validated on 23.6k DFDC videos, Celeb-DF-v2, and FaceForensics++.',
    features: [
      'Dual spatial-temporal extraction utilizing 1D CNN and EfficientNet feature backbones.',
      'Adversarial perceptual loss for detecting fine-grained face-swap boundary artifacts.',
      'Calibrated ensemble classification scoring with 93% forensic accuracy and 0.94 ROC-AUC.'
    ],
    challenge: 'Synchronizing spatial frame-level artifact analysis with temporal 1D CNN sequences without GPU memory bottlenecks during multi-video batches.',
    stackList: ['Python', 'TensorFlow', 'Keras', 'EfficientNet', '1D CNN', 'GANs', 'OpenCV'],
    architecture: 'OpenCV frame extraction pipeline feeding spatial features into EfficientNet and 1D CNN temporal layers, aggregated via calibrated ensemble fusion nodes.',
    learnings: 'Mastered adversarial loss functions, cross-dataset domain adaptation for forensics, and ensemble confidence scoring for published patent output.',
  },
  {
    id: 'hypercar',
    name: 'hypercar-sim.cs',
    title: 'HyperCarSim',
    type: 'SIMULATION · ML PIPELINE · C#',
    color: '#7bd9c2',
    sourceUrl: 'https://github.com/codeknight05/hypercarsim',
    liveUrl: 'https://drive.google.com/file/d/1iK7L_2oNeZM5cGQ_0Ze_8ZD-p-DPy2I7/view',
    descriptor: 'Telemetry pipeline connecting C# simulation routines, Python processing, and low-latency ONNX runtime inference.',
    overview: 'An end-to-end vehicle dynamics simulation engine connecting C# physics telemetry streaming with Python data processing, Keras neural network training, and sub-10ms ONNX embedded runtime inference.',
    features: [
      'High-frequency C# vehicle simulation emitting real-time telemetry metrics via socket streams.',
      'Automated Keras-to-ONNX model conversion pipeline for low-latency embedded deployment.',
      'Real-time vehicle response adjustment loop executing sub-10ms inference passes.'
    ],
    challenge: 'Eliminating memory allocations during high-frequency C# telemetry streaming to prevent garbage-collection lag spikes in simulation loops.',
    stackList: ['C#', '.NET', 'Python', 'TensorFlow', 'Keras', 'ONNX Runtime', 'NumPy'],
    architecture: 'C# physics engine broadcasting high-rate UDP telemetry packets to a Python receiver, evaluating state matrices with ONNX inference engines in real time.',
    learnings: 'Gained expertise in ONNX model quantization, socket buffer management, and cross-language runtime communication.',
  },
  {
    id: 'reaction',
    name: 'reaction-time-mern.jsx',
    title: 'ReactionTimeMERN',
    type: 'GAMETECH · FULL STACK · REAL-TIME',
    color: '#f4c96b',
    sourceUrl: 'https://github.com/codeknight05',
    liveUrl: 'https://reaction-time-mern-ad1y.vercel.app/',
    descriptor: 'F1-inspired multiplayer reaction test game with synchronized start-light rounds and global leaderboards.',
    overview: 'A cross-device multiplayer reaction time testing web application modeled after Formula 1 gantry start lights. Players join room-code lobbies, compete in real-time light sequence rounds, and submit verified reaction scores to global leaderboards.',
    features: [
      'Room-code lobby system supporting instant cross-device multiplayer match pairing.',
      'Synchronized server-side start light countdown preventing local client timing manipulation.',
      'Global top-ten leaderboard with score verification, persistence, and stats aggregation.'
    ],
    challenge: 'Preventing client-side inspection or early-click cheating by calculating timing deltas on the server using cryptographically verified timestamps.',
    stackList: ['React JS', 'Node.js', 'Express JS', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    architecture: 'React frontend connected via REST APIs and WebSockets to an Express server managing room states and persisting leaderboard entries to MongoDB Atlas.',
    learnings: 'Mastered real-time WebSocket state synchronization, anti-cheat timestamp validation, and mobile-responsive UI design.',
  },
  {
    id: 'context-aware',
    name: 'context-aware-llm.py',
    title: 'Context-Aware RAG Assistant',
    type: 'AI / ML · RAG · STREAMLIT',
    color: '#5db7ff',
    sourceUrl: 'https://github.com/codeknight05',
    liveUrl: 'https://contextaware.streamlit.app/',
    descriptor: 'Retrieval-Augmented Generation assistant for contextual document QA and domain query intelligence.',
    overview: 'A context-aware Retrieval-Augmented Generation (RAG) platform allowing users to upload dense technical documents, index semantic vectors, and perform interactive QA with cited references.',
    features: [
      'Document chunking and vector embedding pipeline indexing PDFs and text files.',
      'Contextual retrieval matching queries against vector embeddings for factual answers.',
      'Streamlit interactive dashboard featuring real-time streaming answer generation.'
    ],
    challenge: 'Tuning document chunk sizes and vector top-k parameters to prevent context truncation while keeping LLM context windows relevant.',
    stackList: ['Python', 'Streamlit', 'LangChain', 'FAISS Vector DB', 'OpenAI API', 'Gemini API'],
    architecture: 'Streamlit UI passes document streams to LangChain chunkers, generates FAISS vector indices, and feeds matched context into LLM completion APIs.',
    learnings: 'Deepened practical knowledge in RAG architecture, vector search indexing, prompt engineering, and Streamlit deployment.',
  },
  {
    id: 'race-predictor',
    name: 'race-predictor.py',
    title: 'F1 Race Outcome Predictor',
    type: 'DATA SCIENCE · PREDICTIVE ML · MOTORSPORTS',
    color: '#f05bb5',
    sourceUrl: 'https://github.com/codeknight05',
    liveUrl: 'https://racepredictor-6sfeab.streamlit.app/',
    descriptor: 'Predictive analytics platform modeling Formula 1 Grand Prix finishing positions and pit strategy outcomes.',
    overview: 'An analytics and predictive machine learning platform analyzing historical F1 data, qualifying pace, track characteristics, and weather telemetry to forecast race podiums and pit stop strategies.',
    features: [
      'Automated data ingestion from Ergast F1 API and FastF1 lap timing telemetry.',
      'XGBoost regression and classification models predicting position deltas and podium odds.',
      'Interactive driver head-to-head comparison and lap pace visualization dashboard.'
    ],
    challenge: 'Handling chaotic race variables like safety car deployments and wet weather transitions without overfitting model weights to outliers.',
    stackList: ['Python', 'Streamlit', 'Pandas', 'Scikit-Learn', 'XGBoost', 'FastF1 API'],
    architecture: 'Pandas data engineering pipeline processing FastF1 telemetry, feeding engineered feature matrices to XGBoost models served via Streamlit Cloud.',
    learnings: 'Gained strong expertise in sports analytics telemetry, feature engineering, model validation, and interactive plotting.',
  },
  {
    id: 'ai-chatbot',
    name: 'ai-chatbot.tsx',
    title: 'AI Chatbot Workspace',
    type: 'FULL STACK · AI INTEGRATION · VERCEL',
    color: '#6ed7a1',
    sourceUrl: 'https://github.com/codeknight05',
    liveUrl: 'https://ai-chatbot-three-ruddy-70.vercel.app/',
    descriptor: 'Modern AI chatbot application featuring streaming markdown responses, persona control, and history.',
    overview: 'A full-stack AI chat workspace built with React, Next.js, and Vercel AI SDK. Features real-time token streaming, custom system prompt selection, code syntax highlighting, and session persistence.',
    features: [
      'Low-latency token streaming interface built on Vercel AI SDK edge functions.',
      'Custom system prompt selector for toggling developer, tutor, and code auditor personas.',
      'Code block rendering with copy-to-clipboard actions and chat history persistence.'
    ],
    challenge: 'Preventing UI reflow flickering and re-render spikes during rapid token streaming across complex markdown code blocks.',
    stackList: ['React JS', 'TypeScript', 'Next.js', 'Vercel AI SDK', 'Tailwind CSS'],
    architecture: 'Next.js App Router edge runtime streaming response chunks from LLM endpoints to React client components via Server-Sent Events.',
    learnings: 'Mastered edge function streaming, custom React hooks for AI streams, and modern Next.js App Router design.',
  },
]

const certifications = [
  {
    id: 'azure-ai',
    name: 'azure-ai-fundamentals.pdf',
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    type: 'Official Certification',
    date: 'April 18, 2026',
    credentialId: 'waWMv-H9uQ',
    verificationUrl: 'https://verify.certiport.com',
    color: '#f4c96b',
    icon: Award,
    description: 'Validates foundational knowledge of artificial intelligence and machine learning concepts and related Microsoft Azure services.',
    skills: ['Azure AI', 'Machine Learning', 'Computer Vision', 'NLP'],
  },
  {
    id: 'patent-deepfake',
    name: 'deepfake-detection-patent.pdf',
    title: 'Multi-Method Deepfake Detection System and Method for Identifying Manipulations in Forensic Video',
    issuer: 'Government of India — Patent Office',
    type: 'Patent Published (App No: 202641032836)',
    date: 'Filing: 18/03/2026 · Published: 27/03/2026',
    appNumber: '202641032836',
    applicant: 'Vellore Institute of Technology',
    field: 'Computer Science',
    color: '#e889a2',
    icon: Sparkles,
    description: 'Patent application for an intelligent multimodal forensic framework combining adversarial perceptual feature extraction and ensemble classification for detecting manipulated video media.',
    skills: ['Video Forensics', 'Adversarial Learning', 'Deepfake Detection', 'Multimodal ML'],
  },
  {
    id: 'matlab-associate',
    name: 'matlab-certified-associate.pdf',
    title: 'MathWorks Certified MATLAB Associate',
    issuer: 'MathWorks',
    type: 'Foundational Certification',
    date: 'August 28, 2026',
    color: '#7bd9c2',
    icon: Award,
    description: 'Validates a first tier of proficiency with core principles in MATLAB including interface navigation, reading common data formats, data analysis, and script assembly.',
    skills: ['MATLAB', 'Computer Programming', 'Data Analysis', 'Data Processing', 'Data Visualization'],
  },
  {
    id: 'simulink-onramp',
    name: 'simulink-onramp.pdf',
    title: 'MathWorks Simulink Onramp',
    issuer: 'MathWorks Training Services',
    type: 'Course Completion Certificate',
    date: 'August 31, 2026',
    color: '#6ed7a1',
    icon: Award,
    description: 'Completed 100% of the self-paced training course covering graphical simulation modeling, signal routing, and dynamic system analysis in Simulink.',
    skills: ['Simulink', 'System Modeling', 'Simulation', 'Signal Processing'],
  },
]

const files = [
  { name: 'home.jsx', icon: Code2, color: '#6ed7a1', view: 'home' },
  { name: 'about.html', icon: FileCode2, color: '#e889a2', view: 'about' },
  { name: 'experience.ts', icon: Code2, color: '#f4c96b', view: 'experience' },
  { name: 'skills.json', icon: Database, color: '#f4c96b', view: 'skills' },
  { name: 'contact.css', icon: FileCode2, color: '#e889a2', view: 'contact' },
  { name: 'README.md', icon: FileCode2, color: '#76a7e8', view: 'readme' },
  { name: 'Yash_Khandelwal_Resume.pdf', icon: FileCode2, color: '#e889a2', view: 'resume' },
]

const welcomeBuffer = { name: 'welcome.jsx', icon: UserRound, color: '#e889a2', view: 'welcome' }

const skillIndexGroups = [
  {
    name: 'Languages',
    items: [
      ['C', 90],
      ['C++', 88],
      ['Java', 85],
      ['Python', 88],
      ['JavaScript', 90],
      ['HTML', 95],
      ['CSS', 90],
    ],
  },
  {
    name: 'Frontend',
    items: [
      ['ReactJS', 90],
      ['NextJS', 80],
      ['Material UI', 85],
      ['Styled Components', 80],
    ],
  },
  {
    name: 'Backend',
    items: [
      ['NodeJS', 88],
      ['ExpressJS', 86],
      ['FastAPI', 76],
      ['.NET', 75],
      ['SQL', 84],
    ],
  },
  {
    name: 'Data & ML',
    items: [
      ['Python ML Stack', 86],
      ['TensorFlow / Keras', 78],
      ['ONNX', 80],
      ['Pandas / NumPy', 86],
    ],
  },
  {
    name: 'Tools',
    items: [
      ['Git / Linux / Docker', 86],
      ['AWS EC2', 72],
      ['CI/CD / Nginx', 72],
      ['MATLAB / Simulink', 75],
    ],
  },
]

const professionTitles = [
  'Software Developer',
  'AI/ML Solutions Developer',
  'Published Patent Holder',
  'Backend Systems Engineer',
  'Motorsports Enthusiast',
]

const THEMES = [
  { id: 'yash-dark', name: 'Yash Dark', emoji: '💜' },
  { id: 'rose-pine', name: 'Rosé Pine', emoji: '🌸' },
  { id: 'tokyo-night', name: 'Tokyo Night', emoji: '🌃' },
  { id: 'catppuccin', name: 'Catppuccin', emoji: '🐱' },
  { id: 'nord', name: 'Nord', emoji: '💎' },
  { id: 'gruvbox', name: 'Gruvbox', emoji: '🔥' },
]

function App() {
  const [booted, setBooted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'yash-dark')
  const [toast, setToast] = useState(null)
  const [active, setActive] = useState('welcome')
  const [openTabs, setOpenTabs] = useState([])
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLines, setTerminalLines] = useState(['Welcome to Yash\'s integrated portfolio console.', 'Type "help" to list available commands.'])
  const [sidebar, setSidebar] = useState(true)
  const [project, setProject] = useState(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [assistantInput, setAssistantInput] = useState('')
  const [assistantMessages, setAssistantMessages] = useState([{ role: 'assistant', text: 'Hi, I am Franz Hermann. Ask me about Yash\'s skills, projects, experience, education, or contact details.' }])
  const [workspaceOpen, setWorkspaceOpen] = useState(true)
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [certificationsOpen, setCertificationsOpen] = useState(true)
  const [selectedCert, setSelectedCert] = useState(null)
  const [activityMode, setActivityMode] = useState('explorer')
  const [fileSearch, setFileSearch] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [commandIndex, setCommandIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => { const timer = setTimeout(() => setBooted(true), 1800); return () => clearTimeout(timer) }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      }
    } catch {
      setToast('Fullscreen is not available in this browser.')
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
    } catch {
      setToast('Could not exit fullscreen.')
    }
  }

  const cheekyComments = [
    "Alt+F4? We don't do that here 😎",
    'Nice try. This portfolio is not closing that easily 😏',
    'Red means mischief, not shutdown. 🔴',
    'You really thought I would let you close the portfolio? 😂',
    'The portfolio has decided to stay open. Respect the decision. 😎',
  ]

  const showCheekyComment = () => {
    const comment = cheekyComments[Math.floor(Math.random() * cheekyComments.length)]
    setToast(comment)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'p') {
        event.preventDefault()
        setCommandPaletteOpen(true)
        setCommandQuery('')
        setCommandIndex(0)
        return
      }
      if (!commandPaletteOpen) return
      if (event.key === 'Escape') {
        event.preventDefault()
        setCommandPaletteOpen(false)
        return
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setCommandIndex((index) => index + 1)
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setCommandIndex((index) => Math.max(0, index - 1))
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        window.dispatchEvent(new CustomEvent('portfolio-command-execute'))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [commandPaletteOpen])

  const changeZoom = (delta) => {
    setZoomLevel((current) => {
      const next = Math.min(125, Math.max(80, current + delta))
      document.documentElement.style.zoom = `${next}%`
      return next
    })
  }

  const resetZoom = () => {
    document.documentElement.style.zoom = '100%'
    setZoomLevel(100)
  }

  const selectTheme = (themeId) => {
    setCurrentTheme(themeId)
    localStorage.setItem('portfolio-theme', themeId)
    const t = THEMES.find((item) => item.id === themeId)
    if (t) {
      setToast(`${t.emoji} Theme set to ${t.name}`)
    }
  }

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0]

  const activeFile = useMemo(() => {
    const fileMatch = files.find((file) => file.view === active)
    if (fileMatch) return fileMatch
    const projMatch = projects.find((p) => p.id === active)
    if (projMatch) return { name: projMatch.name, icon: FileCode2, color: '#6ed7a1', view: projMatch.id }
    if (active === 'certifications') return { name: selectedCert?.name || 'certifications.json', icon: Award, color: '#f4c96b', view: 'certifications' }
    return welcomeBuffer
  }, [active, selectedCert])

  const activeTabs = useMemo(() => {
    return openTabs.map((view) => {
      const fileMatch = files.find((file) => file.view === view)
      if (fileMatch) return fileMatch
      const projMatch = projects.find((p) => p.id === view)
      if (projMatch) return { name: projMatch.name, icon: FileCode2, color: '#6ed7a1', view: projMatch.id }
      if (view === 'certifications') return { name: selectedCert?.name || 'certifications.json', icon: Award, color: '#f4c96b', view: 'certifications' }
      return null
    }).filter(Boolean)
  }, [openTabs, selectedCert])

  const hasOpenTabs = activeTabs.length > 0

  const selectView = (view) => {
    setActive(view)
    const projMatch = projects.find((p) => p.id === view)
    if (projMatch) {
      setProject(projMatch)
    } else if (!files.some((f) => f.view === view) && view !== 'certifications') {
      setProject(null)
    }
    setMobileMenu(false)
    setOpenMenu(null)
    setOpenTabs((tabs) => tabs.includes(view) ? tabs : [...tabs, view])
  }

  const closeTab = (event, view) => {
    event.stopPropagation()
    const nextTabs = openTabs.filter((tab) => tab !== view)
    setOpenTabs(nextTabs)
    if (active === view) {
      const tabIndex = openTabs.indexOf(view)
      const nextView = nextTabs[Math.max(0, tabIndex - 1)] || nextTabs[0] || 'welcome'
      setActive(nextView)
      const projMatch = projects.find((p) => p.id === nextView)
      setProject(projMatch || null)
    }
  }
  const closeAllTabs = () => {
    setOpenTabs([])
    setActive('welcome')
    setProject(null)
    setOpenMenu(null)
  }
  const openActivity = (mode) => {
    setActivityMode(mode)
    setSidebar(true)
    setOpenMenu(null)
  }
  const menuGroups = [
    { label: 'File', items: [{ label: 'New Portfolio Tab', hint: 'Ctrl+N', action: () => selectView('home') }, { label: 'Open README.md', hint: 'Ctrl+O', action: () => selectView('readme') }, { label: 'Close All Tabs', hint: 'Ctrl+K W', action: closeAllTabs }, { label: 'Download Resume', hint: 'PDF', action: () => window.open('/resume-alpine-swe.pdf', '_blank') }] },
    { label: 'Edit', items: [{ label: 'Copy Email', hint: 'Mail', action: () => navigator.clipboard?.writeText('yash.ajay05@gmail.com') }, { label: 'Ask Franz Hermann', hint: 'AI', action: () => setAssistantOpen(true) }] },
    { label: 'View', items: [{ label: sidebar ? 'Hide Sidebar' : 'Show Sidebar', hint: 'Ctrl+B', action: () => setSidebar(!sidebar) }, { label: 'Explorer', hint: 'Files', action: () => openActivity('explorer') }, { label: 'Skills Index', hint: 'DB', action: () => openActivity('skills-index') }, { label: terminalOpen ? 'Hide Terminal' : 'Show Terminal', hint: 'Ctrl+`', action: () => setTerminalOpen(!terminalOpen) }] },
    { label: 'Go', items: files.map((file) => ({ label: file.name, hint: file.view, action: () => selectView(file.view) })) },
    { label: 'Run', items: [{ label: 'Run Portfolio', hint: 'Vite', action: () => setTerminalOpen(true) }, { label: 'Open Projects', hint: 'Home', action: () => selectView('home') }] },
    { label: 'Terminal', items: [{ label: terminalOpen ? 'Close Terminal' : 'Open Terminal', hint: 'Toggle', action: () => setTerminalOpen(!terminalOpen) }, { label: 'Clear Terminal', hint: 'clear', action: () => setTerminalLines([]) }] },
    { label: 'Help', items: [{ label: 'Portfolio Assistant', hint: 'AI', action: () => setAssistantOpen(true) }, { label: 'Contact Yash', hint: 'CSS', action: () => selectView('contact') }] },
  ]

  const commandActions = [
    ...files.map((file) => ({
      label: file.name,
      hint: 'file tab',
      icon: file.icon,
      color: file.color,
      action: () => selectView(file.view),
    })),
    { label: '> Toggle Terminal', hint: 'system action', icon: Zap, color: '#f4c96b', action: () => setTerminalOpen((open) => !open) },
    { label: '> Toggle Sidebar', hint: 'system action', icon: Zap, color: '#f4c96b', action: () => setSidebar((open) => !open) },
    { label: '> Zoom In', hint: 'system action', icon: Zap, color: '#f4c96b', action: () => changeZoom(10) },
    { label: '> Zoom Out', hint: 'system action', icon: Zap, color: '#f4c96b', action: () => changeZoom(-10) },
    { label: '> Reset Zoom', hint: 'system action', icon: Zap, color: '#f4c96b', action: resetZoom },
    { label: '> Open Franz Hermann AI Assist', hint: 'system action', icon: Zap, color: '#f4c96b', action: () => setAssistantOpen(true) },
    { label: '> System Diagnostics', hint: 'system action', icon: Zap, color: '#f4c96b', action: () => setToast('System diagnostics: portfolio workspace is online.') },
  ]

  const filteredCommandActions = commandActions.filter((item) =>
    item.label.toLowerCase().includes(commandQuery.trim().toLowerCase())
  )

  const executeCommandAction = (item) => {
    if (!item) return
    item.action()
    setCommandPaletteOpen(false)
    setCommandQuery('')
    setCommandIndex(0)
  }

  useEffect(() => {
    const execute = () => executeCommandAction(filteredCommandActions[commandIndex])
    window.addEventListener('portfolio-command-execute', execute)
    return () => window.removeEventListener('portfolio-command-execute', execute)
  }, [commandIndex, filteredCommandActions])

  useEffect(() => {
    if (commandIndex >= filteredCommandActions.length) setCommandIndex(Math.max(0, filteredCommandActions.length - 1))
  }, [commandIndex, filteredCommandActions.length])

  const askAssistant = (prompt) => {
    const query = prompt.trim()
    if (!query) return
    const normalized = query.toLowerCase()
    let response = 'I can answer questions about Yash\'s portfolio, including his skills, projects, experience, education, LeetCode profile, and contact details.'
    if (normalized.includes('skill') || normalized.includes('stack') || normalized.includes('technolog')) response = 'Yash works across Python, C/C++, JavaScript, TypeScript, React, Node.js, Express, .NET, FastAPI, SQL, MongoDB, Docker, AWS EC2, TensorFlow, Keras, and ONNX. His strongest focus is full-stack systems and applied ML.'
    else if (normalized.includes('project')) response = 'Featured projects include MRI-GAN Deepfake Detection, HyperCarSim, and ReactionTimeMERN. They cover multimodal ML, C#/Python simulation pipelines, ONNX inference, and real-time multiplayer systems.'
    else if (normalized.includes('experience') || normalized.includes('work') || normalized.includes('job')) response = 'Yash worked as a freelance software developer at Pronader, building YouTube chat moderation systems, and at Bunny Infinite, building a Windows game-performance watchdog with telemetry and automated remediation.'
    else if (normalized.includes('education') || normalized.includes('college') || normalized.includes('vit')) response = 'Yash is pursuing an Integrated M.Tech in Computer Science and Engineering at Vellore Institute of Technology from 2022 to 2027.'
    else if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('hire')) response = 'You can contact Yash at yash.ajay05@gmail.com, call +91 97305 88865, or use the contact.css form. GitHub: github.com/codeknight05. LinkedIn: linkedin.com/in/yashkhandelwal005.'
    else if (normalized.includes('leetcode') || normalized.includes('dsa')) response = 'Yash\'s LeetCode profile is YashAjayKhandelwal. His live profile card is available in README.md, and his resume lists 250+ solved DSA problems.'
    setAssistantMessages((messages) => [...messages, { role: 'user', text: query }, { role: 'assistant', text: response }])
    setAssistantInput('')
  }
  const runCommand = (event) => {
    event.preventDefault()
    const command = terminalInput.trim().toLowerCase()
    if (!command) return
    const responses = { help: 'commands: about · skills · experience · projects · contact · resume · clear', about: 'Opening about.html...', skills: 'Opening skills.json...', experience: 'Opening experience.ts...', projects: '3 projects indexed in /projects', contact: 'Opening contact.css...', resume: 'Opening Yash_Khandelwal_Resume.pdf...' }
    if (command === 'clear') setTerminalLines([])
    else {
      setTerminalLines((lines) => [...lines, `yash@portfolio:~$ ${terminalInput}`, responses[command] || `command not found: ${command}`])
      if (['about', 'skills', 'experience', 'contact', 'resume'].includes(command)) selectView(command)
      if (command === 'projects') selectView('home')
    }
    setTerminalInput('')
  }

  if (!booted) return <BootScreen />

  return (
    <div className={`app-shell theme-${currentTheme}`}>
      <header className="topbar">
        <div className="traffic" aria-label="Window controls">
          <button className="traffic-dot red" onClick={showCheekyComment} aria-label="Close" title="Close">
            <span className="traffic-symbol">×</span>
          </button>
          <button className="traffic-dot yellow" onClick={exitFullscreen} aria-label="Exit fullscreen" title="Exit fullscreen">
            <span className="traffic-symbol">−</span>
          </button>
          <button className="traffic-dot green" onClick={enterFullscreen} aria-label="Enter fullscreen" title="Fullscreen">
            <span className="traffic-symbol">+</span>
          </button>
        </div>
        <button className="workspace-search" onClick={() => { setCommandPaletteOpen(true); setCommandQuery(''); setCommandIndex(0) }} aria-label="Open command palette"><Search size={15} /><span>yash-khandelwal : portfolio</span><kbd>Ctrl</kbd><kbd>P</kbd></button>
        <div className="branch"><Circle size={8} fill="currentColor" /> main*</div>
        <button className="run-button" aria-label="Run portfolio"><Play size={13} fill="currentColor" /> npm run dev</button>
      </header>
      <nav className="menubar" onMouseLeave={() => setOpenMenu(null)}>
        {menuGroups.map((menu) => <MenuDropdown key={menu.label} menu={menu} open={openMenu === menu.label} setOpenMenu={setOpenMenu} />)}
        <button className="ai-button" onClick={() => { setAssistantOpen(true); setOpenMenu(null) }}><Sparkles size={14} /> Franz Hermann</button>
      </nav>
      <div className="body-layout">
        <aside className={`activitybar ${mobileMenu ? 'mobile-open' : ''}`}>
          <button className="avatar-button" onClick={() => selectView('home')} aria-label="Open home"><img src="/profile..jpeg" alt="Yash Ajay Khandelwal" /></button>
          <div className="activity-icons"><button className={activityMode === 'explorer' ? 'selected' : ''} onClick={() => openActivity('explorer')} aria-label="Explorer"><PanelLeft size={22} /></button><button className={activityMode === 'search' ? 'selected' : ''} onClick={() => openActivity('search')} aria-label="Search"><Search size={21} /></button><button className={activityMode === 'skills-index' ? 'selected' : ''} onClick={() => openActivity('skills-index')} aria-label="Dynamic Skills Index" title="Dynamic Skills Index"><Database size={21} /></button><button className={terminalOpen ? 'selected' : ''} onClick={() => setTerminalOpen(!terminalOpen)} aria-label="Toggle Terminal"><TerminalIcon size={21} /></button><button onClick={() => setAssistantOpen(true)} aria-label="Open Franz Hermann"><Sparkles size={21} /></button></div>
          <div className="activity-bottom">
            <a href="https://github.com/codeknight05" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/yashkhandelwal005/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="https://leetcode.com/u/YashAjayKhandelwal/" target="_blank" rel="noreferrer" aria-label="LeetCode" title="LeetCode">
              <LeetcodeIcon />
            </a>
            <button onClick={() => setSettingsOpen(true)} aria-label="Settings" title="Settings" className={settingsOpen ? 'selected' : ''}>
              <Settings size={20} />
            </button>
          </div>
        </aside>
        {sidebar && activityMode === 'explorer' && <Explorer active={active} selectView={selectView} workspaceOpen={workspaceOpen} setWorkspaceOpen={setWorkspaceOpen} projectsOpen={projectsOpen} setProjectsOpen={setProjectsOpen} certificationsOpen={certificationsOpen} setCertificationsOpen={setCertificationsOpen} selectedCert={selectedCert} setSelectedCert={setSelectedCert} />}
        {sidebar && activityMode === 'search' && <SearchPanel query={fileSearch} setQuery={setFileSearch} selectView={selectView} setSelectedCert={setSelectedCert} />}
        {sidebar && activityMode === 'skills-index' && <DynamicSkillsIndexPanel selectView={selectView} />}
        <main className="main-pane">
          <div className={`tabbar ${hasOpenTabs ? '' : 'empty'}`}>{activeTabs.map((file) => <button className={`tab ${active === file.view ? 'active' : ''}`} key={file.view} onClick={() => selectView(file.view)}><file.icon size={15} color={file.color} />{file.name}<span className="tab-close" role="button" aria-label={`Close ${file.name}`} onClick={(event) => closeTab(event, file.view)}><X size={13} /></span></button>)}<button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={18} /></button></div>
          <div className="content-scroll"><Content active={active} hasOpenTabs={hasOpenTabs} selectView={selectView} openProject={setProject} project={project} openAssistant={() => setAssistantOpen(true)} selectedCert={selectedCert} setSelectedCert={setSelectedCert} /></div>
          {terminalOpen && <Terminal lines={terminalLines} value={terminalInput} setValue={setTerminalInput} runCommand={runCommand} close={() => setTerminalOpen(false)} />}
          {!terminalOpen && <button className="terminal-peek" onClick={() => setTerminalOpen(true)}><TerminalIcon size={15} /> Terminal Drawer</button>}
        </main>
      </div>
      {commandPaletteOpen && (
        <CommandPalette
          query={commandQuery}
          setQuery={(value) => { setCommandQuery(value); setCommandIndex(0) }}
          items={filteredCommandActions}
          selectedIndex={commandIndex}
          onSelect={executeCommandAction}
          close={() => setCommandPaletteOpen(false)}
        />
      )}
      {assistantOpen && <Assistant messages={assistantMessages} input={assistantInput} setInput={setAssistantInput} ask={askAssistant} close={() => setAssistantOpen(false)} />}
      {settingsOpen && (
        <SettingsPanel
          close={() => setSettingsOpen(false)}
          terminalOpen={terminalOpen}
          setTerminalOpen={setTerminalOpen}
          setSidebar={setSidebar}
          sidebar={sidebar}
          openAssistant={() => { setAssistantOpen(true); setSettingsOpen(false) }}
          currentTheme={currentTheme}
          selectTheme={selectTheme}
        />
      )}
      {toast && (
        <div className="theme-toast">
          <Zap size={13} color="#f4c96b" />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} aria-label="Close notification"><X size={12} /></button>
        </div>
      )}
      <footer className="statusbar">
        <span className="status-branch">⌘ main</span>
        <span className="sync"><Circle size={8} fill="currentColor" /> Sync Previews: Active</span>
        <span className="status-buffer">Active Buffer: <b>{activeFile.name}</b></span>
        <span>UTF-8</span>
        <span>Prettier</span>
        <span className="status-theme" onClick={() => setSettingsOpen(true)} style={{ cursor: 'pointer' }} title="Change theme">
          {activeThemeObj.emoji} {activeThemeObj.name} ▲
        </span>
        <span>◷ {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </footer>
    </div>
  )
}

function BootScreen() { return <div className="boot-screen"><div className="boot-mark"><img src="/profile..jpeg" alt="Yash Ajay Khandelwal" /></div><div className="boot-title">YASH AJAY KHANDELWAL</div><div className="boot-progress"><span /><b>68%</b></div><p>Binding portfolio workspace channels...</p><div className="boot-log"><span>✓</span> CLIENT CONTAINER ONLINE<br /><span>✓</span> LOADING RESUME INDEX<br /><span className="blink">▌</span> DEPLOYING SERVER BINDING TO PORT 3000</div></div> }

function MenuDropdown({ menu, open, setOpenMenu }) {
  return (
    <div className="menu-group">
      <button className={open ? 'menu-trigger open' : 'menu-trigger'} onClick={() => setOpenMenu(open ? null : menu.label)} onMouseEnter={() => setOpenMenu((current) => current ? menu.label : current)}>{menu.label}</button>
      {open && (
        <div className="menu-dropdown">
          {menu.items.map((item) => (
            <button key={`${menu.label}-${item.label}`} onClick={() => { item.action(); setOpenMenu(null) }}>
              <span>{item.label}</span>
              <kbd>{item.hint}</kbd>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Explorer({ active, selectView, workspaceOpen, setWorkspaceOpen, projectsOpen, setProjectsOpen, certificationsOpen, setCertificationsOpen, selectedCert, setSelectedCert }) {
  return (
    <aside className="explorer">
      <div className="explorer-heading"><b>EXPLORER</b><span>WORKSPACE</span></div>
      <div className="tree">
        <button className="root" onClick={() => setWorkspaceOpen(!workspaceOpen)}>
          <ChevronRight className={workspaceOpen ? 'rotated' : ''} size={15} />YASH-KHANDELWAL<br /><small>(WORKSPACE)</small>
        </button>
        {workspaceOpen && (
          <>
            {files.map((file) => (
              <button className={`tree-file ${active === file.view ? 'current' : ''}`} key={file.name} onClick={() => selectView(file.view)}>
                <file.icon size={16} color={file.color} /><span>{file.name}</span>
              </button>
            ))}
            <button className="folder" onClick={() => setProjectsOpen(!projectsOpen)}>
              <ChevronRight className={projectsOpen ? 'rotated' : ''} size={14} /><FolderOpen size={16} color="#76a7e8" />projects
            </button>
            {projectsOpen && projects.map((item) => (
              <button
                className={`tree-file nested ${active === item.id ? 'current' : ''}`}
                key={item.id}
                onClick={() => selectView(item.id)}
              >
                <FileCode2 size={15} color="#6ed7a1" /><span>{item.name}</span>
              </button>
            ))}
            <button className="folder" onClick={() => setCertificationsOpen(!certificationsOpen)}>
              <ChevronRight className={certificationsOpen ? 'rotated' : ''} size={14} /><FolderOpen size={16} color="#76a7e8" />certifications
            </button>
            {certificationsOpen && certifications.map((item) => (
              <button
                className={`tree-file nested ${active === 'certifications' && selectedCert?.id === item.id ? 'current' : ''}`}
                key={item.id}
                onClick={() => {
                  setSelectedCert(item)
                  selectView('certifications')
                }}
              >
                <item.icon size={15} color={item.color} /><span>{item.name}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </aside>
  )
}

function SkillsIndexSidebar() { return <DynamicSkillsIndexPanel compact /> }

function SearchPanel({ query, setQuery, selectView, setSelectedCert }) {
  const matches = [
    ...files,
    ...projects.map((item) => ({ ...item, icon: FileCode2, color: '#6ed7a1', view: item.id })),
    ...certifications.map((item) => ({ ...item, view: 'certifications' })),
  ].filter((file) => file.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="explorer">
      <div className="explorer-heading"><b>SEARCH</b><span>{matches.length} RESULTS</span></div>
      <div className="search-panel-body">
        <div className="search-input-wrap">
          <Search size={15} />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search workspace" />
        </div>
        {query && matches.length === 0 && <p className="empty-search">No files found.</p>}
        {matches.map((file) => (
          <button
            className="search-result"
            key={file.name}
            onClick={() => {
              if (file.view === 'certifications') setSelectedCert?.(file)
              selectView(file.view)
            }}
          >
            <file.icon size={16} color={file.color || '#6ed7a1'} />
            <span>{file.name}<small>{projects.some((p) => p.id === file.view) ? 'projects' : file.view === 'certifications' ? 'certifications' : 'workspace'}</small></span>
          </button>
        ))}
      </div>
    </aside>
  )
}

function DynamicSkillsIndexPanel({ selectView, compact = false }) {
  const totalSkills = skillIndexGroups.reduce((count, group) => count + group.items.length, 0)
  const average = Math.round(skillIndexGroups.reduce((sum, group) => sum + group.items.reduce((groupSum, [, mastery]) => groupSum + mastery, 0), 0) / totalSkills)
  return (
    <aside className="skills-sidebar">
      <div className="skills-sidebar-head"><b>SKILLS INDEX</b><span>{average}% AVG</span></div>
      {!compact && <button className="skills-index-search" onClick={() => selectView?.('skills')}><Database size={15} /> Dynamic Skills Index</button>}
      <div className="skills-sidebar-scroll">
        {skillIndexGroups.map((group) => (
          <section className="skills-sidebar-group" key={group.name}>
            <h2><Database size={14} />{group.name}</h2>
            {group.items.map(([name, mastery]) => (
              <button className="sidebar-skill" key={name} onClick={() => selectView?.('skills')}>
                <div><strong>{name}</strong><span>{mastery}%</span></div>
                <i><em style={{ width: `${mastery}%` }} /></i>
              </button>
            ))}
          </section>
        ))}
      </div>
    </aside>
  )
}

function Content({ active, hasOpenTabs, selectView, openProject, project, openAssistant, selectedCert, setSelectedCert }) {
  if (!hasOpenTabs) return <WorkspaceWelcome selectView={selectView} openAssistant={openAssistant} />
  if (project) return <ProjectView project={project} close={() => openProject(null)} />
  if (active === 'about') return <About />
  if (active === 'readme') return <Readme />
  if (active === 'experience') return <Experience />
  if (active === 'skills') return <Skills selectView={selectView} openAssistant={openAssistant} />
  if (active === 'contact') return <Contact />
  if (active === 'resume') return <Resume />
  if (active === 'certifications') return <CertificationsView selectedCert={selectedCert} setSelectedCert={setSelectedCert} />
  return <Home selectView={selectView} openProject={openProject} />
}

function WorkspaceWelcome({ selectView, openAssistant }) {
  const quickLinks = [
    { icon: FileCode2, color: '#76a7e8', title: 'README.md', text: 'Read personal philosophy, timeline, and profile notes.', view: 'readme' },
    { icon: Database, color: '#f4c96b', title: 'skills.json', text: 'Inspect technical categories, stack confidence, and mastery scores.', view: 'skills' },
    { icon: Mail, color: '#e889a2', title: 'contact.css', text: 'Submit comments, interview offers, or hire inquiries directly.', view: 'contact' },
  ]
  return (
    <section className="welcome-workspace">
      <div className="welcome-avatar"><img src="/profile..jpeg" alt="Yash Ajay Khandelwal" /></div>
      <h1>Yash Ajay Khandelwal</h1>
      <RotatingProfession className="welcome-role" />
      <p>Welcome to my interactive portfolio workspace. This layout is modeled like a premium code IDE. Dive into code files, project modules, or ask Franz Hermann.</p>
      <div className="welcome-actions">
        {quickLinks.map((item) => <button key={item.title} onClick={() => selectView(item.view)}><item.icon size={16} color={item.color} /><strong style={{ color: item.color }}>{item.title}</strong><span>{item.text}</span><ChevronRight size={17} /></button>)}
      </div>
      <button className="welcome-ai" onClick={openAssistant}><Sparkles size={15} /> Franz Hermann</button>
    </section>
  )
}

function RotatingProfession({ className }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentRole = professionTitles[roleIndex]
    const isComplete = displayText === currentRole
    const isEmpty = displayText === ''
    const delay = deleting ? 38 : isComplete ? 1250 : 72
    const timer = setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true)
        return
      }
      if (deleting && isEmpty) {
        setDeleting(false)
        setRoleIndex((index) => (index + 1) % professionTitles.length)
        return
      }
      setDisplayText((text) => deleting ? currentRole.slice(0, Math.max(0, text.length - 1)) : currentRole.slice(0, text.length + 1))
    }, delay)

    return () => clearTimeout(timer)
  }, [deleting, displayText, roleIndex])

  return <div className={className}><span>{displayText || '\u00A0'}</span><i aria-hidden="true" /></div>
}

function Home({ selectView }) {
  return (
    <section className="home-view home-dashboard">
      <div className="home-intro">
        <div className="home-comment">// hello world !! Welcome to my portfolio</div>
        <div className="home-name">
          <span>YASH</span>
          <strong>ajay khandelwal</strong>
        </div>
        <div className="home-roles">
          <span><i className="dot green">●</i> Software Developer</span>
          <span><i className="dot pink">●</i> AI / ML Solutions</span>
          <span><i className="dot blue">●</i> Patent Holder</span>
          <span><i className="dot red">●</i> <b className="highlight">@ Motorsports</b></span>
        </div>
        <p className="home-lede">
          Computer Science Engineer, Full Stack Developer, AI Enthusiast and XR Developer passionate about building impactful software solutions.
        </p>
        <p className="home-copy">
          I live at the crossroads of <em className="accent-cyan">backend engineering</em>, <em className="accent-pink">AI/ML</em>, and <em className="accent-magenta">data science</em>. I build advanced systems that are genuinely <em className="accent-green">intelligent</em> and <em className="accent-green">scalable</em>.
        </p>

        <div className="home-actions">
          <button className="btn-primary-blue" onClick={() => selectView?.('home')}>
            <Folder size={14} /> Projects
          </button>
          <button className="btn-outline" onClick={() => selectView?.('about')}>
            <UserRound size={14} /> About Me
          </button>
          <button className="btn-outline" onClick={() => selectView?.('contact')}>
            <Mail size={14} /> Contact
          </button>
        </div>

        <div className="home-stats-card">
          <div className="stat-col">
            <strong>VIT</strong>
            <span>M.TECH CSE</span>
          </div>
          <div className="stat-col">
            <strong className="text-blue">3+</strong>
            <span>PROJECTS</span>
          </div>
          <div className="stat-col">
            <strong className="text-pink">∞</strong>
            <span>CURIOSITY</span>
          </div>
          <div className="stat-col">
            <strong className="text-green">↑</strong>
            <span>ALWAYS LEARNING</span>
          </div>
        </div>

        <div className="connect-section">
          <span className="connect-label">CONNECT WITH ME:</span>
          <div className="connect-pills">
            <a href="https://github.com/codeknight05" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/yashkhandelwal005/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://leetcode.com/u/YashAjayKhandelwal/" target="_blank" rel="noreferrer">LeetCode</a>
            <a href="mailto:yash.ajay05@gmail.com">Email</a>
            <a href="/resume-alpine-swe.pdf" download>Resume</a>
          </div>
        </div>
      </div>
    </section>
  )
}
function QuickCard({ icon: Icon, color, title, text, action }) { return <button className="quick-card" onClick={action}><Icon color={color} size={18} /><strong style={{ color }}>{title}</strong><p>{text}</p><ChevronRight size={16} className="arrow" /></button> }
function ProjectCard({ item, open }) { return <button className="project-card" onClick={open}><div className="project-top"><Code2 size={16} color={item.color} /><span style={{ color: item.color }}>{item.type}</span><ChevronRight size={15} /></div><h3>{item.title}</h3><p>{item.copy}</p><div className="project-foot"><span>{item.stack}</span><b>{item.metric}</b></div></button> }
function About() { return <article className="about-document"><div className="about-title"><div><h1>about.html</h1><p>&lt;html&gt; Bio, story, education and technical interests &lt;/html&gt;</p></div><span>HTML RENDER</span></div><section className="about-profile"><div className="about-avatar"><img src="/profile..jpeg" alt="Yash Ajay Khandelwal" /></div><div><h2>Yash Ajay Khandelwal</h2><b>SOFTWARE ENGINEER | ML ENTHUSIAST | SYSTEMS BUILDER</b><p>Computer science engineer skilled in Python, C/C++, JavaScript, TypeScript, React, Node.js, and applied machine learning. Experienced in full-stack development, real-time systems, simulation, data pipelines, and production-minded APIs.</p></div></section><div className="html-section-label pink">&lt;SECTION ID="MYSTORY"&gt;</div><section className="about-code-card"><h3>Hey there! I'm Yash 👋</h3><p>I am an Integrated M.Tech Computer Science and Engineering student at Vellore Institute of Technology, building practical depth across software engineering, data processing, and intelligent systems.</p><p>My interests include backend architecture, applied machine learning, real-time applications, simulation, and developer-focused interfaces.</p><p>I enjoy creating reliable solutions that combine technical precision with thoughtful user experience.</p></section><div className="html-section-label pink">&lt;/SECTION&gt;</div><div className="html-section-label green">&lt;SECTION ID="EDUCATION"&gt;</div><section className="education-card"><div><h3>Integrated M.Tech Computer Science and Engineering</h3><p>Vellore Institute of Technology</p></div><strong>2022 — 2027</strong></section><div className="html-section-label green">&lt;/SECTION&gt;</div></article> }
function Readme() { const tags = ['Python', 'React', 'TypeScript', 'Node.js', 'Docker', 'ONNX']; return <article className="readme-document"><section className="readme-profile"><div className="readme-avatar"><img src="/profile..jpeg" alt="Yash Ajay Khandelwal" /></div><div className="readme-profile-copy"><h1>Yash<br /><strong>Khandelwal</strong></h1><p className="readme-location">⌖ Mumbai, Maharashtra, India</p><b className="readme-role">SOFTWARE ENGINEER | ML & SYSTEMS BUILDER</b><p>Computer science engineer skilled in Python, C/C++, JavaScript, TypeScript, React, Node.js, and applied machine learning. Experienced in building full-stack products, real-time systems, data pipelines, and production-minded APIs.</p><div className="readme-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></section><div className="readme-heading"><FileCode2 size={22} /> <h2>Yash Ajay Khandelwal README.md</h2></div><section className="readme-card"><h3># Introduction</h3><p>I am dedicated to crafting reliable software systems, practical ML workflows, and polished interfaces that make complex technical work easier to use. I enjoy combining typed application code, data processing, and low-latency inference into products that can survive beyond a prototype.</p><h3># Design Core Pillars</h3><ul><li><strong>Precision & Integrity:</strong> Clear interfaces, tested behavior, and careful engineering decisions.</li><li><strong>Intelligence integration:</strong> ML systems that are measurable, explainable, and useful in context.</li><li><strong>Continuous delivery:</strong> Small iterations, automation, and infrastructure that keeps momentum.</li></ul></section><section className="readme-journey"><h2>About Yash's Journey</h2><p>Yash is pursuing an Integrated M.Tech in Computer Science and Engineering at Vellore Institute of Technology. His work spans backend development, applied ML, simulation, real-time multiplayer systems, and data-intensive applications.</p><p>Across Pronader and Bunny Infinite, he has built moderation platforms, performance watchdogs, telemetry dashboards, and asynchronous control systems. Outside coursework, he keeps learning through ambitious projects, certifications, and a published deepfake-detection patent.</p></section><ContributionHeatmap /></article> }
function ContributionHeatmap() { const heatmapUrl = 'https://leetcard.jacoblin.cool/YashAjayKhandelwal?theme=dark&font=DM%20Mono&ext=heatmap'; return <section className="contributions"><div className="contributions-head"><span>⌘ leetcode.com/u/YashAjayKhandelwal</span><b>Live profile activity</b></div><a className="leetcode-card-link" href="https://leetcode.com/u/YashAjayKhandelwal/" target="_blank" rel="noreferrer"><img className="leetcode-heatmap" src={heatmapUrl} alt="Yash Ajay Khandelwal LeetCode statistics and activity heatmap" /></a><div className="contributions-foot"><span>Live data from Yash's public LeetCode profile.</span><a href="https://leetcode.com/u/YashAjayKhandelwal/" target="_blank" rel="noreferrer">Open LeetCode profile ↗</a></div></section> }
function Experience() { return <article className="document experience-document"><div className="experience-title"><h1>Experience Timeline</h1><p>Buffer: experience_timeline.json <span>(Source: Resume Experience DB)</span></p></div><div className="timeline"><Job period="Aug 2025 — Oct 2025" role="Freelance Software Developer" company="Pronader" stack="TypeScript · Node.js · Express · SQLite"><li>Built a live chat moderation platform around the YouTube Data API v3.</li><li>Designed REST APIs for moderation rules, blacklist management, and dashboard operations.</li><li>Added async validation for spam detection and duplicate filtering with persistent cross-stream storage.</li></Job><Job period="Feb 2024 — Mar 2024" role="Freelance Software Developer" company="Bunny Infinite" stack="C++ · Windows API · PresentMon · Gemini API"><li>Built a Windows game-performance watchdog monitoring FPS, CPU/memory, and system pressure in real time.</li><li>Engineered deterministic remediation rules with Gemini recommendations and allow-listed corrective fixes.</li><li>Created an async local control server with a worker pool, REST APIs, telemetry dashboard, and FPS overlay.</li></Job></div></article> }
function Job({ period, role, company, stack, children }) { return <div className="job"><div className="job-marker" /><div className="job-content"><span className="period">{period}</span><h2>{role}</h2><h3>{company}</h3><div className="stack">{stack}</div><ul>{children}</ul></div></div> }
function Skills({ openAssistant }) {
  const modules = [
    {
      name: 'Languages',
      items: [
        ['C', 90, 'Procedural logic, memory-aware routines, and core algorithmic problem solving.'],
        ['C++', 88, 'Object-oriented programming, STL patterns, complex data structures, and performance work.'],
        ['Java', 85, 'Object-oriented application logic, typed services, and academic systems programming.'],
        ['Python', 88, 'Data scripting, AI structures, analytics, and rapid system prototyping.'],
      ],
    },
    {
      name: 'Frontend',
      items: [
        ['ReactJS', 90, 'Modular functional components, stateful interfaces, custom hooks, and Vite panels.'],
        ['NextJS', 80, 'Static site compilation, client-server routing, structured pages, and app shells.'],
        ['Material UI', 85, 'Clean theme components, customizable styles, and accessible interaction states.'],
        ['Styled Components', 80, 'Component-scoped styling, reusable variants, and polished responsive views.'],
      ],
    },
    {
      name: 'Backend',
      items: [
        ['NodeJS', 88, 'Event-driven services, local control servers, async workflows, and API orchestration.'],
        ['ExpressJS', 86, 'REST endpoints, middleware structure, validation flows, and dashboard operations.'],
        ['FastAPI', 76, 'Python API development, typed request models, and ML-adjacent service layers.'],
      ],
    },
    {
      name: 'Data & ML',
      items: [
        ['TensorFlow / Keras', 78, 'Training workflows, model evaluation, and conversion-ready inference pipelines.'],
        ['ONNX', 80, 'Low-latency runtime deployment embedded into simulation and application workflows.'],
        ['Pandas / NumPy', 86, 'Feature engineering, data cleaning, metrics, and repeatable analysis scripts.'],
      ],
    },
  ]
  return (
    <article className="skills-document ganesh-skills">
      <div className="skills-title">
        <h1>Dynamic Skills Index</h1>
        <p>Buffer: skills_dashboard.tsx <span>(Updated: Realtime Audit)</span></p>
      </div>
      <div className="skills-module-grid">
        {modules.map((module) => (
          <section className="skills-module" key={module.name}>
            <div className="module-heading"><h2>{module.name} Module</h2><Award size={16} /></div>
            {module.items.map(([name, mastery, description]) => (
              <div className="skill-meter" key={name}>
                <div className="meter-label"><strong><i />{name}</strong><span>{mastery}% Mastery</span></div>
                <div className="meter-track"><span style={{ width: `${mastery}%` }} /></div>
                <p>{description}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
      <div className="skills-verification">
        <div className="verification-copy"><div><Award size={16} /><strong>FRANZ HERMANN'S AI VERIFICATION</strong></div><p>Ask Franz Hermann to validate the stack against a project, role, or production problem.</p></div>
        <button onClick={openAssistant}>Ask Franz Hermann <ChevronRight size={16} /></button>
      </div>
    </article>
  )
}
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  const send = async (event) => {
  event.preventDefault()
  setStatus('sending')

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_hrikg2k',
        template_id: 'template_cqtkpzr',
        user_id: 'u3wb7gio5MneeUsYq',
        template_params: {
          name: form.name,
          email: form.email,
          title: form.title || 'Portfolio inquiry',
          message: form.message,
        },
      }),
    })

    if (!response.ok) throw new Error('Send failed')

    setStatus('sent')
    setForm({ name: '', email: '', topic: '', message: '' })
  } catch (err) {
    setStatus('error')
  }
}
  return (
    <article className="contact-document">
      <div className="contact-title"><div><h1>Launch Contact Interface</h1><p>Buffer: contact_form.txt (Status: Write-Mode Allowed)</p></div></div>
      <section className="contact-form-card">
        <p className="contact-comment">// Submit a direct message into Yash's console channel</p>
        <form onSubmit={send}>
          <label>NAME <span>(string)</span><input value={form.name} onChange={update('name')} placeholder="E.g. Elon Musk" required /></label>
          <label>EMAIL_ADDRESS <span>(string)</span><input type="email" value={form.email} onChange={update('email')} placeholder="email@domain.com" required /></label>
          <label>TOPIC <span>(string)</span><input value={form.topic} onChange={update('topic')} placeholder="Inquiry / Hires / Collabs" /></label>
          <label>MESSAGE_BODY <span>(string[])</span><textarea value={form.message} onChange={update('message')} placeholder="Write details of your proposal here..." required /></label>
          <button className="send-message" type="submit" disabled={status === 'sending'}>
            <Send size={16} /> {status === 'sending' ? 'SENDING...' : 'SEND_MESSAGE()'}
          </button>
          {status === 'sent' && <p className="sent-status">Message sent directly to Yash's inbox.</p>}
          {status === 'error' && <p className="sent-status sent-status-error">Something went wrong — please try again or email directly.</p>}
        </form>
      </section>
      <section className="direct-contacts"><h2>Direct Contact channels:</h2><div><a href="mailto:yash.ajay05@gmail.com"><Mail size={14} /> <span>Email:<b>yash.ajay05@gmail.com</b></span></a><a href="https://github.com/codeknight05" target="_blank" rel="noreferrer"><Code2 size={14} /> <span>GitHub:<b>github.com/codeknight05</b></span></a><a href="https://linkedin.com/in/yashkhandelwal005/" target="_blank" rel="noreferrer"><LinkedinIcon /> <span>LinkedIn:<b>linkedin.com/in/yashkhandelwal005</b></span></a><a href="tel:+919730588865"><MessageSquare size={14} /> <span>Phone:<b>+91 97305 88865</b></span></a></div></section>
    </article>
  )
}
function Resume() {
  const experiences = [
    {
      role: 'Freelance Software Developer',
      company: 'Pronader',
      period: '08/2025 — 10/2025',
      bullets: [
        'Built a live chat moderation platform centered around the YouTube Data API v3.',
        'Designed REST APIs for moderation rules, blacklist management, and dashboard operations.',
        'Added async validation for spam detection and duplicate filtering with persistent cross-stream storage.',
      ],
    },
    {
      role: 'Freelance Software Developer',
      company: 'Bunny Infinite',
      period: '02/2024 — 03/2024',
      bullets: [
        'Built a Windows game-performance watchdog monitoring FPS, CPU/memory, and system pressure in real time.',
        'Engineered deterministic remediation rules with Gemini recommendations and allow-listed corrective fixes.',
        'Created an async local control server with a worker pool, REST APIs, telemetry dashboard, and FPS overlay.',
      ],
    },
  ]

  return (
    <article className="document resume-document">
      <div className="resume-header">
        <div>
          <h1>Credentials &amp; Resume Center</h1>
          <p>Buffer: resume_center.pdf <span>(Formatted Highlights)</span></p>
        </div>
        <a
          href="/resume-alpine-swe.pdf"
          target="_blank"
          rel="noreferrer"
          className="download-pdf-btn"
        >
          <Download size={14} /> Download PDF Resume
        </a>
      </div>

      <div className="resume-card">
        <div className="resume-hero">
          <h2>Yash Ajay Khandelwal</h2>
          <div className="resume-subtitle">
            SOFTWARE DEVELOPER | AI/ML SOLUTIONS | PATENT HOLDER
          </div>
          <div className="resume-contacts">
            <span><Mail size={13} /> yash.ajay05@gmail.com</span>
            <span><MapPin size={13} /> Mumbai, Maharashtra, India</span>
          </div>
        </div>

        <section className="resume-section">
          <h3 className="resume-section-title">
            <Bookmark size={15} /> EXECUTIVE BIO SUMMARY
          </h3>
          <p className="resume-bio">
            Integrated M.Tech Computer Science student at VIT with practical depth across software engineering, applied machine learning, and real-time systems. Experienced in building full-stack products, low-latency ONNX inference pipelines, microservices, and game telemetry watchdogs.
          </p>
        </section>

        <section className="resume-section">
          <h3 className="resume-section-title">
            <Briefcase size={15} /> KEY WORK EXPERIENCES
          </h3>
          <div className="resume-experiences-list">
            {experiences.map((exp, index) => (
              <div className="resume-exp-item" key={index}>
                <div className="exp-head">
                  <div className="exp-role-title">
                    <strong>{exp.role}</strong> — <em>{exp.company}</em>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <ul>
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h3 className="resume-section-title">
            <GraduationCap size={15} /> EDUCATION PATH
          </h3>
          <div className="resume-edu-card">
            <div>
              <h4>Integrated M.Tech Computer Science Engineering</h4>
              <p>Vellore Institute of Technology</p>
            </div>
            <span className="edu-period">2022 — 2027</span>
          </div>
        </section>
      </div>
    </article>
  )
}

function CertificationsView({ selectedCert, setSelectedCert }) {
  const currentCert = selectedCert || certifications[0]

  return (
    <article className="document certifications-document">
      <div className="cert-doc-header">
        <div>
          <h1>Certifications &amp; Patent Registry</h1>
          <p>Buffer: certifications_index.json <span>(Verified Records)</span></p>
        </div>
        <div className="cert-count-badge">
          {certifications.length} Verified Credentials
        </div>
      </div>

      <div className="cert-tabs">
        {certifications.map((item) => (
          <button
            className={`cert-tab ${currentCert.id === item.id ? 'active' : ''}`}
            key={item.id}
            onClick={() => setSelectedCert(item)}
          >
            <item.icon size={14} color={item.color} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className="cert-detail-card">
        <div className="cert-top-row">
          <span className="cert-badge-type" style={{ color: currentCert.color, borderColor: currentCert.color }}>
            {currentCert.type}
          </span>
          <span className="cert-date">{currentCert.date}</span>
        </div>

        <h2>{currentCert.title}</h2>
        <div className="cert-issuer">Issued by <strong>{currentCert.issuer}</strong></div>

        {currentCert.credentialId && (
          <div className="cert-cred-id">
            Credential ID: <b>{currentCert.credentialId}</b> (Verify: <code>certiport.com</code>)
          </div>
        )}

        {currentCert.appNumber && (
          <div className="cert-cred-id patent-id">
            Application No: <b>{currentCert.appNumber}</b> · Applicant: <b>{currentCert.applicant}</b>
          </div>
        )}

        <p className="cert-desc">{currentCert.description}</p>

        <div className="cert-skills-section">
          <h3>Associated Skills &amp; Domain</h3>
          <div className="tag-list">
            {currentCert.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="cert-grid-all">
        <h3>All Credentials &amp; Patent ({certifications.length})</h3>
        <div className="cert-cards-grid">
          {certifications.map((item) => (
            <button
              className={`cert-grid-card ${currentCert.id === item.id ? 'selected' : ''}`}
              key={item.id}
              onClick={() => setSelectedCert(item)}
            >
              <div className="cert-grid-top">
                <item.icon size={18} color={item.color} />
                <span className="cert-grid-type" style={{ color: item.color }}>{item.type}</span>
              </div>
              <h4>{item.title}</h4>
              <div className="cert-grid-meta">
                <span>{item.issuer}</span>
                <small>{item.date}</small>
              </div>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

function ProjectView({ project, close, openAssistant }) {
  return (
    <article className="document project-detail-doc">
      <button className="back-button" onClick={close}>← back to workspace</button>
      
      <div className="proj-header-row">
        <div className="proj-header-main">
          <span className="proj-type-badge" style={{ color: project.color, borderColor: `${project.color}66` }}>
            {project.type}
          </span>
          <h1>{project.title}</h1>
          <span className="proj-file-tag">/ projects / {project.name}</span>
        </div>
        <div className="proj-actions">
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="proj-action-btn source">
              <Code2 size={14} /> Source Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="proj-action-btn live">
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>

      {project.descriptor && (
        <div className="proj-descriptor-box" style={{ borderColor: `${project.color}44`, background: `${project.color}0d` }}>
          <Zap size={16} color={project.color} />
          <span>{project.descriptor}</span>
        </div>
      )}

      <div className="proj-main-grid">
        <div className="proj-content-col">
          <section className="proj-card">
            <h3>Overview</h3>
            <p>{project.overview}</p>
          </section>

          {project.features && project.features.length > 0 && (
            <section className="proj-card">
              <h3>Key Features</h3>
              <ul>
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {project.challenge && (
            <section className="proj-card proj-challenge-card">
              <h3>Engineering Challenges &amp; Solutions</h3>
              <p>{project.challenge}</p>
            </section>
          )}
        </div>

        <div className="proj-sidebar-col">
          {project.stackList && (
            <section className="proj-card">
              <h3>Tech Stack</h3>
              <div className="tag-list">
                {project.stackList.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </section>
          )}

          {project.architecture && (
            <section className="proj-card">
              <h3>System Architecture</h3>
              <p>{project.architecture}</p>
            </section>
          )}

          {project.learnings && (
            <section className="proj-card">
              <h3>Key Learnings</h3>
              <p>{project.learnings}</p>
            </section>
          )}
        </div>
      </div>

      <div className="proj-ai-footer">
        <div className="proj-ai-copy">
          <div>
            <Sparkles size={16} color="#f0c47a" />
            <strong>FRANZ HERMANN AI ASSISTANT</strong>
          </div>
          <p>Want to explore how {project.title} works under the hood or ask specific architecture questions?</p>
        </div>
        <button onClick={() => openAssistant?.(`Tell me about ${project.title}`)}>
          Ask Franz Hermann <ChevronRight size={15} />
        </button>
      </div>
    </article>
  )
}
function DocHeader({ icon: Icon, title, subtitle }) { return <div className="doc-header"><Icon size={18} /><div><b>{title}</b><span>{subtitle}</span></div><div className="doc-dots">•••</div></div> }
function Info({ icon: Icon, label, value }) { return <div className="info"><Icon size={17} /><small>{label}</small><b>{value}</b></div> }
function Terminal({ lines, value, setValue, runCommand, close }) { return <section className="terminal"><div className="terminal-head"><span><TerminalIcon size={15} /> Terminal Drawer <small>(bash · port 3000)</small></span><div><button onClick={close}><X size={15} /></button></div></div><div className="terminal-body">{lines.map((line, i) => <div key={`${line}-${i}`} className={i % 2 ? 'terminal-dim' : ''}>{line}</div>)}<form onSubmit={runCommand}><span>yash@portfolio:~$</span><input value={value} onChange={(event) => setValue(event.target.value)} autoComplete="off" autoFocus /></form></div></section> }
function CommandPalette({ query, setQuery, items, selectedIndex, onSelect, close }) {
  return (
    <div className="command-palette-overlay" onMouseDown={close}>
      <div className="command-palette" onMouseDown={(event) => event.stopPropagation()}>
        <div className="command-palette-search">
          <span>▶</span>
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search files and available commands (e.g., projects, experience, reset)" />
        </div>
        <div className="command-palette-list">
          {items.length ? items.map((item, index) => {
            const Icon = item.icon || FileCode2
            return (
              <button
                className={`command-palette-item ${index === selectedIndex ? 'active' : ''}`}
                key={`${item.hint}-${item.label}`}
                onMouseEnter={() => {}}
                onClick={() => onSelect(item)}
              >
                <Icon size={15} color={item.color || '#c5ced9'} />
                <strong>{item.label}</strong>
                <span>{item.hint}</span>
              </button>
            )
          }) : <div className="command-palette-empty">No matching commands</div>}
        </div>
        <div className="command-palette-footer">
          <span>Use <kbd>↑↓</kbd> keys to navigate, <kbd>Enter</kbd> to execute</span>
          <span><kbd>ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  )
}

function Assistant({ messages, input, setInput, ask, close }) { return <aside className="assistant-panel"><div className="assistant-head"><span><Sparkles size={16} /> Franz Hermann <small>portfolio context</small></span><button onClick={close}><X size={16} /></button></div><div className="assistant-messages">{messages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}>{message.text}</div>)}</div><div className="assistant-suggestions"><button onClick={() => ask('What skills does Yash have?')}>Skills</button><button onClick={() => ask('Tell me about the projects')}>Projects</button><button onClick={() => ask('How can I contact Yash?')}>Contact</button></div><form className="assistant-form" onSubmit={(event) => { event.preventDefault(); ask(input) }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask Franz Hermann about this portfolio..." /><button aria-label="Send question"><Send size={15} /></button></form></aside> }
function LinkedinIcon() { return <span className="linkedin-icon">in</span> }
function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}
function LeetcodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.823-.662l-4.344-4.35c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.344-4.35c.466-.467 1.102-.663 1.823-.663.72 0 1.357.196 1.823.663l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.519c-.569-.569-1.778-1.257-3.454-1.294l1.185-1.186c.551-.551.551-1.443 0-1.994s-1.443-.551-1.994 0L5.45 9.663c-1.065 1.064-1.65 2.527-1.65 4.019s.585 2.955 1.65 4.019l4.344 4.35c1.065 1.065 2.527 1.65 4.019 1.65 1.493 0 2.955-.585 4.019-1.65l2.697-2.606c.514-.515.496-1.366-.039-1.901-.534-.535-1.385-.553-1.388-.614z" />
    </svg>
  )
}

function SettingsPanel({ close, terminalOpen, setTerminalOpen, setSidebar, sidebar, openAssistant, currentTheme, selectTheme }) {
  const shortcuts = [
    { keys: ['Ctrl', 'P'], label: 'Go to file' },
    { keys: ['Ctrl', '`'], label: 'Toggle terminal' },
    { keys: ['Ctrl', 'B'], label: 'Toggle sidebar' },
    { keys: ['Esc'], label: 'Close overlay' },
    { keys: ['↑', '↓'], label: 'Terminal history' },
  ]
  return (
    <div className="settings-overlay" onClick={close}>
      <aside className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-head">
          <span><Settings size={15} /> Preferences &amp; Settings</span>
          <button onClick={close}><X size={16} /></button>
        </div>
        <div className="settings-body">
          <div className="settings-section-label">COLOR THEME</div>
          <div className="settings-themes">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                className={`settings-theme-item ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => selectTheme(theme.id)}
              >
                <span>{theme.emoji} {theme.name}</span>
                {currentTheme === theme.id && <span className="theme-check">✓</span>}
              </button>
            ))}
          </div>

          <div className="settings-section-label">QUICK ACTIONS</div>
          <div className="settings-actions">
            <button className="settings-action-item" onClick={() => { setSidebar(!sidebar); close() }}>
              <span>🖥 {sidebar ? 'Hide Sidebar' : 'Show Sidebar'}</span>
              <kbd>Ctrl+B</kbd>
            </button>
            <button className="settings-action-item" onClick={() => { setTerminalOpen(!terminalOpen); close() }}>
              <span>🖥 Toggle Terminal</span>
              <kbd>Ctrl+`</kbd>
            </button>
            <button className="settings-action-item" onClick={openAssistant}>
              <span><Sparkles size={13} /> Franz Hermann AI Chat</span>
            </button>
            <a className="settings-action-item" href="/resume-alpine-swe.pdf" target="_blank" rel="noreferrer" onClick={close}>
              <span>📄 Download Resume</span>
            </a>
            <a className="settings-action-item" href="https://github.com/codeknight05" target="_blank" rel="noreferrer" onClick={close}>
              <span>⑂ GitHub Profile</span>
            </a>
            <a className="settings-action-item" href="https://linkedin.com/in/yashkhandelwal005/" target="_blank" rel="noreferrer" onClick={close}>
              <span>in LinkedIn Profile</span>
            </a>
            <a className="settings-action-item" href="https://leetcode.com/u/YashAjayKhandelwal/" target="_blank" rel="noreferrer" onClick={close}>
              <span>🧩 LeetCode Profile</span>
            </a>
          </div>

          <div className="settings-section-label">KEYBOARD SHORTCUTS</div>
          <div className="settings-shortcuts">
            {shortcuts.map((s, i) => (
              <div key={i} className="settings-shortcut-row">
                <span className="shortcut-keys">{s.keys.map((k) => <kbd key={k}>{k}</kbd>)}</span>
                <span className="shortcut-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="settings-footer">
            <p>Portfolio v3.0 · React + Vite</p>
            <p>Built with 💜 by Yash Ajay Khandelwal</p>
          </div>

          <button className="settings-ai-row" onClick={openAssistant}>
            <Sparkles size={14} color="#f0c47a" /> <strong>Franz Hermann AI</strong>
            <span className="settings-ai-badge">AI</span>
          </button>
        </div>
      </aside>
    </div>
  )
}

export default App