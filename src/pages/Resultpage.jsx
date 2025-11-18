import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(results);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your results");
        setLoading(false);
        return;
      }
      console.log(token);

      try {
        const res = await axios.get("http://localhost:5000/api/results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.msg || "Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading your results...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-md shadow-md">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Quiz Results
        </h2>

        {results.length === 0 ? (
          <p className="text-center text-gray-600">No results found yet.</p>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="border border-gray-200 p-5 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Quiz Attempt #{index + 1}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Date: {new Date(result.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    Score: {result.score}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Questions: {result.answers.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
