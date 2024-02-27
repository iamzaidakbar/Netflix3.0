import { useEffect } from "react";
import breakinbad from "../../assets/images/main-menu-bg/breaking-bad.jpg";
import avengers from "../../assets/images/main-menu-bg/avengers.jpg";
import oppenheimer from "../../assets/images/main-menu-bg/oppenheimer.jpg";
import punisher from "../../assets/images/main-menu-bg/punisher.jpg";
import theboys from "../../assets/images/main-menu-bg/the boys.jpg";
import wolfofwallstreet from "../../assets/images/main-menu-bg/wolf-of-wall-street.jpg";

const useRandomVideo = () => {
  const mockVideos = [
    {
      video_title: "The Punisher",
      video_url: "https://youtu.be/r1DyQ9leczk",
      video_id: "1",
      video_description:
        "Those who do evil to others - the killers, the rapists, psychos, sadists - you will come to know me well. Frank Castle is dead. Call me The Punisher.",
      video_color: "red",
      thumbnail: punisher,
    },
    {
      video_title: "Breaking Bad",
      video_url: "https://youtu.be/3jqt7MxifiU",
      video_id: "2",
      video_description:
        "You clearly don't know who you're talking to, so let me clue you in. I'm not in danger, Skyler, I am the danger. A guy opens the door and gets shot you think that of me? No I am the one who knocks",
      video_color: "yellow",
      thumbnail: breakinbad,
    },
    {
      video_title: "The Boys",
      video_url: "https://youtu.be/Y1CJVbHUzi0",
      video_id: "3",
      video_description:
        "I am done being persecuted for my strength. You people should be thanking Christ that I am who and what I am, because you need me. You need me to save you. You do",
      video_color: "red",
      thumbnail: theboys,
    },
    {
      video_title: "The Wolf Of Wall Street 💵",
      video_url: "https://youtu.be/5VdT3ovJS3c",
      video_id: "4",
      video_description:
        "I've been a rich man and I've been a poor man. And I choose rich every f*cking time! Poverty in my opinion is a passport to misery.",
      video_color: "white",
      thumbnail: wolfofwallstreet,
    },
    {
      video_title: "Avengers Endgame",
      video_url: "https://youtu.be/JcbCZWP6RPI",
      video_id: "5",
      video_description:
        "Five years ago, we lost. All of us. We lost friends. We lost family. We lost a part of ourselves. Today, we have a chance to take it all back. You know your teams, you know your missions. Get the stones, get them back. One round trip each. No mistakes",
      video_color: "silver",
      thumbnail: avengers,
    },
    {
      video_title: "Oppenheimer",
      video_url: "https://youtu.be/yqjPI_m1ulA",
      video_id: "6",
      video_description:
        "When you see something that is technically sweet, you go ahead and do it and you argue about what to do about it only after you have had your technical success.",
      video_color: "white",
      thumbnail: oppenheimer,
    },
  ];

  // Return a random video directly
  const randomIndex = Math.floor(Math.random() * mockVideos.length);
  return mockVideos[randomIndex];
};

export default useRandomVideo;
