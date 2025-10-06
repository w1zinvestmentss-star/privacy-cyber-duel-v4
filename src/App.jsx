// src/App.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    question: "What kind of information is most at risk in a privacy breach/Cyber Hack?",
    answers: [
      { text: "Patient Health Records", points: 30 },
      { text: "Social Security Numbers", points: 25 },
      { text: "Credit Card Info", points: 20 },
      { text: "Login Credentials", points: 15 },
      { text: "Personal Addresses", points: 10 },
    ],
  },
  {
    question: "Name a cybersecurity tool used to protect networks.",
    answers: [
      { text: "Firewall", points: 30 },
      { text: "IDS (Intrusion Detection System)", points: 25 },
      { text: "VPN (Virtual Private Network)", points: 20 },
      { text: "Antivirus", points: 15 },
    ],
  },
  {
    question: "A Privacy Breach has occurred. You are a Privacy Officer, what are some actions you may have to take?",
    answers: [
      { text: "Contain the breach and Evaluate the scope", points: 30 },
      { text: "Investigate the breach", points: 25 },
      { text: "Remediate and prevent recurrence", points: 20 },
      { text: "Notify the patients", points: 15 },
      { text: "Notify the Information Privacy Commissioner (IPC)", points: 10 },
    ],
  },
  {
    question: "Name the different types of privacy breaches according to the Information Privacy Commissioner (IPC).",
    answers: [
      { text: "Disclosed without authority (Misdirected faxes, etc.)", points: 30 },
      { text: "Used without authority (Unauthorized Access)", points: 25 },
      { text: "Stolen information", points: 20 },
      { text: "Lost records", points: 15 },
      { text: "Collected without authority via EHR", points: 10 },
    ],
  },
  {
    question: "Name a best practice for creating strong passwords.",
    answers: [
      { text: "Use a mix of characters", points: 30 },
      { text: "Avoid reuse", points: 25 },
      { text: "Enable MFA", points: 20 },
      { text: "Change regularly", points: 15 },
      { text: "Avoid dictionary words", points: 10 },
    ],
  },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [revealed, setRevealed] = useState([]);
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [roundPoints, setRoundPoints] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [stealMode, setStealMode] = useState(false);
  const [hostMode, setHostMode] = useState(false);

  const currentQ = questions[round];
  const showAnswer = (i) => revealed.includes(i) || hostMode;

  function revealAnswer(index) {
    if (!revealed.includes(index)) {
      setRevealed((r) => [...r, index]);
      setRoundPoints((p) => p + currentQ.answers[index].points);
    }
  }

  function addStrike() {
    setStrikes((s) => {
      const ns = s + 1;
      if (ns >= 3) setStealMode(true);
      return ns;
    });
  }

  function awardPoints(teamKey) {
    setScores((prev) => ({ ...prev, [teamKey]: prev[teamKey] + roundPoints }));
    nextRound();
  }

  function nextRound() {
    setRound((r) => (r + 1) % questions.length);
    setRevealed([]);
    setRoundPoints(0);
    setStrikes(0);
    setStealMode(false);
  }

  function resetGame() {
    setStarted(false);
    setRound(0);
    setRevealed([]);
    setScores({ team1: 0, team2: 0 });
    setRoundPoints(0);
    setStrikes(0);
    setStealMode(false);
    setHostMode(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-700 text-white flex flex-col items-center justify-center p-8 font-sans">
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -5, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="inline-block mb-4 text-7xl drop-shadow-lg"
            >
              ⚔️
            </motion.div>

            <motion.h1
              className="text-6xl font-extrabold mb-6 drop-shadow-lg"
              animate={{
                textShadow: [
                  "0px 0px 10px #facc15",
                  "0px 0px 25px #facc15",
                  "0px 0px 10px #facc15",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Privacy-Cyber Duel
            </motion.h1>

            <p className="text-xl text-gray-200 mb-12">
              Developed by <span className="text-yellow-300 font-semibold">Jeffrey Munroe</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStarted(true)}
              className="bg-yellow-400 text-black px-8 py-4 rounded-2xl text-2xl font-bold shadow-lg hover:bg-yellow-300"
            >
              Start Game
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            {/* Title */}
            <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
              ⚔️ Privacy-Cyber Duel
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-yellow-300">
              Round {round + 1} of {questions.length}
            </h2>

            {/* Host Mode */}
            <div className="mb-6 flex items-center gap-4">
              <label className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-xl shadow">
                <input
                  type="checkbox"
                  checked={hostMode}
                  onChange={() => setHostMode((h) => !h)}
                  className="w-5 h-5 accent-yellow-400"
                />
                <span className="font-medium">Host Mode (show answers)</span>
              </label>
            </div>

            {/* Question & Answers */}
            <div className="bg-indigo-700 p-8 rounded-3xl shadow-2xl w-full max-w-5xl border-4 border-yellow-400">
              <h2 className="text-3xl font-bold mb-6 text-center">{currentQ.question}</h2>
              <div style={{ perspective: 1200 }} className="grid grid-cols-2 gap-6">
                {currentQ.answers.map((ans, i) => (
                  <motion.button
                    key={i}
                    onClick={() => revealAnswer(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-indigo-600 p-6 rounded-2xl text-xl font-bold shadow-lg min-h-[64px] flex items-center justify-center"
                  >
                    <AnimatePresence initial={false}>
                      {showAnswer(i) ? (
                        <motion.div
                          key={`revealed-${i}`}
                          initial={{ rotateY: 90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          exit={{ rotateY: -90, opacity: 0 }}
                          transition={{ duration: 0.45 }}
                          className="flex justify-between w-full px-2"
                        >
                          <span>{ans.text}</span>
                          <span className="text-yellow-300 font-semibold">{ans.points}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`hidden-${i}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="tracking-widest"
                        >
                          ???
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Scores */}
            <div className="flex gap-8 mt-8 items-center">
              {["team1", "team2"].map((team, i) => (
                <div
                  key={team}
                  className="bg-indigo-600 px-6 py-4 rounded-2xl shadow-lg text-2xl"
                >
                  Team {i + 1}:{" "}
                  <motion.span
                    key={scores[team]}
                    initial={{ scale: 0.85 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-yellow-400 font-bold"
                  >
                    {scores[team]}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Round Points */}
            <div className="mt-4 text-lg">
              Current Round Points:{" "}
              <motion.span
                key={roundPoints}
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="text-green-300 font-bold"
              >
                {roundPoints}
              </motion.span>
            </div>

            {/* Strikes */}
            <div className="mt-6 text-center">
              <motion.p
                key={strikes}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.15, opacity: 1 }}
                className="text-3xl font-bold text-red-400 mb-3"
              >
                Strikes: {"X ".repeat(strikes)}
              </motion.p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={addStrike}
                  className="bg-red-600 px-6 py-2 rounded-xl font-bold shadow hover:bg-red-500"
                >
                  Add Strike
                </button>
                <button
                  onClick={() =>
                    currentQ.answers.forEach((_, i) => {
                      if (!revealed.includes(i)) setRevealed((r) => [...r, i]);
                    })
                  }
                  className="bg-indigo-500 px-6 py-2 rounded-xl font-semibold shadow hover:bg-indigo-400"
                >
                  Reveal All (host)
                </button>
              </div>
            </div>

            {/* Steal Mode */}
            <AnimatePresence>
              {stealMode && (
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="bg-yellow-400 text-black px-6 py-4 mt-6 rounded-2xl shadow-xl text-center"
                >
                  <div className="text-2xl font-bold mb-3">Steal Mode Active!</div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => awardPoints("team1")}
                      className="bg-green-600 px-4 py-2 rounded-lg font-semibold"
                    >
                      Award to Team 1
                    </button>
                    <button
                      onClick={() => awardPoints("team2")}
                      className="bg-green-600 px-4 py-2 rounded-lg font-semibold"
                    >
                      Award to Team 2
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next & Reset */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={nextRound}
                className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold shadow hover:bg-yellow-300"
              >
                Next Round ➡️
              </button>
              <button
                onClick={resetGame}
                className="bg-gray-400 text-black px-6 py-3 rounded-xl font-bold shadow hover:bg-gray-300"
              >
                Reset Game
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}