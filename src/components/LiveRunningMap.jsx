import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Play, Pause, Save, Navigation } from 'lucide-react';
// Fix para iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente para recentrar el mapa automáticamente
function MapRecenter({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) map.setView([lat, lng], map.getZoom());
    }, [lat, lng, map]);
    return null;
}

const LiveRunningMap = ({ onSaveRun, onClose }) => {
    const [isTracking, setIsTracking] = useState(false);
    const [positions, setPositions] = useState([]); // Array de [lat, lng]
    const [distance, setDistance] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0); // Segundos    
    const watchId = useRef(null);

    // Cronómetro
    useEffect(() => {
        let interval;
        if (isTracking && startTime) {
            interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTracking, startTime]);

    // Calcular distancia (Haversine simple)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio Tierra km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const startTracking = () => {
        setIsTracking(true);
        setStartTime(Date.now() - (elapsedTime * 1000)); // Ajustar si estaba pausado

        if (navigator.geolocation) {
            watchId.current = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;

                    // Solo aceptamos GPS preciso (< 20m) para evitar saltos locos
                    if (accuracy > 25) return;

                    setPositions(prev => {
                        const newPos = [latitude, longitude];

                        // Calcular distancia agregada
                        if (prev.length > 0) {
                            const lastPos = prev[prev.length - 1];
                            const dist = calculateDistance(lastPos[0], lastPos[1], latitude, longitude);

                            // Filtrar movimientos infinitesimales (ruido GPS estático)
                            if (dist > 0.005) { // 5 metros mínimo
                                setDistance(d => d + dist);
                                return [...prev, newPos];
                            }
                            return prev;
                        }
                        return [newPos];
                    });
                },
                (err) => console.error(err),
                { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
            );
        }
    };

    const stopTracking = () => {
        setIsTracking(false);
        if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    };

    const handleFinish = () => {
        stopTracking();
        onSaveRun({
            distance: distance.toFixed(2),
            duration: (elapsedTime / 60).toFixed(1), // minutos
            positions // Opcional: guardar la ruta para dibujarla en historial luego
        });
    };

    const currentPos = positions.length > 0 ? positions[positions.length - 1] : null;

    // Ritmo actual
    const currentPace = distance > 0 ? (elapsedTime / 60) / distance : 0;
    const formatPace = (val) => {
        if (!isFinite(val) || val === 0) return "--:--";
        const mins = Math.floor(val);
        const secs = Math.round((val - mins) * 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Mapa */}
            <div className="flex-1 relative">
                {currentPos ? (
                    <MapContainer center={currentPos} zoom={16} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap'
                        />
                        <Marker position={currentPos} />
                        <Polyline positions={positions} color="red" weight={4} />
                        <MapRecenter lat={currentPos[0]} lng={currentPos[1]} />
                    </MapContainer>
                ) : (
                    <div className="h-full flex items-center justify-center bg-gray-900 text-white">
                        <div className="text-center animate-pulse">
                            <Navigation size={48} className="mx-auto mb-4 text-orange-500" />
                            <p>Buscando satélites GPS...</p>
                            <p className="text-sm text-gray-400 mt-2">Sal al exterior para mejor señal</p>
                        </div>
                    </div>
                )}

                {/* Botón Cerrar (Solo si no ha empezado) */}
                {/* {!startTime && (
                    <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white z-[1000]">
                        X
                    </button>
                )} */}
            </div>

            {/* Panel de Control */}
            <div className="bg-gray-900 border-t border-gray-800 p-6 pb-8">
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                        <div className="text-gray-400 text-xs uppercase">Distancia</div>
                        <div className="text-3xl font-black font-mono text-white">
                            {distance.toFixed(2)} <span className="text-sm text-gray-500">km</span>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs uppercase">Tiempo</div>
                        <div className="text-3xl font-black font-mono text-white">
                            {formatTime(elapsedTime)}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs uppercase">Ritmo</div>
                        <div className="text-2xl font-bold font-mono text-orange-400 mt-1">
                            {formatPace(currentPace)}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-6">
                    {!isTracking ? (
                        <button
                            onClick={startTime ? handleFinish : startTracking} // Si ya hay tiempo, el botón hace Finish (o Resume?) - Mejor lógica play/pause
                            className={`h-16 w-16 rounded-full flex items-center justify-center ${startTime ? 'bg-orange-600' : 'bg-green-600'} text-white shadow-lg scale-110`}
                        >
                            {startTime ? <Save size={32} /> : <Play size={32} className="ml-1" />}
                        </button>
                    ) : (
                        <button
                            onClick={stopTracking}
                            className="h-16 w-16 rounded-full bg-yellow-600 text-white flex items-center justify-center shadow-lg"
                        >
                            <Pause size={32} />
                        </button>
                    )}

                    {/* Botón de guardar si está en pausa y hay datos */}
                    {!isTracking && startTime && (
                        <button
                            onClick={startTracking} // Resume
                            className="h-16 w-16 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg"
                        >
                            <Play size={32} />
                        </button>
                    )}
                </div>

                {/* Hint */}
                <p className="text-center text-xs text-gray-600 mt-4">
                    Mantén la pantalla encendida para mejor precisión GPS.
                </p>
                <button onClick={onClose} className="w-full text-center text-gray-500 mt-2 text-sm underline">
                    Cancelar / Salir
                </button>
            </div>
        </div>
    );
};

export default LiveRunningMap;
