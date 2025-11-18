import React, { useEffect, useState } from "react";
import axios from "axios";

const Quizpage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "https://quizapp-production-c985.up.railway.app/api/questions"
        );
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  console.log(questions);

  // ✅ Handle user selecting an option
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  // ✅ Submit answers
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/results",
        {
          answers, // your answers array
          score, // your score variable
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Result saved:", response.data);
      alert("Result submitted successfully!");
      window.location.href = "/results"; // redirect to results page
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert(error.response?.data?.msg || "Unauthorized. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  if (loading) return <p>Loading quiz...</p>;

  if (score !== null)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-2">Your Score:</h2>
        <p className="text-xl">{score}</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Quiz</h1>

      {questions.map((q, index) => (
        <div key={q._id} className="mb-6">
          <h3 className="font-semibold mb-2">
            {index + 1}. {q.text}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((option, i) => (
              <label
                key={i}
                className={`border p-2 rounded cursor-pointer ${
                  answers[q._id] === option ? "bg-blue-100 border-blue-500" : ""
                }`}
              >
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  className="mr-2"
                  onChange={() => handleAnswerChange(q._id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-5 py-2 rounded mt-4 hover:bg-blue-700"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default Quizpage;
