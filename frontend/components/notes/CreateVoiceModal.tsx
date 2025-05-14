'use client';

import { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaMicrophone, FaStop, FaTrashAlt } from 'react-icons/fa';

interface Props {
  onClose: () => void;
}

const CreateVoiceModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start or stop recording
  const handleToggleRecording = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          chunks.current.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks.current, { type: 'audio/webm' });
          setAudioUrl(URL.createObjectURL(blob));
          chunks.current = [];
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
        startTimer();
      } catch (err) {
        console.error('Microphone access denied:', err);
      }
    } else {
      mediaRecorder?.stop();
      setRecording(false);
      stopTimer();
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordingTime(0);
  };

  const handleDeleteRecording = () => {
    setAudioUrl('');
    stopTimer();
  };

  const handleSave = () => {
    console.log('Saving Voice Note:', { title, audioUrl });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex justify-center items-center p-4">
      <div className="bg-white/90 w-full max-w-md rounded-xl p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-purple-600 hover:text-purple-800"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-2xl font-bold text-purple-900 mb-4">Voice Note</h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Add a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-6 p-3 border rounded-md bg-white/90"
        />

        {/* Mic + Recording Feedback */}
        <div className="flex flex-col items-center justify-center relative mt-2">
          {/* Pulsating Red Ring */}
          {recording && (
            <span className="absolute h-24 w-24 rounded-full bg-red-500 opacity-30 animate-ping"></span>
          )}

          {/* Mic Button */}
          <button
            onClick={handleToggleRecording}
            className={`w-16 h-16 z-10 rounded-full shadow-md text-white flex justify-center items-center transition ${
              recording ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {recording ? <FaStop size={20} /> : <FaMicrophone size={20} />}
          </button>

          {/* Timer + "Recording..." */}
          {recording && (
            <div className="flex items-center justify-center gap-2 mt-2 text-red-600 text-sm font-medium">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              <span>Recording...</span>
              <span className="ml-2 text-xs text-gray-700">{recordingTime}s</span>
            </div>
          )}
        </div>

        {/* Audio Preview + Delete */}
        {audioUrl && (
          <div className="mt-6 relative">
            <label className="text-sm font-semibold text-purple-800 block mb-1">Preview</label>

            <audio controls src={audioUrl} className="w-full rounded-lg" />

            {/* Delete Button */}
            <button
              onClick={handleDeleteRecording}
              className="absolute -top-4 -right-4 bg-white shadow-md p-2 rounded-full text-red-500 hover:text-red-700"
              title="Delete Recording"
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold disabled:opacity-60"
          disabled={!audioUrl || !title}
        >
          Save Voice Note
        </button>
      </div>
    </div>
  );
};

export default CreateVoiceModal;
