import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import { TaskType } from "@/types/api.type";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { transformStatusEnum } from "@/lib/helper";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";

const CalendarView = () => {
  const workspaceId = useWorkspaceId();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data, isLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () => getAllTasksQueryFn({ workspaceId }),
    enabled: !!workspaceId,
  });

  const tasks: TaskType[] = data?.tasks || [];

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get weekday offset for the first day of the month (0 = Sun, 1 = Mon, etc.)
  const startDayOffset = getDay(monthStart);

  // Pad the grid start with empty cells
  const gridCells = Array.from({ length: startDayOffset }).map(() => null);
  const allCells = [...gridCells, ...daysInMonth];

  // Helper to get tasks due on a specific day
  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => task.dueDate && isSameDay(new Date(task.dueDate), day));
  };

  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
  const selectedDayTasks = selectedDay ? getTasksForDay(selectedDay) : [];

  return (
    <main className="flex flex-1 flex-col gap-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[34px] font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Calendar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Track all task deadlines and milestones chronologically.
          </p>
        </div>

        {/* Month Navigation Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
            className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-semibold px-2 min-w-[120px] text-center text-slate-800 dark:text-slate-200">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid - Left 2 Columns */}
          <div className="lg:col-span-2 clean-card bg-white dark:bg-slate-800 p-6 flex flex-col">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-4 border-b border-slate-100 dark:border-slate-700/50 pb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span
                  key={day}
                  className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Monthly Day Grid */}
            <div className="grid grid-cols-7 gap-2 flex-1 min-h-[350px]">
              {allCells.map((day, idx) => {
                if (!day) {
                  return <div key={`empty-${idx}`} className="aspect-square bg-slate-50/30 dark:bg-slate-900/10 rounded-xl" />;
                }

                const dayTasks = getTasksForDay(day);
                const isDaySelected = selectedDay && isSameDay(day, selectedDay);
                const isDayToday = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square flex flex-col justify-between p-2 rounded-xl border text-left transition-all duration-150 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 relative group
                      ${
                        isDaySelected
                          ? "bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500"
                          : "bg-slate-50/50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-700"
                      }
                    `}
                  >
                    <span
                      className={`text-xs font-bold rounded-md h-5 w-5 flex items-center justify-center
                        ${isDayToday && !isDaySelected ? "bg-indigo-600 text-white dark:bg-indigo-500" : ""}
                        ${isDaySelected ? "text-white" : "text-slate-800 dark:text-slate-200"}
                      `}
                    >
                      {format(day, "d")}
                    </span>

                    {/* Deadline Dots/Indicators */}
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {dayTasks.slice(0, 3).map((task) => (
                        <span
                          key={task._id}
                          className={`h-1.5 w-1.5 rounded-full
                            ${
                              isDaySelected
                                ? "bg-white"
                                : task.priority === "HIGH"
                                ? "bg-red-500"
                                : task.priority === "MEDIUM"
                                ? "bg-orange-500"
                                : "bg-indigo-500"
                            }
                          `}
                        />
                      ))}
                      {dayTasks.length > 3 && (
                        <span className={`text-[9px] font-bold leading-none ${isDaySelected ? "text-white" : "text-slate-400"}`}>
                          +{dayTasks.length - 3}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day Deadlines Details List - Right 1 Column */}
          <div className="clean-card bg-white dark:bg-slate-800 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-3">
              <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {selectedDay ? format(selectedDay, "MMMM d, yyyy") : "Select a date"}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[420px] scrollbar pr-1">
              {selectedDayTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                    No deadlines scheduled for this day.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5">
                  {selectedDayTasks.map((task) => (
                    <div
                      key={task._id}
                      className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/10 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col gap-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                          {task.taskCode}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant={TaskStatusEnum[task.status]}
                            className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md"
                          >
                            {transformStatusEnum(task.status)}
                          </Badge>
                          <Badge
                            variant={TaskPriorityEnum[task.priority]}
                            className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md"
                          >
                            {transformStatusEnum(task.priority)}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                        {task.title}
                      </p>
                      {task.project && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <span className="text-base select-none">{task.project.emoji}</span>
                          <span className="font-medium text-slate-500 dark:text-slate-400 truncate">
                            {task.project.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CalendarView;
