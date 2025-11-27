import { useState, useRef } from 'react';
import { Lock, X } from 'lucide-react';
import { useGame } from '../context/GameContext';

const PhotosApp = () => {
  const { storyData } = useGame();
  const photos = storyData.apps.photos;
  const [unlockedPhotos, setUnlockedPhotos] = useState(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [passwordPhoto, setPasswordPhoto] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordInputRef = useRef(null);

  const isUnlocked = (photo) =>
    !photo.locked || unlockedPhotos.has(photo.id);

  const handlePhotoClick = (photo) => {
    if (isUnlocked(photo)) {
      setSelectedPhoto(photo);
      return;
    }

    setPasswordPhoto(photo);
    setPasswordInput('');
    setPasswordError('');
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (!passwordPhoto) return;

    const expected = passwordPhoto.password ?? '';
    if (
      passwordInput.trim().toUpperCase() === expected.trim().toUpperCase()
    ) {
      setUnlockedPhotos((prev) => {
        const next = new Set(prev);
        next.add(passwordPhoto.id);
        return next;
      });
      setPasswordPhoto(null);
      setPasswordInput('');
      setPasswordError('');
      setSelectedPhoto(passwordPhoto);
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const closeSelectedPhoto = () => setSelectedPhoto(null);
  const closePasswordModal = () => {
    setPasswordPhoto(null);
    setPasswordInput('');
    setPasswordError('');
  };

  return (
    <div className="relative h-full p-4">
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => handlePhotoClick(photo)}
            className="relative group overflow-hidden rounded-2xl bg-white/5 aspect-[3/4] shadow-lg"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className={`w-full h-full object-cover transition-all ${
                isUnlocked(photo) ? 'opacity-100' : 'opacity-40 blur-sm'
              }`}
            />
            {!isUnlocked(photo) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
                <Lock className="w-8 h-8" />
                <p className="text-xs tracking-wide uppercase">Locked</p>
              </div>
            )}
            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs p-2 text-center">
              {photo.caption || `Photo ${photo.id}`}
              {photo.date && (
                <div className="text-[10px] text-white/80 mt-0.5">
                  {photo.date}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 transition-opacity duration-200">
          <div className="absolute top-0 right-0 p-4 z-10">
            <button
              onClick={closeSelectedPhoto}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-6 pb-10 max-h-full overflow-auto">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-h-[70%] w-auto rounded-3xl shadow-2xl object-contain"
            />
            <div className="text-center">
              <p className="text-white text-sm opacity-80">
                {selectedPhoto.caption || `Photo ${selectedPhoto.id}`}
              </p>
              {selectedPhoto.date && (
                <p className="text-white text-xs opacity-60 mt-1">
                  {selectedPhoto.date}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {passwordPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-6 transition-opacity duration-200">
          <form
            onSubmit={handlePasswordSubmit}
            className="w-full max-w-md bg-white/5 border border-white/20 rounded-3xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg">
                Unlock "{passwordPhoto.caption}"
              </h3>
              <button
                type="button"
                onClick={closePasswordModal}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-white/70">
              Enter the password hint from your notes to open this photo.
            </p>
            {/* PIN Code Interface */}
            <div className="relative">
              {/* Hidden input for actual typing */}
              <input
                ref={passwordInputRef}
                type="text"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-text"
                autoFocus
                maxLength={passwordPhoto.password?.length || 10}
              />
              {/* Visual PIN boxes */}
              <div
                className="flex gap-3 justify-center cursor-text"
                onClick={() => {
                  // Focus the hidden input when clicking on the boxes
                  passwordInputRef.current?.focus();
                }}
              >
                {Array.from({ length: passwordPhoto.password?.length || 4 }).map(
                  (_, index) => {
                    const char = passwordInput[index] || '';
                    return (
                      <div
                        key={index}
                        className="w-12 h-12 bg-gray-800 border border-white/20 rounded-lg flex items-center justify-center text-white text-xl font-semibold"
                      >
                        {char || '-'}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            {passwordError && (
              <p className="text-xs text-red-400">{passwordError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-colors"
            >
              Unlock
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PhotosApp;

