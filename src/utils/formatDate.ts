export const formatDate = (isoString: string | undefined) => {
  if (!isoString) return "Fecha desconocida";

  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(date);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${formattedDate} a ${hours}:${minutes} hs.`;
};
