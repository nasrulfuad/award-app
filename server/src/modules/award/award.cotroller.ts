import { Request, Response } from "express";
import { AwardQueryDto } from "./dto/award-query.dto";
import awardService from "./award.service";
import { catchError, validator, response } from "@app/shared";

async function findAll(req: Request, res: Response) {
  try {
    const awardQueryDto = await validator(new AwardQueryDto(req.query));

    const result = await awardService.findAll(awardQueryDto);

    return response(res).Ok(result);
  } catch (error) {
    const { message, statusCode } = catchError(error);

    return res.status(statusCode).json({ message });
  }
}

export default { findAll };
