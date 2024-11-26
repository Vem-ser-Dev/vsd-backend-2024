import { FastifyReply, FastifyRequest } from "fastify";
import { ESocialServiceStatus } from "../../models/ESocialServiceStatus";
import { socialServicesService } from "../../services/socialServices/socialServicesService";
import {
  createSocialServiceValidation,
  findManyServicesValidation,
  serviceUidValidation,
  updateSocialServiceValidation,
} from "./validations/socialServicesValidation";

class SocialServicesController {
  async createService(request: FastifyRequest, reply: FastifyReply) {
    const bodyPayload = await createSocialServiceValidation(request.body);

    const result = await socialServicesService.createProject(bodyPayload);

    return reply.code(200).send(result);
  }

  async updateService(request: FastifyRequest, reply: FastifyReply) {
    const queryPayload = await serviceUidValidation(request.params);
    const bodyPayload = await updateSocialServiceValidation(request.body);

    const result = await socialServicesService.updateProject({
      ...queryPayload,
      ...bodyPayload,
    });

    return reply.code(200).send(result);
  }

  async findManyServices(request: FastifyRequest, reply: FastifyReply) {
    const bodyPayload = await findManyServicesValidation(request.query);

    const result = await socialServicesService.findManyProjects({
      search: bodyPayload.search,
      status: bodyPayload.status,
      categoryUid: bodyPayload.categoryUid,
      page: Number(bodyPayload.page),
      pageSize: Number(bodyPayload.pageSize),
    });

    return reply.code(200).send(result);
  }

  async findManyPublicProjects(request: FastifyRequest, reply: FastifyReply) {
    const bodyPayload = await findManyServicesValidation(request.query);

    const result = await socialServicesService.findManyProjects({
      search: bodyPayload.search,
      categoryUid: bodyPayload.categoryUid,
      page: Number(bodyPayload.page),
      pageSize: Number(bodyPayload.pageSize),

      // valor estático para consultas públicas
      status: ESocialServiceStatus.ENABLED,
    });

    return reply.code(200).send(result);
  }
  async getPublicProject(request: FastifyRequest, reply: FastifyReply) {
    const queryPayload = await serviceUidValidation(request.params);

    const result = await socialServicesService.getProject(queryPayload);

    return reply.code(200).send(result);
  }
}

export const socialServicesController = new SocialServicesController();
