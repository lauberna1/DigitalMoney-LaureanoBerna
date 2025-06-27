import { Text } from "@/components/Text/Text";
import { Service } from "@/types/globalTypes";
import { getServiceSrc } from "@/utils/getServiceImg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BounceLoader } from "react-spinners";
import s from "./ServiciosList.module.css";

export function ServiciosList({ services }: { services: Service[] | null }) {
  const router = useRouter();

  return (
    <div className={s.container}>
      <div>
        <Text variant="h6">Más recientes</Text>
      </div>
      <span className={s.separator} />
      <div className={s.content}>
        {services === null && (
          <div className={s.loader}>
            <BounceLoader size="50px" />
          </div>
        )}
        {services?.length === 0 && (
          <div className={s.noServices}>No tienes servicios disponibles</div>
        )}
        {services?.map(({ id, name }) => (
          <React.Fragment key={id}>
            <div
              className={s.item}
              onClick={() => router.push(`/dashboard/servicios/pagar/${id}`)}
            >
              <Image
                src={getServiceSrc(name) || ""}
                alt={name}
                width={60}
                height={20}
              />
              <Text variant="sm" className={s.title}>
                {name}
              </Text>
              <Text variant="sm" className={s.select}>
                Seleccionar
              </Text>
            </div>
            <span className={s.separator} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
