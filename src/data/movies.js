export const movieData = {
  trending: [
    {
      id: 1,
      title: "Neon City",
      rating: "8.5",
      poster: "/images/poster_scifi_1776418462338.png",
      genre: "Sci-Fi",
      duration: "2h 14m",
      description: "A rogue detective explores the neon-lit depths of a futuristic metropolis.",
      cast: ["/images/poster_action_1776418480363.png"]
    },
    {
      id: 2,
      title: "Cyber Rush",
      rating: "9.1",
      poster: "/images/poster_action_1776418480363.png",
      genre: "Action",
      duration: "1h 58m",
      description: "In a world ruled by corporations, one hacker decides to take back the streets.",
      cast: []
    },
    {
      id: 3,
      title: "The Lost Realm",
      rating: "7.8",
      poster: "/images/poster_fantasy_1776418496974.png",
      genre: "Fantasy",
      duration: "2h 30m",
      description: "An ancient artifact holds the key to saving the universe.",
      cast: []
    }
  ],
  popular: [
    {
      id: 4,
      title: "Dark Matter",
      rating: "8.2",
      poster: "/images/poster_scifi_1776418462338.png",
      genre: "Sci-Fi",
      duration: "2h",
      description: "Exploring the unknown reaches of deep space.",
      cast: []
    },
    {
      id: 5,
      title: "Shadow Blade",
      rating: "8.9",
      poster: "/images/poster_action_1776418480363.png",
      genre: "Thriller",
      duration: "1h 45m",
      description: "A mysterious assassin seeks revenge against the syndicate.",
      cast: []
    }
  ],
  bollywood: [
    {
      id: 6,
      title: "Jawan: The Last Stand",
      rating: "9.3",
      poster: "/images/poster_action_1776418480363.png",
      genre: "Bollywood / Action",
      duration: "2h 45m",
      description: "An emotional journey of a man driven by a personal vendetta to rectify the wrongs in society.",
      cast: []
    },
    {
      id: 7,
      title: "Pathaan's Legacy",
      rating: "8.8",
      poster: "/images/poster_scifi_1776418462338.png",
      genre: "Bollywood / Thriller",
      duration: "2h 20m",
      description: "A legendary spy races against time to stop an apocalyptic disaster.",
      cast: []
    },
    {
      id: 8,
      title: "Brahmastra Part II",
      rating: "8.5",
      poster: "/images/poster_fantasy_1776418496974.png",
      genre: "Bollywood / Fantasy",
      duration: "2h 50m",
      description: "The ancient weapons are gathering, and a new protector must rise.",
      cast: []
    }
  ],
  hero: {
    id: 10,
    title: "ECHOES OF TOMORROW",
    rating: "9.5",
    poster: "/images/hero_background_1776418440181.png",
    genre: "Sci-Fi / Thriller",
    description: "When the future bleeds into the present, one person must untangle the paradox.",
    duration: "2h 10m"
  }
};

// Helper for finding a movie by ID
export const getMovieById = (id) => {
  const allMovies = [...movieData.trending, ...movieData.popular, ...movieData.bollywood, movieData.hero];
  return allMovies.find(m => m.id === parseInt(id));
};
