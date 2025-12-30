import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Exercise {
  id: string;
  name: string;
  icon: string;
  currentLevel: number;
  totalLevels: number;
  levels: { name: string; reps: string }[];
}

const exercises: Exercise[] = [
  {
    id: 'pushup',
    name: 'Отжимания',
    icon: 'Dumbbell',
    currentLevel: 3,
    totalLevels: 10,
    levels: [
      { name: 'Отжимания от стены', reps: '3×50' },
      { name: 'Отжимания на коленях', reps: '3×40' },
      { name: 'Половинные отжимания', reps: '3×30' },
      { name: 'Полные отжимания', reps: '3×25' },
      { name: 'Узкие отжимания', reps: '3×20' },
      { name: 'Разновысокие отжимания', reps: '3×20' },
      { name: 'Половинные на одной руке', reps: '3×15' },
      { name: 'Отжимания с рычагом', reps: '3×12' },
      { name: 'Половинные на одной руке', reps: '3×10' },
      { name: 'Отжимания на одной руке', reps: '3×100' }
    ]
  },
  {
    id: 'pullup',
    name: 'Подтягивания',
    icon: 'TrendingUp',
    currentLevel: 2,
    totalLevels: 10,
    levels: [
      { name: 'Вертикальные подтягивания', reps: '3×40' },
      { name: 'Горизонтальные подтягивания', reps: '3×30' },
      { name: 'Подтягивания с поддержкой', reps: '3×20' },
      { name: 'Половинные подтягивания', reps: '3×15' },
      { name: 'Полные подтягивания', reps: '3×10' },
      { name: 'Узкие подтягивания', reps: '3×10' },
      { name: 'Разновысокие подтягивания', reps: '3×9' },
      { name: 'Половинные на одной руке', reps: '3×7' },
      { name: 'Подтягивания с рычагом', reps: '3×6' },
      { name: 'Подтягивания на одной руке', reps: '3×100' }
    ]
  },
  {
    id: 'squat',
    name: 'Приседания',
    icon: 'Activity',
    currentLevel: 4,
    totalLevels: 10,
    levels: [
      { name: 'Приседания у стены', reps: '3×50' },
      { name: 'Приседания на стул', reps: '3×40' },
      { name: 'Половинные приседания', reps: '3×35' },
      { name: 'Полные приседания', reps: '3×30' },
      { name: 'Узкие приседания', reps: '3×25' },
      { name: 'Разновысокие приседания', reps: '3×20' },
      { name: 'Половинные на одной ноге', reps: '3×15' },
      { name: 'Приседания с рычагом', reps: '3×12' },
      { name: 'Неполные на одной ноге', reps: '3×10' },
      { name: 'Приседания на одной ноге', reps: '3×50' }
    ]
  },
  {
    id: 'legrise',
    name: 'Подъёмы ног',
    icon: 'Maximize2',
    currentLevel: 1,
    totalLevels: 10,
    levels: [
      { name: 'Подтягивание коленей', reps: '3×40' },
      { name: 'Подъёмы согнутых ног', reps: '3×35' },
      { name: 'Плоские подъёмы согнутых ног', reps: '3×30' },
      { name: 'Плоские подъёмы прямых ног', reps: '3×25' },
      { name: 'Подъёмы прямых ног', reps: '3×20' },
      { name: 'Висячие подъёмы согнутых ног', reps: '3×15' },
      { name: 'Висячие подъёмы прямых ног', reps: '3×15' },
      { name: 'Висячие подъёмы выше пояса', reps: '3×15' },
      { name: 'Неполные подъёмы прямых ног', reps: '3×10' },
      { name: 'Висячие подъёмы прямых ног', reps: '3×30' }
    ]
  },
  {
    id: 'bridge',
    name: 'Мостик',
    icon: 'ArrowUpCircle',
    currentLevel: 2,
    totalLevels: 10,
    levels: [
      { name: 'Короткий мостик', reps: '3×50' },
      { name: 'Прямой мостик', reps: '3×40' },
      { name: 'Мостик на плечах', reps: '3×30' },
      { name: 'Короткий мостик головой вниз', reps: '3×25' },
      { name: 'Полный мостик', reps: '3×20' },
      { name: 'Узкий мостик', reps: '3×15' },
      { name: 'Разновысокий мостик', reps: '3×12' },
      { name: 'Половинный на одной руке', reps: '3×10' },
      { name: 'Мостик с рычагом', reps: '3×8' },
      { name: 'Мостик на одной руке', reps: '3×30' }
    ]
  },
  {
    id: 'handstand',
    name: 'Стойка на руках',
    icon: 'ChevronUp',
    currentLevel: 1,
    totalLevels: 10,
    levels: [
      { name: 'Стойка на руках у стены', reps: '2 мин' },
      { name: 'Стойка на руках (ворона)', reps: '1 мин' },
      { name: 'Стойка на руках (согнутые ноги)', reps: '1 мин' },
      { name: 'Полная стойка на руках', reps: '2 мин' },
      { name: 'Узкая стойка на руках', reps: '1 мин' },
      { name: 'Разновысокая стойка', reps: '1 мин' },
      { name: 'Половинная на одной руке', reps: '30 сек' },
      { name: 'Стойка с рычагом', reps: '20 сек' },
      { name: 'Неполная на одной руке', reps: '15 сек' },
      { name: 'Стойка на одной руке', reps: '30 сек' }
    ]
  }
];

const trainingDays = [
  { date: '2024-01-15', completed: true },
  { date: '2024-01-17', completed: true },
  { date: '2024-01-19', completed: true },
  { date: '2024-01-22', completed: true },
  { date: '2024-01-24', completed: true },
  { date: '2024-01-26', completed: false },
  { date: '2024-01-29', completed: false }
];

