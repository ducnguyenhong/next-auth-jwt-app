"use client";

import { useEffect } from "react";

export function useBridge() {
  useEffect(() => {
    function handler(e: Event | CustomEvent) {
      if (!(e instanceof CustomEvent)) {
        return;
      }

      if (!e.detail) {
        return;
      }

      const { id, payload } = e.detail;

      if (!payload) {
        return;
      }

      switch (payload.type) {
        case "get-user":
          document.dispatchEvent(
            new CustomEvent("classon", {
              detail: {
                id,
                payload: {
                  id,
                  msg: "day la demo user nhe e",
                },
              },
            })
          );
          break;

        default:
          break;
      }
    }

    document.addEventListener("classon", handler);

    return () => {
      document.removeEventListener("classon", handler);
    };
  }, []);
}
