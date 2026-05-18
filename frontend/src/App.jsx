import { useState } from "react";
import axios from "axios";

import {
  MapPin,
  Navigation,
  Clock,
  Truck,
  Coffee,
  Moon,
  Route,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function App() {

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [cycleUsed, setCycleUsed] = useState("");

  const [tripData, setTripData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleTrip = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/plan-trip/",
        {
          start: start.split(",").map(Number),
          end: end.split(",").map(Number),
          cycle_used: Number(cycleUsed)
        }
      );

      setTripData(response.data);

    } catch (error) {

      console.log(error);

      setError("Failed to generate trip. Please check backend/API.");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">

        {/* HEADER */}

        <div className="flex items-center gap-5 mb-14">

          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-3xl shadow-2xl shadow-cyan-500/30">

            <Truck size={45} />

          </div>

          <div>

            <h1 className="text-5xl font-black tracking-tight">
              Smart Trip Planner
            </h1>

            <p className="text-slate-300 mt-2 text-lg">
              AI Powered ELD & Route Optimization Dashboard
            </p>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT PANEL */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">

              <Navigation className="text-cyan-400" />

              Plan Your Route

            </h2>

            <div className="space-y-6">

              {/* START */}

              <div>

                <label className="block mb-2 text-slate-300">
                  Start Coordinates
                </label>

                <div className="flex items-center bg-slate-800/80 rounded-2xl px-4 border border-slate-700 focus-within:border-cyan-400 transition">

                  <MapPin className="text-cyan-400" />

                  <input
                    type="text"
                    placeholder="-74.0060,40.7128"
                    className="w-full bg-transparent p-4 outline-none"
                    onChange={(e) => setStart(e.target.value)}
                  />

                </div>

              </div>

              {/* END */}

              <div>

                <label className="block mb-2 text-slate-300">
                  Destination Coordinates
                </label>

                <div className="flex items-center bg-slate-800/80 rounded-2xl px-4 border border-slate-700 focus-within:border-cyan-400 transition">

                  <Route className="text-cyan-400" />

                  <input
                    type="text"
                    placeholder="-87.6298,41.8781"
                    className="w-full bg-transparent p-4 outline-none"
                    onChange={(e) => setEnd(e.target.value)}
                  />

                </div>

              </div>

              {/* CYCLE */}

              <div>

                <label className="block mb-2 text-slate-300">
                  Current Cycle Used
                </label>

                <div className="flex items-center bg-slate-800/80 rounded-2xl px-4 border border-slate-700 focus-within:border-cyan-400 transition">

                  <Clock className="text-cyan-400" />

                  <input
                    type="number"
                    placeholder="20"
                    className="w-full bg-transparent p-4 outline-none"
                    onChange={(e) => setCycleUsed(e.target.value)}
                  />

                </div>

              </div>

              {/* BUTTON */}

              <button
                onClick={handleTrip}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-500/30 hover:scale-[1.02]"
              >

                {loading ? "Generating Smart Route..." : "Generate Trip"}

              </button>

              {/* ERROR */}

              {error && (

                <div className="bg-red-500/20 border border-red-500 p-4 rounded-2xl">

                  <p className="text-red-300">
                    {error}
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">

              <Truck className="text-cyan-400" />

              Trip Analytics

            </h2>

            {tripData ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">

                  <p className="text-slate-400 mb-2">
                    Distance
                  </p>

                  <h3 className="text-3xl font-bold text-cyan-400">
                    {tripData.distance_miles}
                  </h3>

                  <p className="text-slate-400 mt-1">
                    Miles
                  </p>

                </div>

                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">

                  <p className="text-slate-400 mb-2">
                    Duration
                  </p>

                  <h3 className="text-3xl font-bold text-cyan-400">
                    {tripData.duration_hours}
                  </h3>

                  <p className="text-slate-400 mt-1">
                    Hours
                  </p>

                </div>

                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">

                  <p className="text-slate-400 mb-2">
                    Driving Hours
                  </p>

                  <h3 className="text-3xl font-bold text-cyan-400">
                    {tripData.hos.driving_hours}
                  </h3>

                </div>

                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">

                  <p className="text-slate-400 mb-2">
                    Remaining Cycle
                  </p>

                  <h3 className="text-3xl font-bold text-cyan-400">
                    {tripData.hos.remaining_cycle}
                  </h3>

                </div>

                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">

                  <div className="flex items-center gap-2 mb-2 text-slate-400">

                    <Coffee size={18} />

                    Breaks Required

                  </div>

                  <h3 className="text-3xl font-bold text-cyan-400">
                    {tripData.hos.breaks_required}
                  </h3>

                </div>

                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">

                  <div className="flex items-center gap-2 mb-2 text-slate-400">

                    <Moon size={18} />

                    Rest Periods

                  </div>

                  <h3 className="text-3xl font-bold text-cyan-400">
                    {tripData.hos.rest_periods}
                  </h3>

                </div>

              </div>

            ) : (

              <div className="h-[400px] flex flex-col items-center justify-center text-center">

                <div className="bg-cyan-500/20 p-6 rounded-full mb-6 animate-pulse">

                  <Truck size={60} className="text-cyan-400" />

                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Awaiting Route Generation
                </h3>

                <p className="text-slate-400 max-w-md">
                  Enter coordinates to generate intelligent trip analytics.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* MAP SECTION */}

        {tripData && (

          <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">

              <Route className="text-cyan-400" />

              Live Route Map

            </h2>

            <div className="rounded-3xl overflow-hidden border border-slate-700">

              <MapContainer
                center={[tripData.start[1], tripData.start[0]]}
                zoom={5}
                style={{ height: "500px", width: "100%" }}
              >

                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* START MARKER */}

                <Marker
                  position={[tripData.start[1], tripData.start[0]]}
                >

                  <Popup>
                    Start Location
                  </Popup>

                </Marker>

                {/* END MARKER */}

                <Marker
                  position={[tripData.end[1], tripData.end[0]]}
                >

                  <Popup>
                    Destination
                  </Popup>

                </Marker>

                {/* ROUTE LINE */}

                <Polyline
                  positions={[
                    [tripData.start[1], tripData.start[0]],
                    [tripData.end[1], tripData.end[0]]
                  ]}
                />

              </MapContainer>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default App;