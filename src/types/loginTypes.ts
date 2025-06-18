export type EmailStepData = {
  email: string;
};

export type FullStepData = {
  email: string;
  password?: string; // OPCIONAL PARA QUE EN EL STEP DE EMAIL NO DE ERROR
};
