export interface ComponentParam<Props> {
    $el: HTMLElement,
    props?: Props,
}

export const PROGRESS = {
    FORWARD: 'FORWARD',
    STOP: 'STOP'
} as const;
export type PROGRESS = typeof PROGRESS[keyof typeof PROGRESS];
