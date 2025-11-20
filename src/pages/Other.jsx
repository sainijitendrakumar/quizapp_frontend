import { useState, useEffect } from "react";
import useQuestions from "./useQuestions";
import { useNavigate, useParams } from "react-router-dom";

export default function Other() {
  const navigate = useNavigate();
  const { subject } = useParams();
  const { questions, loading, error } = useQuestions({ subject });
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); // 🆕 store user answers per question
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // total seconds

  // Timer logic
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // ❌ अगर token नहीं है → Login page पर भेज दो
    }
    if (finished) return;
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished]);

  const handleAnswer = (option) => {
    // 🆕 Update selected answer for the current question
    const updatedAnswers = [...answers];
    updatedAnswers[current] = option;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleFinish = () => {
    // 🧮 Calculate score when finishing
    let newScore = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) newScore++;
    });
    setScore(newScore);
    setFinished(true);
  };

  // ✅ Handle loading and errors first
  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error loading questions: {error}</p>;
  if (!questions || questions.length === 0)
    return <p>No questions available.</p>;

  const q = questions[current];
  const selected = answers[current]; // 🆕 Current question’s selected answer

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <h1 className="text-2xl font-bold mb-2">Quiz Finished!</h1>
        <p className="text-lg mb-4">
          Your Score: <span className="font-semibold">{score}</span> /{" "}
          {questions.length}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">
            Question {current + 1} / {questions.length}
          </h2>
          <p className="text-sm text-gray-500">Time: {timeLeft}s</p>
        </div>

        <h3 className="text-lg font-bold mb-4">{q.text}</h3>

        <div className="space-y-2">
          {q.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full py-2 px-3 border rounded-lg text-left ${
                selected === option
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={current === 0}
            className={`px-4 py-2 rounded ${
              current === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Back
          </button>

          {/* Next / Finish Button */}
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {current + 1 < questions.length ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
