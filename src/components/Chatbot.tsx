import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface FAQ {
  keywords: string[];
  answer: string;
  category: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm Charm's AI assistant. I can answer questions about his services, experience, projects, and availability. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqs: FAQ[] = [
    {
      keywords: ["who", "about", "yourself", "you", "charm", "introduce"],
      answer: "I'm Charm Thiekshana Perera, the best freelance web developer in Sri Lanka! I'm a Senior Frontend Developer with 5+ years of experience specializing in React, iOS & Android development, and AI integration. I hold a BSc (Honours) in Information Technology from SLIIT and currently work at Phyxle while running my own startup, Nesture Labs.",
      category: "about",
    },
    {
      keywords: ["services", "offer", "do", "provide", "development"],
      answer: "I offer comprehensive web and mobile development services including: ✓ Custom React Web Applications ✓ iOS & Android Mobile Apps ✓ React Native Development ✓ AI Integration & Chatbots ✓ E-commerce Solutions ✓ UI/UX Design & Implementation ✓ API Development & Integration ✓ Performance Optimization ✓ Full-Stack Development. All services are tailored to your business needs with competitive Sri Lankan rates!",
      category: "services",
    },
    {
      keywords: ["experience", "work", "worked", "background", "career"],
      answer: "I have 5+ years of professional experience. Currently, I'm a Senior Frontend Developer at Phyxle and Founder of Nesture Labs. My expertise includes developing high-performance mobile apps (with apps on Google Play Store like Lifesaylor), React web applications, and AI-powered solutions. I've successfully delivered 20+ projects for clients worldwide.",
      category: "experience",
    },
    {
      keywords: ["projects", "portfolio", "work samples", "examples", "built"],
      answer: "I've built 20+ projects including: 🚀 Lifesaylor - Daily motivation mobile app on Google Play Store 📱 E-Commerce Platforms with payment integration 🏥 Healthcare Management Systems 🤖 AI-Powered Analytics Dashboards 🍽️ Restaurant Management Suites 🏠 Real Estate Portals 💪 Fitness Tracker Apps. Check out the Projects section on my website to see detailed case studies!",
      category: "projects",
    },
    {
      keywords: ["skills", "technologies", "tech stack", "tools", "programming"],
      answer: "My technical expertise includes: Frontend: React, TypeScript, JavaScript, Vite, HTML5, CSS3, Tailwind CSS | Mobile: React Native, Android (Java/Kotlin), iOS (Swift) | Backend: Node.js, Python, API Integration | Database: MongoDB, PostgreSQL, Firebase | Cloud: AWS, CI/CD, Web Hosting | AI: Machine Learning integration, ChatGPT, AI-powered features | Tools: Git, Agile/Scrum, Testing frameworks",
      category: "skills",
    },
    {
      keywords: ["cost", "price", "pricing", "rate", "charge", "budget", "affordable"],
      answer: "As a freelance developer in Sri Lanka, I offer highly competitive rates without compromising quality! Pricing varies based on project complexity, timeline, and requirements. I provide: 💰 Cost-effective solutions compared to Western developers 🎯 Transparent pricing with no hidden costs ⚡ Flexible packages for startups to enterprises 📊 Free initial consultation and project estimation. Contact me to discuss your specific needs and get a customized quote!",
      category: "pricing",
    },
    {
      keywords: ["hire", "available", "availability", "freelance", "remote"],
      answer: "Yes, I'm available for freelance projects! I'm based in Colombo, Sri Lanka, and work with clients globally. I offer: ✅ Remote collaboration (flexible timezone) ✅ Full-time or part-time engagements ✅ Project-based or ongoing retainer arrangements ✅ Quick turnaround times. Contact me via email (charmthiekshana97@gmail.com), phone (+94 754 465 955), or WhatsApp to discuss your project!",
      category: "availability",
    },
    {
      keywords: ["contact", "reach", "email", "phone", "whatsapp", "message"],
      answer: "You can reach me through multiple channels: 📧 Email: charmthiekshana97@gmail.com 📱 Phone/WhatsApp: +94 754 465 955 💼 LinkedIn: linkedin.com/in/charmthiekshana 💻 GitHub: github.com/CharmThiekshanaPerera 🌐 Location: Colombo, Sri Lanka. I typically respond within 24 hours. For urgent inquiries, WhatsApp is the fastest way to reach me!",
      category: "contact",
    },
    {
      keywords: ["mobile app", "ios", "android", "app development", "react native"],
      answer: "Mobile app development is one of my core specialties! I build native iOS and Android apps as well as cross-platform solutions using React Native. My apps feature: 📱 Beautiful, intuitive UI/UX design 🚀 High performance and smooth animations ✅ App Store & Google Play Store deployment 🔔 Push notifications & real-time features 💾 Offline functionality 🔐 Secure authentication. I have multiple apps live on Google Play Store, including Lifesaylor with thousands of users!",
      category: "mobile",
    },
    {
      keywords: ["react", "web", "website", "web development", "frontend"],
      answer: "I'm a React expert with extensive experience building modern web applications! I create: 🎨 Responsive, mobile-first designs ⚡ Lightning-fast performance with Vite 🎯 SEO-optimized websites 🛠️ Component-based architecture 🔄 State management (Redux, Context) 📊 Data visualization & dashboards 🌐 Progressive Web Apps (PWA) 🎭 Smooth animations & transitions. Whether you need a landing page, e-commerce site, or complex SaaS application, I've got you covered!",
      category: "web",
    },
    {
      keywords: ["ai", "artificial intelligence", "machine learning", "chatbot", "gpt"],
      answer: "I integrate cutting-edge AI features into applications! My AI services include: 🤖 ChatGPT & GPT-4 integration 💬 Custom chatbots & virtual assistants 🧠 Machine learning model integration 📊 AI-powered analytics & predictions 🎯 Recommendation systems 🔍 Natural language processing 🖼️ Image recognition & processing. I can help you leverage AI to automate workflows, enhance user experience, and gain business insights!",
      category: "ai",
    },
    {
      keywords: ["education", "degree", "qualification", "university", "sliit"],
      answer: "I hold a Bachelor of Science (Honours) in Information Technology from the Sri Lanka Institute of Information Technology (SLIIT), one of Sri Lanka's premier IT universities. This strong academic foundation, combined with 5+ years of hands-on industry experience, gives me both theoretical knowledge and practical expertise to tackle complex development challenges.",
      category: "education",
    },
    {
      keywords: ["sri lanka", "location", "colombo", "local", "country"],
      answer: "I'm proudly based in Colombo, Sri Lanka 🇱🇰! As the best freelance web developer in Sri Lanka, I offer several advantages: 💰 Competitive rates compared to Western developers ⏰ Flexible working hours across timezones 🗣️ Excellent English communication skills 🌏 Experience working with international clients 📍 Available for local meetups in Colombo 🚀 Fast delivery with Sri Lankan work ethic. I serve both local Sri Lankan businesses and international clients worldwide!",
      category: "location",
    },
    {
      keywords: ["startup", "nesture", "nesturelabs", "company", "business"],
      answer: "I'm the Founder & Lead Developer of Nesture Labs, my own software development startup! Through Nesture Labs, I've delivered numerous successful projects including e-commerce platforms, healthcare systems, and AI-powered applications. Running my own startup gives me valuable experience in understanding business needs, meeting deadlines, and delivering solutions that drive real business value. I bring this entrepreneurial mindset to every project I work on!",
      category: "startup",
    },
    {
      keywords: ["timeline", "time", "duration", "how long", "delivery"],
      answer: "Project timelines vary based on complexity and requirements: ⚡ Simple landing pages: 1-2 weeks 📱 Mobile apps: 4-12 weeks 🌐 Complex web applications: 8-16 weeks 🏢 Enterprise solutions: 3-6 months. I provide detailed project timelines during consultation and maintain transparent communication throughout development. I'm committed to meeting deadlines while ensuring quality. For urgent projects, I can accommodate rush timelines with priority scheduling!",
      category: "timeline",
    },
    {
      keywords: ["process", "workflow", "how", "methodology", "approach"],
      answer: "My development process ensures quality and transparency: 1️⃣ Discovery Call: Understand your requirements and goals 2️⃣ Proposal & Quote: Detailed scope and timeline 3️⃣ Design Phase: UI/UX mockups for approval 4️⃣ Development: Agile sprints with regular updates 5️⃣ Testing: Comprehensive QA and bug fixes 6️⃣ Deployment: Launch to production 7️⃣ Support: Post-launch maintenance and updates. I use Agile/Scrum methodology with weekly progress reports and constant communication!",
      category: "process",
    },
    {
      keywords: ["payment", "pay", "invoice", "billing", "terms"],
      answer: "I offer flexible payment terms for your convenience: 💳 Payment methods: Bank transfer, PayPal, Wise, Payoneer 📋 Standard terms: 50% upfront, 50% on completion 🔄 For ongoing work: Monthly retainer arrangements 💰 For large projects: Milestone-based payments. All payments are secure and invoiced properly. I'm transparent about costs with no hidden fees. Let's discuss the payment structure that works best for your project!",
      category: "payment",
    },
    {
      keywords: ["maintenance", "support", "updates", "after", "post-launch"],
      answer: "I provide comprehensive post-launch support: 🛠️ Bug fixes and technical support 🔄 Feature updates and enhancements 📈 Performance monitoring and optimization 🔐 Security updates 📊 Analytics and reporting 💾 Regular backups 📱 App store management (for mobile apps). I offer both one-time fixes and ongoing monthly maintenance packages. Your project's success doesn't end at launch - I'm here for the long term!",
      category: "support",
    },
    {
      keywords: ["testimonial", "review", "client", "feedback", "reference"],
      answer: "I've worked with numerous satisfied clients worldwide! Check the Testimonials section on my website to see reviews from clients like: Sarah Johnson (CEO, TechStart Inc), Michael Chen (Founder, HealthHub), Emma Williams (Director, E-Shop Plus), and many more. Clients praise my technical expertise, communication, deadline adherence, and problem-solving abilities. I can also provide direct references upon request!",
      category: "testimonials",
    },
    {
      keywords: ["why", "choose", "different", "better", "advantage"],
      answer: "Here's why clients choose me: ⭐ 5+ years of proven expertise in React & mobile development 🏆 Best freelance web developer in Sri Lanka 💼 Successfully delivered 20+ projects 🎓 SLIIT graduate with strong technical foundation 💰 Competitive rates with Western-quality work 🗣️ Excellent communication in English ⚡ Fast turnaround and deadline-oriented 🔄 Agile methodology with regular updates 🤝 Dedicated support and long-term partnership approach 🚀 Passionate about technology and client success. I don't just code - I solve business problems!",
      category: "why",
    },
  ];

  const quickOptions = [
    { label: "Services & Pricing", query: "What services do you offer?" },
    { label: "View Projects", query: "Show me your projects" },
    { label: "Availability", query: "Are you available for hire?" },
    { label: "Contact Info", query: "How can I contact you?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast.error("Voice feature unavailable");
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const findBestAnswer = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(input)) {
      return "Hello! 👋 I'm here to help you learn about Charm's services and experience. You can ask me about his work, skills, projects, availability, pricing, or anything else!";
    }

    // Check for thanks
    if (/thank|thanks|appreciate/.test(input)) {
      return "You're welcome! 😊 Feel free to ask if you have any other questions about Charm's services or need help getting in touch with him!";
    }

    let bestMatch = { faq: null as FAQ | null, score: 0 };

    faqs.forEach((faq) => {
      let score = 0;
      faq.keywords.forEach((keyword) => {
        if (input.includes(keyword.toLowerCase())) {
          score += 1;
        }
      });

      if (score > bestMatch.score) {
        bestMatch = { faq, score };
      }
    });

    if (bestMatch.faq && bestMatch.score > 0) {
      return bestMatch.faq.answer;
    }

    // Default response with suggestions
    return "I'm not quite sure about that specific question. Here's what I can help you with:\n\n• Services & Pricing 💼\n• Experience & Skills 🚀\n• Projects & Portfolio 📱\n• Availability for Hire ✅\n• Contact Information 📞\n• Technologies & Tools 💻\n• Education & Background 🎓\n\nTry asking about any of these topics, or use the quick options below!";
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = findBestAnswer(inputMessage);
      const botMessage: Message = {
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputMessage("");
  };

  const handleQuickOption = (query: string) => {
    setInputMessage(query);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-gold animate-bounce"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-96 h-[600px] max-h-[80vh] bg-card border-2 border-primary/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Charm's Assistant</h3>
                <p className="text-xs opacity-90">Always here to help!</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                stopSpeaking();
              }}
              className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  {message.sender === "bot" && (
                    <button
                      onClick={() => isSpeaking ? stopSpeaking() : speakText(message.text)}
                      className="mt-2 p-1 hover:bg-primary/10 rounded transition-colors"
                      aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options */}
          <div className="p-3 bg-secondary/30 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              {quickOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickOption(option.query)}
                  className="text-xs p-2 bg-card border border-primary/30 rounded-lg hover:bg-primary/10 hover:border-primary transition-all"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-card border-t-2 border-primary/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90 shadow-gold"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;