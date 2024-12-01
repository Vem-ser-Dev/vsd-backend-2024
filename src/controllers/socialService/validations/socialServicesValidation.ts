import { z } from "zod";
import { ESocialServiceStatus } from "../../../models/ESocialServiceStatus";

const serviceCategorySchema = z.object(
  {
    uid: z.string().uuid({ message: "Invalid UUID" }).optional(),
    name: z.string().optional(),
  },
  { required_error: "service_category is required" }
);

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/çÇ=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const phoneRegex = /^\d{10,11}$/;

export async function createSocialServiceValidation(body: unknown) {
  const socialServiceBodySchema = z.object({
    service_name: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .max(100, "Limite de caracteres excedido.Permitido até: 100."),
    service_category: z.object({
      uid: z.string().optional(),
      name: z.string().optional(),
    }),
    description: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .max(255, "Limite de caracteres excedido.Permitido até: 255."),
    agent_name: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .max(80, "Limite de caracteres excedido.Permitido até: 80."),
    agent_role: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .max(50, "Limite de caracteres excedido.Permitido até: 50."),
    contactType: z.enum(["phone", "email"], { message: "Campo obrigatório" }),
    contactInfo: z
      .string({ message: "Campo obrigatório" })
      .refine(
        (value) => phoneRegex.test(value) || emailRegex.test(value),
        "Insira um Telefone ou E-mail válido"
      ),
    website: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .url("O site deve possuir o prefixo: 'https://'"),
    status: z.enum([
      ESocialServiceStatus.ENABLED,
      ESocialServiceStatus.DISABLED,
    ]),
    organ: z.string().max(100).optional(),
    management: z.string().max(100).optional(),
    public_unit: z.string().max(100).optional(),
    organization: z.string().max(100).optional(),
    service_provider: z.string().max(100).optional(),
    main_law: z.string().max(255).optional(),
    municipal_law: z.string().max(255).optional(),
    laws: z.string().max(255).optional(),
    naming_of_laws: z.string().max(255).optional(),
  });

  const result = await socialServiceBodySchema.parseAsync(body);

  return result;
}

export async function updateSocialServiceValidation(body: unknown) {
  const socialServiceBodySchema = z.object({
    service_name: z.string().min(1).max(100),
    service_category: serviceCategorySchema,
    description: z.string().min(1).max(255),
    agent_name: z.string().min(1).max(80),
    agent_role: z.string().max(50),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url(),
    status: z.enum(
      [ESocialServiceStatus.ENABLED, ESocialServiceStatus.DISABLED],
      {
        message: "Status must be enabled ou disabled",
      }
    ),
    organ: z.string().max(100).optional(),
    management: z.string().max(100).optional(),
    public_unit: z.string().max(100).optional(),
    organization: z.string().max(100).optional(),
    service_provider: z.string().max(100).optional(),
    main_law: z.string().max(255).optional(),
    municipal_law: z.string().max(255).optional(),
    laws: z.string().max(255).optional(),
    naming_of_laws: z.string().max(255).optional(),
  });

  const result = await socialServiceBodySchema.parseAsync(body);

  return result;
}

export async function updateSocialServiceStatusValidation(body: unknown) {
  const socialServiceBodySchema = z.object({
    status: z.enum(
      [ESocialServiceStatus.ENABLED, ESocialServiceStatus.DISABLED],
      {
        message: "Status must be enabled ou disabled",
      }
    ),
  });

  const result = await socialServiceBodySchema.parseAsync(body);

  return result;
}

export async function serviceUidValidation(params: unknown) {
  const socialServiceParamsSchema = z.object({
    uid: z.string().uuid({ message: "Invalid UUID" }),
  });

  const result = await socialServiceParamsSchema.parseAsync(params);

  return result;
}

export async function findManyServicesValidation(body: unknown) {
  const findManySocialServicesBodySchema = z.object({
    search: z.string().optional(),
    status: z
      .enum([ESocialServiceStatus.ENABLED, ESocialServiceStatus.DISABLED], {
        message: "Status must be enabled ou disabled",
      })
      .optional(),
    categoryUid: z.string().uuid({ message: "Invalid UUID" }).optional(),
    page: z.string().min(1, "Page must be greater than 0").optional(),
    pageSize: z.string().min(1, "Page size must be greater than 0").optional(),
  });

  const result = await findManySocialServicesBodySchema.parseAsync(body);

  return result;
}
