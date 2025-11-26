import { useGame } from '../context/GameContext';

const NotesApp = () => {
  const { storyData } = useGame();
  const notes = storyData.apps.notes;

  return (
    <div className="p-4 space-y-4">
      {notes.map((note) => (
        <article
          key={note.title}
          className="bg-white/5 rounded-2xl p-4 text-white border border-white/10"
        >
          <header className="mb-2">
            <p className="text-xs text-white/60 uppercase">{note.date}</p>
            <h3 className="text-lg font-semibold">{note.title}</h3>
          </header>
          <p className="whitespace-pre-line text-sm text-white/90">
            {note.content}
          </p>
        </article>
      ))}
    </div>
  );
};

export default NotesApp;



