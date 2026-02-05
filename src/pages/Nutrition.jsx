import React, { useState, useEffect } from 'react';
import CalorieProgress from '../components/CalorieProgress';
import MealCard from '../components/MealCard';

const Nutrition = () => {
    // Initial State with LocalStorage check
    const [nutritionData, setNutritionData] = useState(() => {
        const savedData = localStorage.getItem('levelUp_nutrition');
        if (savedData) {
            return JSON.parse(savedData);
        }
        return {
            consumed: 850,
            target: 2400,
            macros: {
                protein: 65,
                carbs: 90,
                fat: 25
            },
            meals: [
                {
                    id: 1,
                    title: 'Desayuno',
                    icon: '🍳',
                    calories: 450,
                    items: [
                        { name: 'Huevos revueltos (3)', kcal: 220 },
                        { name: 'Pan integral tostado', kcal: 130 },
                        { name: 'Café solo', kcal: 5 }
                    ]
                },
                {
                    id: 2,
                    title: 'Almuerzo',
                    icon: '🥗',
                    calories: 400,
                    items: [
                        { name: 'Ensalada César con Pollo', kcal: 400 }
                    ]
                },
                {
                    id: 3,
                    title: 'Merienda',
                    icon: '🍎',
                    calories: 0,
                    items: []
                },
                {
                    id: 4,
                    title: 'Cena',
                    icon: '🍽️',
                    calories: 0,
                    items: []
                }
            ]
        };
    });

    // Save to LocalStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('levelUp_nutrition', JSON.stringify(nutritionData));
    }, [nutritionData]);

    const handleAddFood = (mealId) => {
        // En una app real, esto abriría un modal para buscar alimentos.
        // Aquí simulamos añadir un snack rápido.
        const newFood = { name: 'Snack Rápido', kcal: 150 };
        const protein = 5;
        const carbs = 20;
        const fat = 5;

        setNutritionData(prev => {
            const newMeals = prev.meals.map(meal => {
                if (meal.id === mealId) {
                    return {
                        ...meal,
                        calories: meal.calories + newFood.kcal,
                        items: [...meal.items, newFood]
                    };
                }
                return meal;
            });

            return {
                ...prev,
                consumed: prev.consumed + newFood.kcal,
                macros: {
                    protein: prev.macros.protein + protein,
                    carbs: prev.macros.carbs + carbs,
                    fat: prev.macros.fat + fat
                },
                meals: newMeals
            };
        });
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '1.5rem' }}>
                <h1>Nutrición</h1>
                <p className="text-muted">Tu combustible diario</p>
            </header>

            <CalorieProgress
                consumed={nutritionData.consumed}
                target={nutritionData.target}
                macros={nutritionData.macros}
            />

            <div>
                {nutritionData.meals.map(meal => (
                    <MealCard
                        key={meal.id}
                        {...meal}
                        onAdd={() => handleAddFood(meal.id)}
                    />
                ))}
            </div>

            <p className="text-muted text-center" style={{ fontSize: '0.75rem', marginTop: '1rem' }}>
                * Toca el botón + para añadir un snack rápido (+150 kcal)
            </p>
        </div>
    );
};

export default Nutrition;
