/** Date selection step with mobile-friendly calendar */

import type { FormData, FormAction } from '../../types/form';
import { useState, useMemo, useCallback } from 'react';

interface StepDateProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
}

function getTodayTimestamp(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function getMonthStartTimestamp(timestamp: number): number {
  const d = new Date(timestamp);
  d.setDate(1);
  return d.getTime();
}

export function StepDate({ formData, dispatch }: StepDateProps) {
  // Initialize timestamps using lazy state initialization - runs only once
  const todayTimestamp = useState(() => getTodayTimestamp())[0];
  const todayMonthStartTimestamp = useState(() => getMonthStartTimestamp(todayTimestamp))[0];

  // Initialize state from props directly - no effect needed
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date(todayMonthStartTimestamp));
  const [selectedDate, setSelectedDate] = useState<string>(formData.preferredDate || '');

  const daysInMonth = useCallback((date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add leading days from previous month
    const startDay = firstDay.getDay();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add trailing days from next month
    const endDay = lastDay.getDay();
    for (let i = 1; i < 7 - endDay; i++) {
      days.push(new Date(year, month, lastDay.getDate() + i));
    }

    return days;
  }, []);

  const formatDate = useCallback((date: Date): string => {
    return date.toISOString().split('T')[0];
  }, []);

  const isTodayDate = useCallback((date: Date): boolean => {
    const compare = new Date(date);
    compare.setHours(0, 0, 0, 0);
    return compare.getTime() === todayTimestamp;
  }, [todayTimestamp]);

  const isPast = useCallback((date: Date): boolean => {
    const compare = new Date(date);
    compare.setHours(0, 0, 0, 0);
    return compare.getTime() < todayTimestamp;
  }, [todayTimestamp]);

  const isSelected = useCallback((date: Date): boolean => {
    return formatDate(date) === selectedDate;
  }, [formatDate, selectedDate]);

  const isCurrentMonth = useCallback((date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
  }, [currentMonth]);

  const handleDayClick = useCallback((date: Date) => {
    if (isPast(date) || !isCurrentMonth(date)) return;
    const formatted = formatDate(date);
    setSelectedDate(formatted);
    dispatch({ type: 'SET_PREFERRED_DATE', payload: formatted });
  }, [isPast, isCurrentMonth, formatDate, dispatch]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      // Don't go before current month
      if (newMonth.getTime() >= todayMonthStartTimestamp) {
        return newMonth;
      }
      return prev;
    });
  }, [todayMonthStartTimestamp]);

  const handleNext = useCallback(() => {
    if (selectedDate) {
      dispatch({ type: 'NEXT_STEP' });
    }
  }, [selectedDate, dispatch]);

  const monthNames = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
  ];

  const dayNames = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];

  const days = useMemo(() => daysInMonth(currentMonth), [daysInMonth, currentMonth]);

  return (
    <div className="min-h-screen flex flex-col px-[24px] pt-24 pb-16 screen-transition bg-white">
      <div className="max-w-md w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-navy leading-tight text-balance">
            Kdy vám vyhovuje?
          </h2>
          <p className="mt-2 text-navy/50">Vyberte preferovaný den. Termín potvrdíme dopředu.</p>
        </div>

        {/* Calendar */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6">
          <div className="card p-4">
            {/* Month header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                disabled={currentMonth.getTime() <= todayMonthStartTimestamp}
                className="p-2 rounded-xl text-navy/50 hover:bg-marble-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Předchozí měsíc"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="font-ui font-semibold text-lg text-navy">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl text-navy/50 hover:bg-marble-bg transition-colors"
                aria-label="Další měsíc"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-navy/40 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDayClick(day)}
                  disabled={isPast(day) || !isCurrentMonth(day)}
                  className={`aspect-square rounded-xl text-sm font-medium transition-all duration-150 ${
                    isSelected(day)
                      ? 'bg-navy text-white'
                      : isPast(day) || !isCurrentMonth(day)
                      ? 'text-navy/20 cursor-not-allowed'
                      : isTodayDate(day)
                      ? 'text-navy font-semibold ring-2 ring-navy/30'
                      : 'text-navy/70 hover:bg-marble-bg active:bg-marble-vein/30'
                  }`}
                  aria-selected={isSelected(day)}
                  aria-disabled={isPast(day) || !isCurrentMonth(day)}
                  aria-label={day.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' })}
                >
                  {day.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* Selected date display */}
          {selectedDate && (
            <div className="mt-4 p-4 bg-marble-bg border border-marble-vein card-radius">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-ui font-medium text-navy">
                    Vybráno: {new Date(selectedDate).toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <p className="text-sm text-navy/50 mt-2">
                Toto je preferovaný termín. Konkrétní čas domluvíme při potvrzování.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleNext}
            disabled={!selectedDate}
            className="w-full cta-primary pressable font-ui font-semibold text-lg rounded-card tap-target ${
              selectedDate
                ? ''
                : 'opacity-40 cursor-not-allowed'
            }"
          >
            Pokračovat
          </button>
          <button
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            className="w-full cta-secondary pressable font-ui font-medium text-base rounded-card tap-target"
          >
            Zpět
          </button>
        </div>
      </div>
    </div>
  );
}