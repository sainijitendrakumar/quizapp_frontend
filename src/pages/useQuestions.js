import { useEffect, useState } from "react";
import axios from "axios";


const useQuestions = (subject) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/questions/${subject}`;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(import.meta.env.VITE_API_URL);
  console.log({subject});
  

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
