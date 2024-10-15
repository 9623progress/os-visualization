import audioSound from "../assets/button-pressed-38129.mp3";

const useButtonAudio = () => {
  const playSound = () => {
    const audio = new Audio(audioSound);
    audio.play();
  };
  return { playSound };
};

export default useButtonAudio;
