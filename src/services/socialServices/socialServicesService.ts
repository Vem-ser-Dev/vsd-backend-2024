import { FindManyOptions, Like, Not } from "typeorm";
import { appDataSource } from "../../database/dataSource";
import { ESocialServiceStatus } from "../../models/ESocialServiceStatus";
import { BadRequestError } from "../../models/exceptions";
import {
  CreateSocialServicePayload,
  FindManySocialServicePayload,
  GetProjectPayload,
  UpdateSocialServicePayload,
} from "../../models/SocialProjectPayload";
import { SocialService } from "../../database/entities/SocialService";

export class SocialServicesService {
  async createProject({
    service_name,
    service_category,
    description,
    agent_name,
    agent_role,
    email,
    phone,
    website,
    organ,
    management,
    public_unit,
    organization,
    service_provider,
    main_law,
    municipal_law,
    laws,
    naming_of_laws,
  }: CreateSocialServicePayload) {
    const socialService = await appDataSource.manager.findOneBy(SocialService, {
      service_name,
    });

    if (socialService) {
      throw new BadRequestError("Service with the same name already exists");
    }

    const result = await appDataSource.manager.save(SocialService, {
      service_name,
      service_category,
      description,
      agent_name,
      agent_role,
      email,
      phone,
      website,
      organ,
      management,
      public_unit,
      organization,
      service_provider,
      main_law,
      municipal_law,
      laws,
      naming_of_laws,
      status: ESocialServiceStatus.ENABLED,
    });

    return {
      uid: result.uid,
      service_name: result.service_name,
      service_category: result.service_category.uid,
      description: result.description,
      agent_name: result.agent_name,
      agent_role: result.agent_role,
      email: result.email,
      phone: result.phone,
      website: result.website,
      organ: result.organ,
      management: result.management,
      public_unit: result.public_unit,
      organization: result.organization,
      service_provider: result.service_provider,
      main_law: result.main_law,
      municipal_law: result.municipal_law,
      laws: result.laws,
      naming_of_laws: result.naming_of_laws,
      status: result.status,
    };
  }

  async updateProject({
    uid,
    service_name,
    service_category,
    description,
    agent_name,
    agent_role,
    email,
    phone,
    website,
    organ,
    management,
    public_unit,
    organization,
    service_provider,
    main_law,
    municipal_law,
    laws,
    naming_of_laws,
    status,
  }: UpdateSocialServicePayload) {
    const socialService = await appDataSource.manager.findOneBy(SocialService, {
      uid,
    });

    if (!socialService) {
      throw new BadRequestError("Social Service does not exists");
    }

    const existingProjectName = await appDataSource.manager.findOneBy(
      SocialService,
      {
        service_name,
        uid: Not(uid),
      }
    );

    if (existingProjectName) {
      throw new BadRequestError("Project name already exists");
    }

    const result = await appDataSource.manager.save(SocialService, {
      uid,
      service_name,
      service_category,
      description,
      agent_name,
      agent_role,
      email,
      phone,
      website,
      organ,
      management,
      public_unit,
      organization,
      service_provider,
      main_law,
      municipal_law,
      laws,
      naming_of_laws,
      status,
    });

    return {
      uid: result.uid,
      service_name: result.service_name,
      service_category: result.service_category,
      description: result.description,
      agent_name: result.agent_name,
      agent_role: result.agent_role,
      email: result.email,
      phone: result.phone,
      website: result.website,
      organ: result.organ,
      management: result.management,
      public_unit: result.public_unit,
      organization: result.organization,
      service_provider: result.service_provider,
      main_law: result.main_law,
      municipal_law: result.municipal_law,
      laws: result.laws,
      naming_of_laws: result.naming_of_laws,
      status: result.status,
    };
  }

  async findManyProjects({
    search,
    status,
    categoryUid,
    page = 1,
    pageSize = 10,
  }: FindManySocialServicePayload) {
    const where: FindManyOptions<SocialService>["where"] = {};

    if (search) {
      where.service_name = Like(`%${search}%`);
    }

    if (status) {
      where.status = status;
    }

    if (categoryUid) {
      where.service_category = {
        uid: categoryUid,
      };
    }

    const socialProjects = await appDataSource.manager.find(SocialService, {
      where,
      select: {
        service_category: {
          uid: true,
          name: true,
        },
      },
      relations: {
        service_category: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: socialProjects,
      pagination: {
        currentPage: page,
        count: socialProjects.length,
      },
    };
  }

  async getProject({ uid }: GetProjectPayload) {
    const socialService = await appDataSource.manager.findOne(SocialService, {
      where: { uid },
      select: {
        service_category: {
          uid: true,
          name: true,
        },
      },
      relations: {
        service_category: true,
      },
    });

    if (!socialService) {
      throw new BadRequestError("Social Service does not exists");
    }

    return {
      uid: socialService.uid,
      service_name: socialService.service_name,
      service_category: socialService.service_category,
      description: socialService.description,
      agent_name: socialService.agent_name,
      agent_role: socialService.agent_role,
      email: socialService.email,
      phone: socialService.phone,
      website: socialService.website,
      status: socialService.status,
      organ: socialService.organ,
      management: socialService.management,
      public_unit: socialService.public_unit,
      organization: socialService.organization,
      service_provider: socialService.service_provider,
      main_law: socialService.main_law,
      municipal_law: socialService.municipal_law,
      laws: socialService.laws,
      naming_of_laws: socialService.naming_of_laws,
    };
  }
}

export const socialServicesService = new SocialServicesService();
