import { FindManyOptions, Like, Not } from "typeorm";
import { appDataSource } from "../../database/dataSource";
import { ServiceCategory } from "../../database/entities/ServiceCategory";
import { ESocialServiceStatus } from "../../models/ESocialServiceStatus";
import { BadRequestError } from "../../models/exceptions";
import {
  createServiceCategory,
  FindManyServiceCategoryPayload,
  UpdateServiceCategoryServicePayload,
} from "../../models/serviceCategoryPayload";

export class ServiceCategoryService {
  async createCategory({ name }: createServiceCategory) {
    const serviceCategory = await appDataSource.manager.findOneBy(
      ServiceCategory,
      {
        name,
      }
    );

    if (serviceCategory) {
      throw new BadRequestError("Service with the same name already exists");
    }

    const result = await appDataSource.manager.save(ServiceCategory, {
      name,
      status: ESocialServiceStatus.ENABLED,
    });

    return {
      uid: result.uid,
      name: result.name,
      status: result.status,
    };
  }

  async updateCategory({
    uid,
    name,
    status,
  }: UpdateServiceCategoryServicePayload) {
    const serviceCategory = await appDataSource.manager.findOneBy(
      ServiceCategory,
      {
        uid,
      }
    );

    if (!serviceCategory) {
      throw new BadRequestError("Social Service does not exists");
    }

    const existingProjectName = await appDataSource.manager.findOneBy(
      ServiceCategory,
      {
        name,
        uid: Not(uid),
      }
    );

    if (existingProjectName) {
      throw new BadRequestError("Project name already exists");
    }

    const result = await appDataSource.manager.save(ServiceCategory, {
      uid,
      name,
      status,
    });

    return {
      uid: result.uid,
      name: result.name,
      status: result.status,
    };
  }

  async findManyCategories({
    search,
    status,
    page = 1,
    pageSize = 10,
  }: FindManyServiceCategoryPayload) {
    const where: FindManyOptions<ServiceCategory>["where"] = {};

    if (search) {
      where.name = Like(`%${search}%`);
    }

    if (status) {
      where.status = status;
    }

    const socialProjects = await appDataSource.manager.find(ServiceCategory, {
      where,
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
}

export const serviceCategoryService = new ServiceCategoryService();
