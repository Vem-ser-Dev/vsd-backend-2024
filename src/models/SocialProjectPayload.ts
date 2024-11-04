import { SocialProject } from "../database/entities/SocialProject";
import { EProjectStatus } from "./EProjectStatus";

export type CreateSocialProjectPayload = Partial<
  Pick<
    SocialProject,
    | "project_name"
    | "classification"
    | "description"
    | "agent_name"
    | "agent_role"
    | "email"
    | "phone"
    | "website"
  >
>;

export type UpdateSocialProjectPayload = Pick<SocialProject, "uid"> &
  Partial<
    Pick<
      SocialProject,
      | "project_name"
      | "classification"
      | "description"
      | "agent_name"
      | "agent_role"
      | "email"
      | "phone"
      | "website"
      | "status"
    >
  >;

export type FindManySocialProjectPayload = {
  status?: EProjectStatus | undefined;
  search?: string | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
};
