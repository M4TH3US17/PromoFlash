import { Response } from 'express';
import {
    Body, Controller,
    Logger,
} from "@nestjs/common";

@Controller({ path: "addresses" })
export class AddressController {
    private logger: Logger = new Logger(AddressController.name);

    constructor(
    ) { }

};