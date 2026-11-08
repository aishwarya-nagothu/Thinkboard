import { useEffect, useState } from "react";
import api from "../lib/axios";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
const Homepage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");

        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);

        if (error.response?.status === 429) {
          setRateLimited(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {rateLimited && <RateLimitedUI />}

        <h1 className="text-4xl font-bold mb-6">
          My Notes
        </h1>

        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <NotesNotFound/>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;
