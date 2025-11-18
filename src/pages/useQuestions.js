import { useEffect, useState } from "react";
import axios from "axios";

const useQuestions = (apiUrl = "https://quizapp-production-c985.up.railway.app/api/questions") => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(apiUrl);
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [apiUrl]);

  return { questions, loading, error };
};

export default useQuestions;
