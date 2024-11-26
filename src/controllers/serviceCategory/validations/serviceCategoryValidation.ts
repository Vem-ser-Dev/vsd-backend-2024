import { z } from "zod";
import { ESocialServiceStatus } from "../../../models/ESocialServiceStatus";
import { ECategoryStatus } from "../../../models/ECategoryStatus";

const serviceCategorySchema = z.object({
  uid: z.string().uuid({ message: "Invalid UUID" }),
});

export async function createServiceCategoryValidation(body: unknown) {
  const serviceCategoryBodySchema = z.object({
    name: z.string().min(1).max(100),
  });

  const result = await serviceCategoryBodySchema.parseAsync(body);

  return result;
}

export async function updateServiceCategoryValidation(body: unknown) {
  const serviceCategoryBodySchema = z.object({
    name: z.string().min(1).max(100),
    status: z.enum([ECategoryStatus.ENABLED, ECategoryStatus.DISABLED], {
      message: "Status must be enabled ou disabled",
    }),
  });

  const result = await serviceCategoryBodySchema.parseAsync(body);

  return result;
}

export async function categoryUidValidation(params: unknown) {
  const serviceCategoryParamsSchema = z.object({
    uid: z.string().uuid({ message: "Invalid UUID" }),
  });

  const result = await serviceCategoryParamsSchema.parseAsync(params);

  return result;
}

export async function findManyServicesValidation(body: unknown) {
  const findManySocialServicesBodySchema = z.object({
    search: z.string().optional(),
    status: z
      .enum([ECategoryStatus.ENABLED, ECategoryStatus.DISABLED], {
        message: "Status must be enabled ou disabled",
      })
      .optional(),
    page: z.string().min(1, "Page must be greater than 0").optional(),
    pageSize: z.string().min(1, "Page size must be greater than 0").optional(),
  });

  const result = await findManySocialServicesBodySchema.parseAsync(body);

  return result;
}
