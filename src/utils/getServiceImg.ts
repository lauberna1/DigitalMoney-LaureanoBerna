interface ServiceImg {
  src: string;
}

const SERVICE: Record<number, ServiceImg> = {
  1: { src: "/images/services/netflix.svg" },
  2: { src: "/images/services/prime.svg" },
  3: { src: "/images/services/hbomax.svg" },
  4: { src: "/images/services/disney.svg" },
  5: { src: "/images/services/paramount.svg" },
  6: { src: "/images/services/appletv.svg" },
  7: { src: "/images/services/hulu.svg" },
  8: { src: "/images/services/peacock.svg" },
  9: { src: "/images/services/discovery.svg" },
  10: { src: "/images/services/crunchyroll.svg" },
  11: { src: "/images/services/funimation.svg" },
  12: { src: "/images/services/mubi.svg" },
};

const serviceNameMap: { [key: string]: number } = {
  Netflix: 1,
  "Amazon Prime Video": 2,
  "HBO Max": 3,
  "Disney+": 4,
  "Paramount+": 5,
  "Apple TV+": 6,
  Hulu: 7,
  Peacock: 8,
  "Discovery+": 9,
  Crunchyroll: 10,
  Funimation: 11,
  Mubi: 12,
};

export function getServiceSrc(serviceName: string): string | null {
  const id = serviceNameMap[serviceName];
  return id ? SERVICE[id].src : null;
}
