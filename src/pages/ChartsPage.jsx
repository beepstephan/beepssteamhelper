import { Typewriter } from "react-simple-typewriter";
import { Header, Footer } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";
import { Bar, Pie, Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, MatrixController, MatrixElement);

export const ChartsPage = () => {
  const { username, steamId, games, activity, isAuthenticated, isLoading, error, isInitialized } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !isLoading && !steamId) {
      navigate("/");
    }
  }, [isInitialized, isLoading, steamId, navigate]);

  if (!isInitialized || isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-cyan-400">Завантаження...</div>;
  }

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      alert("Увійдіть через Steam, щоб додавати ігри до улюблених!");
      return;
    }
  };

  const genreTranslations = {
    "Action": "Екшен",
    "Adventure": "Пригоди",
    "RPG": "Рольова гра",
    "Strategy": "Стратегія",
    "Simulation": "Симулятор",
    "Sports": "Спорт",
    "Racing": "Гонки",
    "MOBA": "MOBA",
    "Indie": "Інді",
    "Casual": "Казуальна",
    "Massively Multiplayer": "Масовий мультиплеєр",
    "Puzzle": "Головоломка",
    "Platformer": "Платформер",
    "Shooter": "Шутер",
    "Fighting": "Файтинг",
    "Stealth": "Стелс",
    "Survival": "Виживання",
    "Horror": "Жахи",
    "Tower Defense": "Захист веж",
    "Turn-Based": "Покрокова",
    "Real-Time Strategy": "Стратегія в реальному часі",
    "Visual Novel": "Візуальна новела",
    "Card Game": "Карткова гра",
    "Music": "Музична",
    "Party": "Вечірка",
    "Education": "Освітня",
    "Other": "Інше",
  };

  // фейк дані для онлайн та офлайн ігор
  const multiplayerGenres = ["Massively Multiplayer", "Shooter", "MOBA", "Sports"];
  const multiplayerTime = games
    .filter((game) => multiplayerGenres.includes(game.genre))
    .reduce((sum, game) => sum + game.playtime, 0);
  const singleplayerTime = games
    .filter((game) => !multiplayerGenres.includes(game.genre))
    .reduce((sum, game) => sum + game.playtime, 0);

  const onlineVsOfflineData = {
    labels: ["Мультиплеєр", "Одиночна"],
    datasets: [
      {
        label: "Час гри (години)",
        data: [multiplayerTime, singleplayerTime],
        backgroundColor: ["rgba(154, 37, 250, 0.7)", "rgba(0, 255, 255, 0.7)"],
        borderColor: ["rgba(154, 37, 250, 1)", "rgba(0, 255, 255, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const onlineVsOfflineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#00FFFF", font: { family: "'Orbitron', sans-serif'" } } },
      title: { display: true, text: "Мультиплеєр vs Одиночна", color: "#FF00FF", font: { size: 20, family: "'Orbitron', sans-serif'" } },
    },
  };

  // Дані-заглушка для Heatmap
  const heatmapRawData = [
    { day: 0, hour: 0, value: 1 }, { day: 0, hour: 6, value: 2 }, { day: 0, hour: 12, value: 3 }, { day: 0, hour: 18, value: 4 }, { day: 0, hour: 23, value: 5 },
    { day: 1, hour: 0, value: 0 }, { day: 1, hour: 6, value: 1 }, { day: 1, hour: 12, value: 2 }, { day: 1, hour: 18, value: 3 }, { day: 1, hour: 23, value: 4 },
    { day: 2, hour: 0, value: 2 }, { day: 2, hour: 6, value: 3 }, { day: 2, hour: 12, value: 4 }, { day: 2, hour: 18, value: 5 }, { day: 2, hour: 23, value: 6 },
    { day: 3, hour: 0, value: 1 }, { day: 3, hour: 6, value: 2 }, { day: 3, hour: 12, value: 3 }, { day: 3, hour: 18, value: 4 }, { day: 3, hour: 23, value: 5 },
    { day: 4, hour: 0, value: 3 }, { day: 4, hour: 6, value: 4 }, { day: 4, hour: 12, value: 5 }, { day: 4, hour: 18, value: 6 }, { day: 4, hour: 23, value: 7 },
    { day: 5, hour: 0, value: 5 }, { day: 5, hour: 6, value: 6 }, { day: 5, hour: 12, value: 7 }, { day: 5, hour: 18, value: 8 }, { day: 5, hour: 23, value: 9 },
    { day: 6, hour: 0, value: 4 }, { day: 6, hour: 6, value: 5 }, { day: 6, hour: 12, value: 6 }, { day: 6, hour: 18, value: 7 }, { day: 6, hour: 23, value: 8 },
  ];

  const heatmapData = {
    datasets: [{
      label: "Активність за годинами",
      data: heatmapRawData.map((item) => ({
        x: item.hour,
        y: item.day,
        v: item.value,
      })),
      backgroundColor: (context) => {
        const value = context.dataset.data[context.dataIndex].v;
        return `rgba(0, 255, 255, ${value / 10})`;
      },
      borderColor: "rgba(0, 255, 255, 1)",
      borderWidth: 1,
      width: ({ chart }) => (chart.chartArea || {}).width / 5 - 1,
      height: ({ chart }) => (chart.chartArea || {}).height / 7 - 1,
    }],
  };

  const heatmapOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Активність за годинами", color: "#FF00FF", font: { size: 20, family: "'Orbitron', sans-serif'" } },
    },
    scales: {
      x: {
        type: "linear",
        ticks: { stepSize: 6, color: "#00FFFF", callback: (value) => ["0", "6", "12", "18", "23"][value / 6] },
        grid: { color: "rgba(0, 255, 255, 0.2)" },
      },
      y: {
        type: "linear",
        ticks: { stepSize: 1, color: "#00FFFF", callback: (value) => ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"][value] },
        grid: { color: "rgba(0, 255, 255, 0.2)" },
      },
    },
  };

  const barChartData = {
    labels: games.map((game) => game.name),
    datasets: [
      {
        label: "Час гри (години)",
        data: games.map((game) => game.playtime),
        backgroundColor: "rgba(0, 255, 255, 0.7)",
        borderColor: "rgba(0, 255, 255, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(201, 139, 252, 0.7)",
        hoverBorderColor: "rgba(175, 87, 247, 1)",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#00FFFF", font: { family: "'Orbitron', sans-serif'" } } },
      title: { display: true, text: "Топ-10 ігор за часом гри", color: "#FF00FF", font: { size: 20, family: "'Orbitron', sans-serif'" } },
    },
    scales: {
      x: { ticks: { color: "#00FFFF" } },
      y: { ticks: { color: "#00FFFF" }, beginAtZero: true, grid: { color: "rgba(0, 255, 255, 0.2)" } },
    },
  };

  const pieChartData = {
    labels: [...new Set(games.map((game) => genreTranslations[game.genre] || game.genre))],
    datasets: [
      {
        label: "Час гри за жанрами",
        data: [...new Set(games.map((game) => genreTranslations[game.genre] || game.genre))].map((genre) =>
          games.filter((g) => (genreTranslations[g.genre] || g.genre) === genre).reduce((sum, g) => sum + g.playtime, 0)
        ),
        backgroundColor: ["rgba(154, 37, 250, 0.7)", "rgba(175, 87, 247, 0.7)", "rgba(201, 139, 252, 0.7)", "rgba(222, 184, 252, 0.7)", "rgba(237, 217, 252, 0.7)"],
        borderColor: ["rgba(154, 37, 250, 1)", "rgba(175, 87, 247, 1)", "rgba(201, 139, 252, 1)", "rgba(211, 149, 252, 1)", "rgba(240, 229, 252, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#00FFFF", font: { family: "'Orbitron', sans-serif'" } } },
      title: { display: true, text: "Розподіл часу гри за жанрами", color: "#FF00FF", font: { size: 20, family: "'Orbitron', sans-serif'" } },
    },
  };

  const activityChartData = {
    labels: ["Останні 3 дні", "Останні 2 тижні", "Останній місяць"],
    datasets: [
      {
        label: "Час гри (години)",
        data: [activity?.last3Days || 0, activity?.last2Weeks || 0, activity?.lastMonth || 0],
        backgroundColor: "rgba(0, 255, 255, 0.7)",
        borderColor: "rgba(0, 255, 255, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 0, 255, 1)",
        pointBorderColor: "#FF00FF",
      },
    ],
  };

  const activityChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#00FFFF", font: { family: "'Orbitron', sans-serif'" } } },
      title: { display: true, text: "Активність у Steam", color: "#FF00FF", font: { size: 20, family: "'Orbitron', sans-serif'" } },
    },
    scales: {
      x: { ticks: { color: "#00FFFF" } },
      y: { ticks: { color: "#00FFFF" }, beginAtZero: true, grid: { color: "rgba(0, 255, 255, 0.2)" } },
    },
  };

  return (
    <>
      <Header />
      <div className="bg-animated-gradient pt-16 min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-10 text-cyan-400">
          <Typewriter words={["Статистика та Графіки"]} loop={1} cursor cursorStyle="_" typeSpeed={35} delaySpeed={100} />
        </h1>
        {error ? (
          <p className="text-red-400 mt-4">{error}</p>
        ) : username ? (
          <>
            <p className="text-gray-400 mt-4 max-w-2xl text-center">
              {isAuthenticated ? `Вітаємо, ${username} (Steam ID: ${steamId})!` : `Перегляд профілю ${username} (Steam ID: ${steamId}).`}
            </p>
            {games.length > 0 ? (
              <div className="mt-8 w-full max-w-2xl space-y-8">
                <div className="bg-gray-900/80 p-4 rounded-lg border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
                <div className="bg-gray-900/80 p-4 rounded-lg border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  <Pie data={pieChartData} options={pieChartOptions} />
                </div>
                <div className="bg-gray-900/80 p-4 rounded-lg border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  <Line data={activityChartData} options={activityChartOptions} />
                </div>
                <div className="bg-gray-900/80 p-4 rounded-lg border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  <Pie data={onlineVsOfflineData} options={onlineVsOfflineOptions} />
                </div>
                <div className="bg-gray-900/80 p-4 rounded-lg border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  <Chart type="matrix" data={heatmapData} options={heatmapOptions} />
                </div>
              </div>
            ) : (
              <p className="text-gray-400 mt-4">Дані про ігри недоступні. Можливо, профіль прихований.</p>
            )}
            {isAuthenticated && (
              <button onClick={handleFavoriteToggle} className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-white py-2 px-4 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.7)]">
                Додати до улюблених
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-400 mt-4">Немає даних про профіль</p>
        )}
      </div>
      <Footer />
    </>
  );
};