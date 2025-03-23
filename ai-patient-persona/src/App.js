import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

const apiKey = "tf315a00255a026o44c386706557b731"; // Replace with your actual API key

const App = () => {
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("Beginner");
  const [injuryDetails, setInjuryDetails] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [response, setResponse] = useState("");
  const [savedResponses, setSavedResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isTreatmentRecommendation, setIsTreatmentRecommendation] =
    useState(false);

  const fetchPatientResponse = async () => {
    if (
      !age ||
      !injuryDetails ||
      (!treatmentType && !isTreatmentRecommendation)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const prompt = isTreatmentRecommendation
      ? `I have a medical issue: ${injuryDetails}. I need treatment recommendations for it. Please provide suggestions.`
      : `Imagine you are an ACL injury patient sharing your personal journey. Your injury details: ${injuryDetails}. Treatment type: ${treatmentType}. Activity level: ${activityLevel}. Age: ${age} years old.`;

    try {
      const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
        prompt
      )}&key=${apiKey}`;
      const res = await axios.get(apiUrl);
      setResponse(res.data.answer || "No response available.");
    } catch {
      setResponse("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveResponse = () => {
    if (response) {
      setSavedResponses([...savedResponses, response]);
      alert("Response saved!");
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <h1>
        {" "}
        <img src="https://miachortho.com/_static-img/icon-ACL@2x.jpg" /> AI
        Injury Assistant
      </h1>

      <div className="input-button-container">
        <input
          type="number"
          placeholder="Enter patient's age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <textarea
          placeholder="Describe the medical issue (e.g., ACL injury)"
          value={injuryDetails}
          onChange={(e) => setInjuryDetails(e.target.value)}
        />

        <div className="action-buttons">
          <button onClick={fetchPatientResponse} disabled={loading}>
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              "Generate Response"
            )}
          </button>
          <button className="theme-toggle-btn" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {!isTreatmentRecommendation && (
        <input
          className="treatment-type-input"
          type="text"
          placeholder="Treatment type (e.g., Surgery, Physical Therapy)"
          value={treatmentType}
          onChange={(e) => setTreatmentType(e.target.value)}
        />
      )}

      <div>
        <label>
          <input
            type="checkbox"
            checked={isTreatmentRecommendation}
            onChange={() =>
              setIsTreatmentRecommendation(!isTreatmentRecommendation)
            }
          />
          Get Treatment Recommendations Instead
        </label>
      </div>

      {response && (
        <>
          <div className="response-box">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
          <button onClick={saveResponse}>Save Response</button>
        </>
      )}

      {savedResponses.length > 0 && (
        <div className="saved-responses">
          <h2>Saved Responses</h2>
          {savedResponses.map((res, index) => (
            <div key={index} className="saved-response">
              <ReactMarkdown>{res}</ReactMarkdown>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>
            Coded by <strong>Rukaiya Mustafizu Muhammad</strong> | Hosted on{" "}
            <a
              href="https://www.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Netlify
            </a>{" "}
            | Open-sourced on{" "}
            <a
              href="https://github.com/your-repo-url"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
