import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingRepository";

interface ISettingsCreate{
    chat: boolean;
    username: string;
}

class SettingsService {
    async create({ chat, username } : ISettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository);

        //Select * from settings where username = "username" limit 1;
        const userAlreadyExist = await settingsRepository.findOne({
            username
        }) ;

        if(userAlreadyExist) {
            throw new Error("User Already Exist!");
        }
    
        const settings = settingsRepository.create({
            chat,
            username,
        });
    
    await settingsRepository.save(settings)

    return settings;
    }
}

export { SettingsService }