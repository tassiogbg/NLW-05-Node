import { Router } from "express";
import { getCustomRepository } from "typeorm";

import { SettingsRepository } from "./repositories/SettingRepository";

const routes = Router();

routes.post("/settings", async (request, response) => {
    const { chat , username } = request.body
    const settingReposytory = getCustomRepository(SettingsRepository);

    const settings = settingReposytory.create({
        chat,
        username,
    });

    await settingReposytory.save(settings);

    return response.json(settings);
});

export { routes };