export default function Index() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-20">
      <header className="mb-8 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold tracking-wider text-primary">
            CONVICT
          </h1>
          <Badge variant="destructive" className="text-sm">
            День 26
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm uppercase tracking-wide">
          Conditioning
        </p>
      </header>

      <Tabs defaultValue="workouts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-card">
          <TabsTrigger value="workouts" className="uppercase text-xs">
            <Icon name="Dumbbell" size={16} className="mr-2" />
            Тренировки
          </TabsTrigger>
          <TabsTrigger value="progress" className="uppercase text-xs">
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Прогресс
          </TabsTrigger>
          <TabsTrigger value="calendar" className="uppercase text-xs">
            <Icon name="Calendar" size={16} className="mr-2" />
            Календарь
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-2xl mb-2 text-primary">БОЛЬШАЯ ШЕСТЕРКА</h2>
            <p className="text-sm text-muted-foreground">
              Прогрессивные упражнения с собственным весом
            </p>
          </div>

          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="p-4 bg-card border-border hover:border-primary transition-all cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-sm bg-primary/20 flex items-center justify-center">
                    <Icon name={exercise.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{exercise.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase">
                      Уровень {exercise.currentLevel}/{exercise.totalLevels}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {exercise.levels[exercise.currentLevel - 1].reps}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{exercise.levels[exercise.currentLevel - 1].name}</span>
                  <span>{Math.round((exercise.currentLevel / exercise.totalLevels) * 100)}%</span>
                </div>
                <Progress
                  value={(exercise.currentLevel / exercise.totalLevels) * 100}
                  className="h-2"
                />
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="mb-4">
            <h2 className="text-2xl mb-2 text-primary">СТАТИСТИКА</h2>
            <p className="text-sm text-muted-foreground">
              Общий прогресс по всем упражнениям
            </p>
          </div>

          <Card className="p-6 bg-card border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Общий прогресс</h3>
              <span className="text-3xl font-bold text-primary">
                {Math.round(
                  (exercises.reduce((acc, ex) => acc + ex.currentLevel, 0) /
                    (exercises.length * 10)) *
                    100
                )}%
              </span>
            </div>
            <Progress
              value={
                (exercises.reduce((acc, ex) => acc + ex.currentLevel, 0) /
                  (exercises.length * 10)) *
                100
              }
              className="h-3"
            />
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Flame" size={20} className="text-primary" />
                <span className="text-xs text-muted-foreground uppercase">Серия</span>
              </div>
              <p className="text-3xl font-bold">12 дней</p>
            </Card>

            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Target" size={20} className="text-primary" />
                <span className="text-xs text-muted-foreground uppercase">Всего</span>
              </div>
              <p className="text-3xl font-bold">26 дней</p>
            </Card>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon name={exercise.icon} size={18} className="text-primary" />
                    <span className="text-sm font-bold">{exercise.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {exercise.currentLevel}/10
                  </Badge>
                </div>
                <Progress
                  value={(exercise.currentLevel / exercise.totalLevels) * 100}
                  className="h-2"
                />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-2xl mb-2 text-primary">КАЛЕНДАРЬ</h2>
            <p className="text-sm text-muted-foreground">
              История тренировок
            </p>
          </div>

          <Card className="p-6 bg-card border-border">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs text-muted-foreground font-bold"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => {
                const dayNum = i + 1;
                const hasTraining = trainingDays.some(
                  (d) => d.date.endsWith(`-${dayNum.toString().padStart(2, '0')}`)
                );
                const isCompleted = trainingDays.find(
                  (d) => d.date.endsWith(`-${dayNum.toString().padStart(2, '0')}`)
                )?.completed;

                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-sm text-sm font-bold transition-all ${
                      hasTraining
                        ? isCompleted
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                        : 'bg-card text-muted-foreground'
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-primary"></div>
              <span className="text-muted-foreground">Выполнено</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-muted"></div>
              <span className="text-muted-foreground">Запланировано</span>
            </div>
          </div>

          <Card className="p-4 bg-card border-border">
            <h3 className="text-sm font-bold mb-3 uppercase">Ближайшая тренировка</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">Завтра</p>
                <p className="text-xs text-muted-foreground">
                  Отжимания • Приседания • Мостик
                </p>
              </div>
              <Button size="sm" className="uppercase">
                Начать
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedExercise && (
        <div
          className="fixed inset-0 bg-background/95 z-50 p-4 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedExercise(null)}
        >
          <div className="max-w-2xl mx-auto pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-primary">
                {selectedExercise.name}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedExercise(null)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <Card className="p-4 bg-card border-border mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground uppercase mb-1">
                    Текущий уровень
                  </p>
                  <p className="text-2xl font-bold">
                    {selectedExercise.currentLevel}/10
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground uppercase mb-1">
                    Прогресс
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {Math.round(
                      (selectedExercise.currentLevel / selectedExercise.totalLevels) * 100
                    )}%
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              {selectedExercise.levels.map((level, idx) => (
                <Card
                  key={idx}
                  className={`p-4 border ${
                    idx + 1 === selectedExercise.currentLevel
                      ? 'bg-primary/20 border-primary'
                      : idx + 1 < selectedExercise.currentLevel
                      ? 'bg-card/50 border-border'
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          idx + 1 <= selectedExercise.currentLevel
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{level.name}</p>
                        <p className="text-xs text-muted-foreground">{level.reps}</p>
                      </div>
                    </div>
                    {idx + 1 < selectedExercise.currentLevel && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                    {idx + 1 === selectedExercise.currentLevel && (
                      <Badge variant="destructive" className="text-xs">
                        Текущий
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
