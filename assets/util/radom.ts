export const getRandNum = ({ min, max }: { min: number, max: number }): number => Math.floor(Math.random() * max) + min

export const trueOrNot = (): boolean => Math.round(Math.random()) === 1