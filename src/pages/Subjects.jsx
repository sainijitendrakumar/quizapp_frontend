import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  FlaskConical,
  BookOpen,
  Globe,
  Laptop,
  Brain,
} from "lucide-react";

const subjects = [
  {
    id: 1,
    title: "Mathematics",
    description: "Practice algebra, arithmetic, reasoning & more.",
    icon: <Calculator size={40} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Science",
    description: "Physics, chemistry & biology quick concepts.",
    icon: <FlaskConical size={40} />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "English",
    description: "Grammar, vocabulary & reading comprehension.",
    icon: <BookOpen size={40} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "General Knowledge",
    description: "GK, current affairs & world facts.",
    icon: <Globe size={40} />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 5,
    title: "Computer",
    description: "Fundamentals, networking, OS, programming.",
    icon: <Laptop size={40} />,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 6,
    title: "Reasoning",
    description: "Logic, puzzles, series, coding-decoding & more.",
    icon: <Brain size={40} />,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function Subjects() {
  const navigate = useNavigate();
  const handleClick = (subject) => {
    alert(`Opening ${subject.title}`);
    navigate("/quiz/" + `${subject.title.toLowerCase()}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Subjects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subjects.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className="cursor-pointer bg-white shadow-lg rounded-xl p-5 border
              hover:shadow-xl active:scale-95 transition-transform duration-200
              hover:-translate-y-1"
          >
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full ${item.color}`}
            >
              {item.icon}
            </div>

            <h2 className="text-xl font-semibold mt-4">{item.title}</h2>

            <p className="text-gray-600 mt-2">{item.description}</p>

            <div className="mt-4 inline-block text-blue-600 font-medium">
              Start →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
