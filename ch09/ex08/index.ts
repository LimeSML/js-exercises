export const State = {
    NORMAL: 'normal',
    ALARM_SET: 'alarmSet',
    ALARM_SOUNDING: 'alarmSounding',
    SNOOZING: 'snoozing',
} as const;
export type State = typeof State[keyof typeof State];

export const Action = {
    NONE: 'none',
    SOUND_ALARM: 'soundAlarm',
    STOP_ALARM: 'stopAlarm',
} as const;
export type Action = typeof Action[keyof typeof Action];


export function setAlarm(state: State): [Action, State] {
    switch (state) {
        case State.NORMAL:
            return [Action.NONE, State.ALARM_SET];
        default:
            return [Action.NONE, state];
    }
}

export function cancelAlarm(state: State): [Action, State] {
    switch (state) {
        case State.ALARM_SET:
            return [Action.NONE, State.NORMAL];
        case State.ALARM_SOUNDING:
            return [Action.STOP_ALARM, State.NORMAL];
        case State.SNOOZING:
            return [Action.NONE, State.NORMAL];
        default:
            return [Action.NONE, state];
    }
}

export function reachedToAlarmTime(state: State): [Action, State] {
    switch (state) {
        case State.ALARM_SET:
            return [Action.SOUND_ALARM, State.ALARM_SOUNDING];
        default:
            return [Action.NONE, state];
    }
}

export function snooze(state: State): [Action, State] {
    switch (state) {
        case State.ALARM_SOUNDING:
            return [Action.STOP_ALARM, State.SNOOZING];
        default:
            return [Action.NONE, state];
    }
}

export function elapseSnoozeTime(state: State): [Action, State] {
    switch (state) {
        case State.SNOOZING:
            return [Action.SOUND_ALARM, State.ALARM_SOUNDING];
        default:
            return [Action.NONE, state];
    }
}