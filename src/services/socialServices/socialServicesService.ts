import { FindManyOptions, Like, Not } from "typeorm";
import { appDataSource } from "../../database/dataSource";
import { ServiceCategory } from "../../database/entities/ServiceCategory";
import { SocialService } from "../../database/entities/SocialService";
import { ESocialServiceStatus } from "../../models/ESocialServiceStatus";
import { BadRequestError } from "../../models/exceptions";
import {
  CreateSocialServicePayload,
  FindManySocialServicePayload,
  GetProjectPayload,
  UpdateSocialServicePayload,
  UpdateSocialServiceStatusPayload,
} from "../../models/SocialProjectPayload";
import { serviceCategoryService } from "../serviceCategory/serviceCategoryService";

export class SocialServicesService {
  async createService({
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

    let createdCategory:
      | {
          uid: string;
          name: string;
          status: ESocialServiceStatus;
        }
      | undefined = undefined;

    if (service_category.name !== undefined) {
      createdCategory = await serviceCategoryService.createCategory({
        name: service_category.name,
      });
    } else if (service_category.uid !== undefined) {
      const findedServiceCategory = await appDataSource.manager.findOneBy(
        ServiceCategory,
        {
          uid: service_category.uid,
        }
      );

      if (findedServiceCategory === null) {
        throw new BadRequestError("Service category does not exist");
      }
    }

    const serviceCategoryToAppend = new ServiceCategory();

    serviceCategoryToAppend.uid =
      createdCategory !== undefined
        ? createdCategory.uid
        : service_category.uid ?? "";

    const result = await appDataSource.manager.save(SocialService, {
      service_name,
      description,
      agent_name,
      agent_role,
      email,
      phone,
      website,
      organ: organ ? organ : undefined,
      management: management ? management : undefined,
      public_unit: public_unit ? public_unit : undefined,
      organization: organization ? organization : undefined,
      service_provider: service_provider ? service_provider : undefined,
      main_law: main_law ? main_law : undefined,
      municipal_law: municipal_law ? municipal_law : undefined,
      laws: laws ? laws : undefined,
      naming_of_laws: naming_of_laws ? naming_of_laws : undefined,
      service_category: serviceCategoryToAppend,
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

  async updateService({
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

    let createdCategory:
      | {
          uid: string;
          name: string;
          status: ESocialServiceStatus;
        }
      | undefined = undefined;

    if (service_category.name !== undefined) {
      createdCategory = await serviceCategoryService.createCategory({
        name: service_category.name,
      });
    } else if (service_category.uid !== undefined) {
      const findedServiceCategory = await appDataSource.manager.findOneBy(
        ServiceCategory,
        {
          uid: service_category.uid,
        }
      );

      if (findedServiceCategory === null) {
        throw new BadRequestError("Service category does not exist");
      }
    }

    const serviceCategoryToAppend = new ServiceCategory();

    serviceCategoryToAppend.uid =
      createdCategory !== undefined
        ? createdCategory.uid
        : service_category.uid ?? "";

    const result = await appDataSource.manager.save(SocialService, {
      uid,
      service_name,
      service_category: serviceCategoryToAppend,
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

  async updateServiceStatus({ uid, status }: UpdateSocialServiceStatusPayload) {
    const socialService = await appDataSource.manager.findOneBy(SocialService, {
      uid,
    });

    if (!socialService) {
      throw new BadRequestError("Social Service does not exists");
    }

    const result = await appDataSource.manager.save(SocialService, {
      uid,
      status,
    });

    return {
      uid: result.uid,
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

    const [socialProjects, count] = await appDataSource.manager.findAndCount(
      SocialService,
      {
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
      }
    );

    return {
      data: socialProjects,
      pagination: {
        currentPage: page,
        count: count,
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
      uid: socialService.uid ?? undefined,
      service_name: socialService.service_name ?? undefined,
      service_category: socialService.service_category ?? undefined,
      description: socialService.description ?? undefined,
      agent_name: socialService.agent_name ?? undefined,
      agent_role: socialService.agent_role ?? undefined,
      email: socialService.email ?? undefined,
      phone: socialService.phone ?? undefined,
      website: socialService.website ?? undefined,
      status: socialService.status ?? undefined,
      organ: socialService.organ ?? undefined,
      management: socialService.management ?? undefined,
      public_unit: socialService.public_unit ?? undefined,
      organization: socialService.organization ?? undefined,
      service_provider: socialService.service_provider ?? undefined,
      main_law: socialService.main_law ?? undefined,
      municipal_law: socialService.municipal_law ?? undefined,
      laws: socialService.laws ?? undefined,
      naming_of_laws: socialService.naming_of_laws ?? undefined,
    };
  }
}

export const socialServicesService = new SocialServicesService();
