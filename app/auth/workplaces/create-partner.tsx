"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PartnerType } from "./types";

type FormData = {
  title: string;
  partner_type_id: string;
};

const schema = z.object({
  title: z.string().min(1, { message: "Required" }),
  partner_type_id: z.string().uuid(),
});

interface Props {
  partnerTypes: PartnerType[];
}

export function CreateNewPartner({ partnerTypes }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = useCallback(async (data: FormData) => {
    try {
      console.log(499, data);
      const resp = await fetch("/api/partner", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        const txt = await resp.text().catch(() => "Unknown error");
        throw new Error(txt);
      }

      window.location.reload();
    } catch (e: any) {
      alert(e.message);
    }
  }, []);

  // const types = useMemo(() => {
  //   return partnerTypes.map((p) => {
  //     return {
  //       label: `[${p.code}] ${p.title}`,
  //       value: p.id,
  //       description: p.desc,
  //     };
  //   });
  // }, [partnerTypes]);

  const partnerType = watch("partner_type_id");

  return (
    <>
      <Button color="primary" onClick={onOpen}>
        Create new partner
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new partner
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Your workplace's name"
                  variant="flat"
                  {...register("title")}
                  isInvalid={typeof errors.title !== "undefined"}
                  errorMessage={errors.title?.message}
                />
                <Select
                  items={partnerTypes.map((p) => ({
                    ...p,
                    description: p.code,
                    value: p.id,
                  }))}
                  label="Choose your workplace type"
                  placeholder="Select a type that suitable for you"
                  selectedKeys={partnerType ? [partnerType] : []}
                  onSelectionChange={(item) => {
                    if (typeof item === "undefined" || item === "all") {
                      return;
                    }

                    for (const ele of item) {
                      if (typeof ele === "string") {
                        setValue("partner_type_id", ele);
                      }
                    }
                  }}
                  isInvalid={typeof errors.partner_type_id !== "undefined"}
                  errorMessage={errors.partner_type_id?.message}
                >
                  {(item) => (
                    <SelectItem key={item.id} textValue={item.title}>
                      <div className="flex flex-row items-center gap-2">
                        <span className="flex-1">{item.title}</span>
                        <Chip color="default">{item.code}</Chip>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSubmit(onSubmit)()}
                  disabled={
                    isSubmitting ||
                    Object.values(errors).filter(
                      (o) => typeof o !== "undefined"
                    ).length > 0
                  }
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
