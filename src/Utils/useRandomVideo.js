import { useState, useMemo } from "react";

const useRandomVideo = () => {
  const mockVideos = [
    {
      id: "KXItezz-BhA",
      title: "Spider Man",
      description: "Everyday I wake up knowing that no matter how many lives I protect, no matter how many people call me a hero, someone even more powerful could change everything",
    },
    {
      id: "3jqt7MxifiU",
      title: "Breaking Bad",
      description: "No, you clearly don't know who you're talking to, so let me clue you in. I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No i Am the one Who Knocks!!",
    },
    {
      id: "TT9qM5mDutQ",
      title: "Peaky Blinders",
      description: "It's Not A Good Idea To Look At Tommy Shelby The Wrong Way",
    },
    {
      id: "5VdT3ovJS3c",
      title: "The Wolf of Walstreet",
      description:
        "I have been a rich man and I have been a poor man. And I choose rich every fuckin' time. Because, at least as a rich man, when I have to face my problems, I show up in the back of the limo, wearing a $2000 suit and a $40,000 gold fuckin' watch.",
    },
  ];

  const [randomIndex, setRandomIndex] = useState(() =>
    Math.floor(Math.random() * mockVideos.length)
  );
  const initialRandomVideo = useMemo(
    () => mockVideos[randomIndex],
    [randomIndex]
  );

  const updateRandomVideo = () => {
    setRandomIndex((prevIndex) => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * mockVideos.length);
      } while (newIndex === prevIndex); // Ensure the new index is different from the previous one
      return newIndex;
    });
  };

  return {
    randomVideo: initialRandomVideo,
    updateRandomVideo,
  };
};

export default useRandomVideo;
