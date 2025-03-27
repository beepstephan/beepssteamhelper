import { Typewriter } from "react-simple-typewriter";
import { Header, Footer } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";

const genreTranslations = {
  Action: "Екшен",
  Adventure: "Пригоди",
  RPG: "Рольова гра",
  Strategy: "Стратегія",
  Simulation: "Симулятор",
  Sports: "Спорт",
  Racing: "Гонки",
  MOBA: "MOBA",
  Indie: "Інді",
  Casual: "Казуальна",
  "Massively Multiplayer": "Масовий мультиплеєр",
  Puzzle: "Головоломка",
  Platformer: "Платформер",
  Shooter: "Шутер",
  Fighting: "Файтинг",
  Stealth: "Стелс",
  Survival: "Виживання",
  Horror: "Жахи",
  "Tower Defense": "Захист веж",
  "Turn-Based": "Покрокова",
  "Real-Time Strategy": "Стратегія в реальному часі",
  "Visual Novel": "Візуальна новела",
  "Card Game": "Карткова гра",
  Music: "Музична",
  Party: "Вечірка",
  Education: "Освітня",
  Other: "Інше",
};

export const ProfilePage = () => {
  const { username, games, totalGames, isLoading, error, isInitialized } = useAuthStore((state) => ({
    username: state.username,
    games: state.games,
    totalGames: state.totalGames,
    isLoading: state.isLoading,
    error: state.error,
    isInitialized: state.isInitialized,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !isLoading && !username) {
      navigate("/");
    }
  }, [isInitialized, isLoading, username, navigate]);

  const calculateFavoriteGenre = () => {
    if (!games.length) return { genre: "Невідомо", hours: 0 };
    const genreTime = {};
    games.forEach((game) => {
      genreTime[game.genre] = (genreTime[game.genre] || 0) + game.playtime;
    });
    const favorite = Object.entries(genreTime).reduce((a, b) => (a[1] > b[1] ? a : b));
    return { genre: favorite[0], hours: favorite[1] };
  };

  const totalPlaytime = games.reduce((sum, game) => sum + game.playtime, 0);
  const avgPlaytimePerGame = games.length ? (totalPlaytime / games.length).toFixed(1) : 0;
  const avgPlaytimeLibrary = totalGames && games.length ? (totalPlaytime / totalGames).toFixed(1) : 0;
  const { genre: favoriteGenre, hours: favoriteGenreHours } = calculateFavoriteGenre();

  return (
    <>
      <Header />
      <div className="bg-animated-gradient pt-16 min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-10 text-cyan-400">
          <Typewriter
            words={["Персональний Ігровий Профіль"]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={35}
            delaySpeed={100}
          />
        </h1>
        {isLoading ? (
          <p className="text-gray-400 mt-4">Завантаження...</p>
        ) : error ? (
          <p className="text-red-400 mt-4">{error}</p>
        ) : username ? (
          <div className="mt-8 w-full max-w-2xl bg-gray-900/80 p-6 rounded-lg border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            <p className="text-gray-300 text-lg">Вітаємо, {username}! Ось ваш ігровий профіль:</p>
            {games.length ? (
              <ul className="mt-4 space-y-4 text-gray-200">
                <li>
                  Загальний час гри (топ-10): <span className="text-cyan-400">{totalPlaytime} годин</span>
                </li>
                <li>
                  Середній час на гру (топ-10):{" "}
                  <span className="text-cyan-400">{avgPlaytimePerGame} годин</span>
                </li>
                {totalGames > 10 && (
                  <li>
                    Середній час на гру (усі {totalGames} ігор):{" "}
                    <span className="text-cyan-400">{avgPlaytimeLibrary} годин</span>
                  </li>
                )}
                <li>
                  Улюблений жанр:{" "}
                  <span className="text-cyan-400">
                    {genreTranslations[favoriteGenre] || favoriteGenre}
                  </span>{" "}
                  ({favoriteGenreHours} годин)
                </li>
              </ul>
            ) : (
              <p className="text-gray-400 mt-4">Дані про ігри недоступні</p>
            )}
          </div>
        ) : (
          <p className="text-gray-400 mt-4">Немає даних про профіль</p>
        )}
      </div>
      <Footer />
    </>
  );
};