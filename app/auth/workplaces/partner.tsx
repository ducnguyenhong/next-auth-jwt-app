"use client";

import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";
import { useCallback } from "react";
import ReactCountryFlag from "react-country-flag";
import { Partner } from "./types";

export function Partner(p: Partner) {
  const chooseWorkplace = useCallback(async () => {
    try {
      const resp = await fetch("/api/workplaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partner_id: p.id,
        }),
      });
      if (!resp.ok) {
        const txt = await resp.text().catch(() => "Unknown error");
        throw new Error(txt);
      }

      window.location.href = "/";
    } catch (e: any) {
      alert(e.message);
    }
  }, [p.id]);

  return (
    <div onClick={chooseWorkplace}>
      <Card
        className={clsx("p-2", {
          "pointer-events-none bg-gray-300": !p.status,
          "hover:bg-gray-100 cursor-pointer": p.status,
        })}
        key={p.id}
      >
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={p.extra?.logo} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {p.title}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {p.code}
              </h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <div className="flex gap-2">
            <Chip variant="faded" color="success">
              {p.PartnerType.code}
            </Chip>

            <Chip radius="sm">{p.PartnerType.title}</Chip>
          </div>
          <span className="pt-2">
            <ReactCountryFlag countryCode={p.country} className="emojiFlag" />
          </span>
        </CardBody>
        <CardFooter className="gap-1 flex-col items-start">
          <div className="flex gap-1">
            <Link
              href={p.website || p.domain || "#"}
              className="font-semibold text-default-400 text-small"
            >
              {p.domain ?? "No website"}
            </Link>
          </div>
          <p className="text-default-400 text-small">
            {p.address ?? "Unknown address"}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
