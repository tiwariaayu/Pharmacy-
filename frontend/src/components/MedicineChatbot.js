import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/MedicineChatbot.css';

const MedicineChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const messagesEndRef = useRef(null);
    const chatWindowRef = useRef(null);
    const location = useLocation();

    // Symptom categories
    const symptomCategories = {
        'General': ['fever', 'headache', 'fatigue', 'body ache'],
        'Respiratory': ['cough', 'cold', 'sore throat', 'breathing difficulty'],
        'Digestive': ['nausea', 'diarrhea', 'constipation', 'stomach pain'],
        'Pain': ['headache', 'muscle pain', 'joint pain', 'back pain'],
        'Mental Health': ['anxiety', 'depression', 'insomnia', 'stress'],
        'Chronic Conditions': ['hypertension', 'diabetes', 'allergy', 'asthma']
    };

    // Sample medicine database
    const medicineDatabase = {
        'fever': ['Paracetamol', 'Ibuprofen', 'Aspirin'],
        'headache': ['Paracetamol', 'Ibuprofen', 'Aspirin'],
        'cough': ['Dextromethorphan', 'Guaifenesin', 'Bromhexine'],
        'cold': ['Pseudoephedrine', 'Chlorpheniramine', 'Phenylephrine'],
        'sore throat': ['Benzocaine', 'Lidocaine', 'Strepsils'],
        'nausea': ['Dimenhydrinate', 'Ondansetron', 'Metoclopramide'],
        'diarrhea': ['Loperamide', 'Bismuth subsalicylate', 'Oral rehydration solution'],
        'constipation': ['Bisacodyl', 'Senna', 'Lactulose'],
        'muscle pain': ['Ibuprofen', 'Diclofenac', 'Naproxen'],
        'allergy': ['Cetirizine', 'Loratadine', 'Fexofenadine'],
        'insomnia': ['Melatonin', 'Diphenhydramine', 'Doxylamine'],
        'anxiety': ['Benzodiazepines', 'Buspirone', 'Hydroxyzine'],
        'depression': ['SSRIs', 'SNRIs', 'Bupropion'],
        'hypertension': ['ACE inhibitors', 'Beta blockers', 'Calcium channel blockers'],
        'diabetes': ['Metformin', 'Sulfonylureas', 'DPP-4 inhibitors']
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target) && 
                !event.target.classList.contains('chatbot-toggle')) {
                setIsOpen(false);
                setShowWelcome(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Auto-open chatbot on homepage
    useEffect(() => {
        if (location.pathname === '/') {
            const timer = setTimeout(() => {
                setIsOpen(true);
                setShowWelcome(true);
                setTimeout(() => {
                    setMessages([
                        { type: 'bot', text: 'Hi! I am Medi-Mitra, your medicine suggestion assistant. I can help you find medicines based on your symptoms. What symptoms are you experiencing?' }
                    ]);
                }, 500);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [location.pathname]);

    const handleToggle = () => {
        if (!isOpen) {
            setShowWelcome(true);
            setTimeout(() => {
                setMessages([
                    { type: 'bot', text: 'Hi! I am Medi-Mitra, your medicine suggestion assistant. I can help you find medicines based on your symptoms. What symptoms are you experiencing?' }
                ]);
            }, 500);
        } else {
            setShowWelcome(false);
        }
        setIsOpen(!isOpen);
    };

    const handleCategorySelect = (category) => {
        const symptoms = symptomCategories[category];
        const message = `Common symptoms in ${category}:\n${symptoms.join(', ')}\n\nPlease select or describe your specific symptoms.`;
        setMessages(prev => [...prev, { type: 'bot', text: message }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage = { type: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Process symptoms and find medicines
        setTimeout(() => {
            const symptoms = input.toLowerCase().split(/[,\s]+/);
            const suggestedMedicines = new Set();

            symptoms.forEach(symptom => {
                if (medicineDatabase[symptom]) {
                    medicineDatabase[symptom].forEach(medicine => {
                        suggestedMedicines.add(medicine);
                    });
                }
            });

            let botResponse;
            if (suggestedMedicines.size > 0) {
                botResponse = {
                    type: 'bot',
                    text: `Based on your symptoms, here are some suggested medicines:\n${Array.from(suggestedMedicines).join(', ')}\n\nPlease consult a healthcare professional before taking any medication.`
                };
            } else {
                botResponse = {
                    type: 'bot',
                    text: "I couldn't find specific medicines for your symptoms. Please consult a healthcare professional for proper diagnosis and treatment."
                };
            }

            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    const formatMessage = (text) => {
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            <button 
                className="chatbot-toggle"
                onClick={handleToggle}
            >
                {isOpen ? '×' : '💊'}
            </button>
            
            <div className="chatbot-window" ref={chatWindowRef}>
                <div className="chatbot-header">
                    <h3>Medi-Mitra</h3>
                    <p>Your Medicine Suggestion Assistant</p>
                </div>
                
                <div className="chatbot-messages">
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`message ${message.type}`}
                        >
                            {formatMessage(message.text)}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="symptom-categories">
                    {Object.keys(symptomCategories).map((category) => (
                        <button
                            key={category}
                            className="category-button"
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="chatbot-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your symptoms..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>

            {showWelcome && (
                <div className="welcome-message">
                    Hi! I am Medi-Mitra
                </div>
            )}
        </div>
    );
};

export default MedicineChatbot; 