import { FindManyOptions, Like, Not } from "typeorm";
import { appDataSource } from "../../database/dataSource";
import { SocialProject } from "../../database/entities/SocialProject";
import { EProjectStatus } from "../../models/EProjectStatus";
import { BadRequestError } from "../../models/exceptions";
import {
  CreateSocialProjectPayload,
  FindManySocialProjectPayload,
  UpdateSocialProjectPayload,
} from "../../models/SocialProjectPayload";

export class SocialProjectsService {
  async createProject({
    project_name,
    classification,
    description,
    agent_name,
    agent_role,
    email,
    phone,
    website,
  }: CreateSocialProjectPayload) {
    const socialProject = await appDataSource.manager.findOneBy(SocialProject, {
      project_name,
    });

    if (socialProject) {
      throw new BadRequestError("Project with the same name already exists");
    }

    const result = await appDataSource.manager.save(SocialProject, {
      project_name,
      classification,
      description,
      agent_name,
      agent_role,
      email,
      phone,
      website,
      status: EProjectStatus.ENABLED,
    });

    return {
      uid: result.uid,
      project_name: result.project_name,
      classification: result.classification,
      description: result.description,
      agent_name: result.agent_name,
      agent_role: result.agent_role,
      email: result.email,
      phone: result.phone,
      website: result.website,
      status: result.status,
    };
  }

  async updateProject({
    uid,
    project_name,
    classification,
    description,
    agent_name,
    agent_role,
    email,
    phone,
    website,
    status,
  }: UpdateSocialProjectPayload) {
    const socialProject = await appDataSource.manager.findOneBy(SocialProject, {
      uid,
    });

    if (!socialProject) {
      throw new BadRequestError("Project does not exists");
    }

    const existingProjectName = await appDataSource.manager.findOneBy(
      SocialProject,
      {
        project_name,
        uid: Not(uid),
      }
    );

    if (existingProjectName) {
      throw new BadRequestError("Project name already exists");
    }

    const result = await appDataSource.manager.save(SocialProject, {
      uid,
      project_name,
      classification,
      description,
      agent_name,
      agent_role,
      email,
      phone,
      website,
      status,
    });

    return {
      uid: result.uid,
      project_name: result.project_name,
      classification: result.classification,
      description: result.description,
      agent_name: result.agent_name,
      agent_role: result.agent_role,
      email: result.email,
      phone: result.phone,
      website: result.website,
      status: result.status,
    };
  }

  async findManyProjects({
    search,
    status,
    page = 1,
    pageSize = 10,
  }: FindManySocialProjectPayload) {
    const where: FindManyOptions<SocialProject>["where"] = {};

    if (search) {
      where.project_name = Like(`%${search}%`);
    }

    if (status) {
      where.status = status;
    }

    const socialProjects = await appDataSource.manager.find(SocialProject, {
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: socialProjects,
      pagination: {
        currentPage: page,
        count: pageSize,
      },
    };
  }
}

export const socialProjectsService = new SocialProjectsService();
