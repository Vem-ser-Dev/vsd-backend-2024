import { FastifyReply, FastifyRequest } from "fastify";
import { serviceCategoryService } from "../../services/serviceCategory/serviceCategoryService";
import {
  createServiceCategoryValidation,
  findManyServicesValidation,
  categoryUidValidation,
  updateServiceCategoryValidation,
} from "./validations/serviceCategoryValidation";

class ServiceCategoryController {
  async createCategory(request: FastifyRequest, reply: FastifyReply) {
    const bodyPayload = await createServiceCategoryValidation(request.body);

    const result = await serviceCategoryService.createCategory(bodyPayload);

    return reply.code(200).send(result);
  }

  async updateCategory(request: FastifyRequest, reply: FastifyReply) {
    const queryPayload = await categoryUidValidation(request.params);
    const bodyPayload = await updateServiceCategoryValidation(request.body);

    const result = await serviceCategoryService.updateCategory({
      ...queryPayload,
      ...bodyPayload,
    });

    return reply.code(200).send(result);
  }

  async findManyCategories(request: FastifyRequest, reply: FastifyReply) {
    const bodyPayload = await findManyServicesValidation(request.query);

    const result = await serviceCategoryService.findManyCategories({
      search: bodyPayload.search,
      page: Number(bodyPayload.page),
      pageSize: Number(bodyPayload.pageSize),

      status: bodyPayload.status,
    });

    return reply.code(200).send(result);
  }
}

export const serviceCategoryController = new ServiceCategoryController();
