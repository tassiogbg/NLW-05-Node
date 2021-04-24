import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: Repository<Setting>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {

        //Select * from settings where username = "username" limit 1;
        const userAlreadyExist = await this.settingsRepository.findOne({
            username
        });

        if (userAlreadyExist) {
            throw new Error("User Already Exist!");
        }

        const settings = this.settingsRepository.create({
            chat,
            username,
        });

        await this.settingsRepository.save(settings)

        return settings;
    }

    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username
        });
        return settings;
    }
    async update(username: string, chat: boolean) {
        await this.settingsRepository
            .createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where('username = :username', { username })
            .execute();
    }
}

export { SettingsService }