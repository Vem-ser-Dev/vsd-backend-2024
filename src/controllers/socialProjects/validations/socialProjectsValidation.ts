import { z } from "zod";
import { EProjectStatus } from "../../../models/EProjectStatus";

export async function createSocialProjectValidation(body: unknown) {
  const socialProjectBodySchema = z.object({
    project_name: z
      .string()
      .min(1, "Project name is required")
      .max(100, "Project name cannot exceed 100 characters"),
    classification: z
      .string()
      .min(1, "Classification is required")
      .max(80, "Classification cannot exceed 80 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(255, "Description cannot exceed 255 characters"),
    agent_name: z
      .string()
      .min(1, "Agent name is required")
      .max(80, "Agent name cannot exceed 80 characters"),
    agent_role: z
      .string()
      .min(1, "Agent role is required")
      .max(50, "Agent role cannot exceed 50 characters"),
    email: z.string().email("Invalid email format").optional(),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(14, "Phone number cannot exceed 14 characters")
      .optional(),
    website: z.string().url("Invalid website URL").optional(),
  });

  const result = await socialProjectBodySchema.parseAsync(body);

  return result;
}

export async function updateSocialProjectValidation(body: unknown) {
  const socialProjectBodySchema = z.object({
    project_name: z
      .string()
      .min(1, "Project name is required")
      .max(100, "Project name cannot exceed 100 characters"),
    classification: z
      .string()
      .min(1, "Classification is required")
      .max(80, "Classification cannot exceed 80 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(255, "Description cannot exceed 255 characters"),
    agent_name: z
      .string()
      .min(1, "Agent name is required")
      .max(80, "Agent name cannot exceed 80 characters"),
    agent_role: z
      .string()
      .min(1, "Agent role is required")
      .max(50, "Agent role cannot exceed 50 characters"),
    email: z.string().email("Invalid email format").optional(),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(14, "Phone number cannot exceed 14 characters")
      .optional(),
    website: z.string().url("Invalid website URL").optional(),
    status: z
      .enum([EProjectStatus.ENABLED, EProjectStatus.DISABLED], {
        message: "Status must be enabled ou disabled",
      })
      .optional(),
  });

  const result = await socialProjectBodySchema.parseAsync(body);

  return result;
}

export async function projectUidValidation(params: unknown) {
  const socialProjectParamsSchema = z.object({
    uid: z.string().min(1, "Uid is required"),
  });

  const result = await socialProjectParamsSchema.parseAsync(params);

  return result;
}

export async function findManyProjectsValidation(body: unknown) {
  const findManySocialProjectsBodySchema = z.object({
    search: z.string().optional(),
    status: z
      .enum([EProjectStatus.ENABLED, EProjectStatus.DISABLED], {
        message: "Status must be enabled ou disabled",
      })
      .optional(),
    page: z.string().min(1, "Page must be greater than 0").optional(),
    pageSize: z.string().min(1, "Page size must be greater than 0").optional(),
  });

  const result = await findManySocialProjectsBodySchema.parseAsync(body);

  return result;
}
