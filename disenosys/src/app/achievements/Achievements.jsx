

const Achievements = () => {
  const badges = [
    { name: "Top Scorer", icon: "🏆" },
    { name: "Consistent Learner", icon: "🎯" },
  ];

  return (
    <div className="flex font-garet">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Achievements</h2>
        <div className="mt-6 space-y-4">
          {badges.map((badge, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow flex items-center space-x-4">
              <span className="text-3xl">{badge.icon}</span>
              <h3 className="text-lg font-semibold">{badge.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
