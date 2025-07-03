import { Button } from "@/components/ui/button";
import { useState } from "react";



export default function Setup() {
  const [goal, setGoal] = useState("");
  const [days, setDays] = useState([]);
  const [equipment, setEquipment] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!goal || days.length === 0) {
      alert("Please select a goal and at least one workout day.");
      return;
    }

    const setupData = {
      goal,
      days,
      equipment,
    };

    console.log("User setup data:", setupData);

    // TODO: send to backend or navigate
  };



  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Setup Your FitGoal</h1>
      <div className="mb-4">
        <label htmlFor="goal" className="block text-sm font-medium mb-1">
            What's your goal?
        </label>
        <input
            id="goal"
            type="text"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="e.g. Build muscle"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
        />
        </div>

        <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Which days do you want to work out?
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <label key={day} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={day}
                checked={days.includes(day)}
                onChange={(e) => {
                    if (e.target.checked) {
                    setDays([...days, day]);
                    } else {
                    setDays(days.filter((d) => d !== day));
                    }
                }}
                className="accent-purple-600"
              />
              {day}
            </label>
          ))}
        </div>
        <div className="mb-6">
        <label htmlFor="equipment" className="block text-sm font-medium mb-1">
            What equipment do you have? (optional)
        </label>
        <input
            id="equipment"
            type="text"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="e.g. Dumbbells, resistance bands"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
        />
        </div>
        <Button type="button" onClick={handleSubmit} className="w-full">
          Start Plan
        </Button>

      </div>
    </div>
  );
}
