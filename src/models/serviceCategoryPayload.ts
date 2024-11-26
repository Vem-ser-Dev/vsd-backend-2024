import { ServiceCategory } from "../database/entities/ServiceCategory";
import { SocialService } from "../database/entities/SocialService";
import { ECategoryStatus } from "./ECategoryStatus";
import { ESocialServiceStatus } from "./ESocialServiceStatus";

export type createServiceCategory = Pick<ServiceCategory, "name">;

export type UpdateServiceCategoryServicePayload = Pick<ServiceCategory, "uid"> &
  Pick<ServiceCategory, "name" | "status"> & {
    socialServices?: Pick<SocialService, "uid">[];
  };

export type FindManyServiceCategoryPayload = {
  status?: ECategoryStatus | undefined;
  search?: string | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
};
