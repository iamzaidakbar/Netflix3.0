import { useState, useCallback } from 'react';

const useMuteToggle = (initialState = false) => {
  const [mute, setMute] = useState(initialState);

  const handleMuteToggle = useCallback(() => {
    setMute((prevMute) => !prevMute);
  }, []);

  return { mute, handleMuteToggle };
};

export default useMuteToggle;
