import {
  State,
  Action,
  setAlarm,
  cancelAlarm,
  reachedToAlarmTime,
  snooze,
  elapseSnoozeTime,
} from "./index.ts";

describe("setAlarm", () => {
  it("should set alarm when in NORMAL state", () => {
    expect(setAlarm(State.NORMAL)).toEqual([Action.NONE, State.ALARM_SET]);
  });
  it("should do nothing in other states", () => {
    expect(setAlarm(State.ALARM_SET)).toEqual([Action.NONE, State.ALARM_SET]);
    expect(setAlarm(State.ALARM_SOUNDING)).toEqual([
      Action.NONE,
      State.ALARM_SOUNDING,
    ]);
    expect(setAlarm(State.SNOOZING)).toEqual([Action.NONE, State.SNOOZING]);
  });
});

describe("cancelAlarm", () => {
  it("should cancel alarm when in ALARM_SET state", () => {
    expect(cancelAlarm(State.ALARM_SET)).toEqual([Action.NONE, State.NORMAL]);
  });
  it("should stop alarm when in ALARM_SOUNDING state", () => {
    expect(cancelAlarm(State.ALARM_SOUNDING)).toEqual([
      Action.STOP_ALARM,
      State.NORMAL,
    ]);
  });
  it("should cancel snooze when in SNOOZING state", () => {
    expect(cancelAlarm(State.SNOOZING)).toEqual([Action.NONE, State.NORMAL]);
  });
  it("should do nothing in NORMAL state", () => {
    expect(cancelAlarm(State.NORMAL)).toEqual([Action.NONE, State.NORMAL]);
  });
});

describe("reachedToAlarmTime", () => {
  it("should sound alarm when in ALARM_SET state", () => {
    expect(reachedToAlarmTime(State.ALARM_SET)).toEqual([
      Action.SOUND_ALARM,
      State.ALARM_SOUNDING,
    ]);
  });
  it("should do nothing in other states", () => {
    expect(reachedToAlarmTime(State.NORMAL)).toEqual([
      Action.NONE,
      State.NORMAL,
    ]);
    expect(reachedToAlarmTime(State.ALARM_SOUNDING)).toEqual([
      Action.NONE,
      State.ALARM_SOUNDING,
    ]);
    expect(reachedToAlarmTime(State.SNOOZING)).toEqual([
      Action.NONE,
      State.SNOOZING,
    ]);
  });
});

describe("snooze", () => {
  it("should snooze when in ALARM_SOUNDING state", () => {
    expect(snooze(State.ALARM_SOUNDING)).toEqual([
      Action.STOP_ALARM,
      State.SNOOZING,
    ]);
  });
  it("should do nothing in other states", () => {
    expect(snooze(State.NORMAL)).toEqual([Action.NONE, State.NORMAL]);
    expect(snooze(State.ALARM_SET)).toEqual([Action.NONE, State.ALARM_SET]);
    expect(snooze(State.SNOOZING)).toEqual([Action.NONE, State.SNOOZING]);
  });
});

describe("elapseSnoozeTime", () => {
  it("should sound alarm again when snooze time elapses", () => {
    expect(elapseSnoozeTime(State.SNOOZING)).toEqual([
      Action.SOUND_ALARM,
      State.ALARM_SOUNDING,
    ]);
  });
  it("should do nothing in other states", () => {
    expect(elapseSnoozeTime(State.NORMAL)).toEqual([Action.NONE, State.NORMAL]);
    expect(elapseSnoozeTime(State.ALARM_SET)).toEqual([
      Action.NONE,
      State.ALARM_SET,
    ]);
    expect(elapseSnoozeTime(State.ALARM_SOUNDING)).toEqual([
      Action.NONE,
      State.ALARM_SOUNDING,
    ]);
  });
});
