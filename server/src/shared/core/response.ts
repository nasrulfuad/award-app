import { Response } from "express";

function response(res: Response) {
  return {
    Ok: (data?: any) => {
      return res.status(200).json({
        message: "success",
        data,
      });
    },
  };
}

export { response };
