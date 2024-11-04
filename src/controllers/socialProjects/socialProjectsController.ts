import { FastifyReply, FastifyRequest } from "fastify";
import { socialProjectsService } from "../../services/socialProjects/socialProjectsService";
import {
  createSocialProjectValidation,
  findManyProjectsValidation,
  projectUidValidation,
  updateSocialProjectValidation,
} from "./validations/socialProjectsValidation";
import { EProjectStatus } from "../../models/EProjectStatus";

class SocialProjectsController {
  async createProject(request: FastifyRequest, reply: FastifyReply) {
    const bodyPayload = await createSocialProjectValidation(request.body);

    const result = await socialProjectsService.createProject(bodyPayload);

    return reply.code(200).send(result);
  }

  async updateProject(request: FastifyRequest, reply: FastifyReply) {
    const queryPayload = await projectUidValidation(request.params);
    const bodyPayload = await updateSocialProjectValidation(request.body);

    const result = await socialProjectsService.updateProject({
      ...queryPayload,
      ...bodyPayload,
    });

    return reply.code(200).send(result);
  }

  async findManyProjects(request: FastifyRequest, reply: FastifyReply) {
    console.log("request.query", request.query);

    const bodyPayload = await findManyProjectsValidation(request.query);

    const result = await socialProjectsService.findManyProjects({
      search: bodyPayload.search,
      status: bodyPayload.status,
      page: Number(bodyPayload.page),
      pageSize: Number(bodyPayload.pageSize),
    });

    return reply.code(200).send(result);
  }

  async findManyPublicProjects(request: FastifyRequest, reply: FastifyReply) {
    const bodyPayload = await findManyProjectsValidation(request.query);

    const result = await socialProjectsService.findManyProjects({
      search: bodyPayload.search,
      page: Number(bodyPayload.page),
      pageSize: Number(bodyPayload.pageSize),

      // valor estático para consultas públicas
      status: EProjectStatus.ENABLED,
    });

    return reply.code(200).send(result);
  }
}

export const socialProjectsController = new SocialProjectsController();
