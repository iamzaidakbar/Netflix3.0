import { useState } from 'react';

const useAvatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const selectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  };

  return { selectedAvatar, selectAvatar };
};

export default useAvatar;
