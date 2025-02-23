export const EstablishmentType = {
    HEADQUARTERS: "HEADQUARTERS", 
    SUB_HEADQUARTERS: "SUB_HEADQUARTERS",
    BRANCH: "BRANCH"
} as const;

export type EstablishmentTypeKeys = keyof typeof EstablishmentType;
export type EstablishmentTypeValues = typeof EstablishmentType[keyof typeof EstablishmentType];


// export enum EstablishmentType {
//     HEADQUARTERS = "HEADQUARTERS", // MATRIZ
//     SUB_HEADQUARTERS = "SUB_HEADQUARTERS", // SUB_MATRIZ
//     BRANCH = "BRANCH", // FILIAL
// };