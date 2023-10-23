import { expect, vi } from 'vitest';

import { act, renderHook } from '@testing-library/react';
import { useCountdown } from './useCountdown';

vi.useFakeTimers();

describe('useCountdown', () => {
  it('should return the correct remaining time and isCompleted equal to false when target date is in future', () => {
    const mockCurrentDate = new Date('2023-10-10 12:00:00.000-00:00');
    const mockTargetDate = new Date('2023-10-14 15:02:01.000-00:00');
    vi.setSystemTime(mockCurrentDate);

    const { result } = renderHook(() =>
      useCountdown({ targetISODate: mockTargetDate.toISOString() })
    );

    expect(result.current.days).toBe(4);
    expect(result.current.hours).toBe(3);
    expect(result.current.minutes).toBe(2);
    expect(result.current.seconds).toBe(1);
    expect(result.current.isCompleted).toBe(false);
  });

  it('should return 0 for all time units and isCompleted equal to true when the target date is in past', () => {
    const mockCurrentDate = new Date('2023-10-10 12:00:00.000-00:00');
    const mockTargetDate = new Date('2023-10-10 11:00:00.000-00:00');
    vi.setSystemTime(mockCurrentDate);

    const { result } = renderHook(() =>
      useCountdown({ targetISODate: mockTargetDate.toISOString() })
    );

    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
    expect(result.current.isCompleted).toBe(true);
  });

  it('should change the flag and time values to 0 when reaching target time', () => {
    const mockCurrentDate = new Date('2023-10-10 12:00:00.000-00:00');
    const mockTargetDate = new Date('2023-10-10 12:00:01.000-00:00');
    vi.setSystemTime(mockCurrentDate);

    const { result } = renderHook(() =>
      useCountdown({ targetISODate: mockTargetDate.toISOString() })
    );

    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(1);
    expect(result.current.isCompleted).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
    expect(result.current.isCompleted).toBe(true);
  });

  it('should call the onComplete callback when reaching target time', () => {
    const onCompleteSpy = vi.fn();
    const mockCurrentDate = new Date('2023-10-10 12:00:00.000-00:00');
    const mockTargetDate = new Date('2023-10-10 12:00:01.000-00:00');
    vi.setSystemTime(mockCurrentDate);

    renderHook(() =>
      useCountdown({
        targetISODate: mockTargetDate.toISOString(),
        onComplete: onCompleteSpy,
      })
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onCompleteSpy).toHaveBeenCalledOnce();
  });
});
