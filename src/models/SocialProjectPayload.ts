import { ServiceCategory } from "../database/entities/ServiceCategory";
import { SocialService } from "../database/entities/SocialService";
import { ESocialServiceStatus } from "./ESocialServiceStatus";

export type CreateSocialServicePayload = Pick<
  SocialService,
  | "service_name"
  | "description"
  | "agent_name"
  | "agent_role"
  | "email"
  | "phone"
  | "website"
  | "organ"
  | "management"
  | "public_unit"
  | "organization"
  | "service_provider"
  | "main_law"
  | "municipal_law"
  | "laws"
  | "naming_of_laws"
> & { service_category: Pick<ServiceCategory, "uid"> };

export type UpdateSocialServicePayload = Pick<SocialService, "uid"> &
  Pick<
    SocialService,
    | "service_name"
    | "description"
    | "agent_name"
    | "agent_role"
    | "email"
    | "phone"
    | "website"
    | "organ"
    | "management"
    | "public_unit"
    | "organization"
    | "service_provider"
    | "main_law"
    | "municipal_law"
    | "laws"
    | "naming_of_laws"
    | "status"
  > & { service_category: Pick<ServiceCategory, "uid"> };

export type FindManySocialServicePayload = {
  status?: ESocialServiceStatus | undefined;
  search?: string | undefined;
  categoryUid?: string | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
};

export type GetProjectPayload = Pick<SocialService, "uid">;
